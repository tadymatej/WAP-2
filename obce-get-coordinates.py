

from coordinatesExtractor.coordinatesExtractor import CoordinatesExtractor
from exporter.exporter import Exporter
from exporter.exporterAdresa import ModelAdresa
from exporter.exporterAdresa import ExporterAdresa

from psycopg2.extras import RealDictCursor
from exporter.dbController import DbController

import sys

def main():
    """
    \brief Aa
    Performs coordinates extraction and stores it to the database
    """
    dbController = DbController(cursor_factory=RealDictCursor)
    exporter = Exporter(dbController)
    exporter.cur.execute("""SELECT 
                                adresa.CastObceID,
                                cast_obce.Nazev as castObceNazev, 
                                obec.Nazev as nazevObce, 
                                adresa.Ulice, 
                                adresa.cisloOrientacni, 
                                adresa.cisloDomovni, 
                                mestska_cast_obvod.Nazev as mestska_cast_obvodNazev,
                                adresa.ID as adresa_id,
                                adresa.KodAdresnihoMista,
                                adresa.psc,
                                kraj.nazev as nazev_kraj
                         FROM adresa 
                         INNER JOIN obec ON obec.ID = adresa.ObecID 
                         INNER JOIN okres ON okres.ID = obec.OkresID
                         INNER JOIN kraj ON kraj.ID = okres.KrajID
                         LEFT JOIN mestska_cast_obvod ON mestska_cast_obvod.ID = MestskaCastObvodID 
                         LEFT JOIN cast_obce ON cast_obce.ID = adresa.CastObceID 
                         ORDER BY adresa.ID
                         OFFSET 0""")

    res = exporter.cur.fetchall()
    
    coordinatesExtractor = CoordinatesExtractor()
    adresaExporter = ExporterAdresa(dbController)
    results = []
    for r in res:
        results.append(r)

    for i in range(0, len(results)):
        modelAdresa = ModelAdresa()
        modelAdresa.obecNameStr = results[i].get("nazevobce")
        modelAdresa.ulice = results[i].get("ulice")
        modelAdresa.cisloOrientacni = results[i].get("cisloorientacni")
        modelAdresa.cisloDomovni = results[i].get("cislodomovni")
        modelAdresa.castObceStr = results[i].get("castobcenazev")
        modelAdresa.psc = results[i].get("psc")
        modelAdresa.kodAdresnihoMista = results[i].get("kodadresnihomista")
        adresaID = results[i].get("adresa_id")
        nazev_kraj = results[i].get("nazev_kraj")
        print("processing AdresaID=", adresaID)
        try:
            lat, lon = coordinatesExtractor.extract(modelAdresa, nazev_kraj)
            adresaExporter.setLocation(adresaID, lat, lon)
        except:
            sys.stderr.write("crashed adresaID={}".format(adresaID))


main()