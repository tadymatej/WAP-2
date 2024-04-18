

from coordinatesExtractor.coordinatesExtractor import CoordinatesExtractor
from exporter.exporter import Exporter
from exporter.exporterAdresa import ModelAdresa

from psycopg2.extras import RealDictCursor

def main():
    exporter = Exporter(cursor_factory=RealDictCursor)
    exporter.cur.execute("""SELECT 
                                adresa.CastObceID,
                                cast_obce.Nazev as castObceNazev, 
                                obec.Nazev as nazevObce, 
                                adresa.Ulice, 
                                adresa.cisloOrientacni, 
                                adresa.cisloDomovni, 
                                mestska_cast_obvod.Nazev as mestska_cast_obvodNazev 
                         FROM adresa 
                         INNER JOIN obec ON obec.ID = adresa.ObecID 
                         LEFT JOIN mestska_cast_obvod ON mestska_cast_obvod.ID = MestskaCastObvodID 
                         LEFT JOIN cast_obce ON cast_obce.ID = adresa.CastObceID""")

    res = exporter.cur.fetchall()
    
    coordinatesExtractor = CoordinatesExtractor()
    for r in res:
        modelAdresa = ModelAdresa()
        modelAdresa.obecNameStr = r.get("nazevobce")
        modelAdresa.ulice = r.get("ulice")
        modelAdresa.cisloOrientacni = r.get("cisloorientacni")
        modelAdresa.cisloDomovni = r.get("cislodomovni")
        modelAdresa.mestskyObvodMestskaCastNameStr = r.get("mestska_cast_obvodnazev")
        coordinatesExtractor.extract(modelAdresa)
        


main()