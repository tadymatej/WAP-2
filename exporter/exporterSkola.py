

import pandas as pd

from .exporter import Exporter
from .exporterSkolaVyucovanyJazyk import ExporterSkolaVyucovanyJazyk
from .exporterPodskola import ExporterPodskola
from .exporterAdresa import ExporterAdresa
from .exporterAdresa import ModelAdresa

class ModelSkola():
    
    email :str = None
    ico : str = None
    kontaktniOsoba: str = None
    kontaktniOsobaTel: str = None
    nazev : str = None
    poznamka: str = None
    reditel: str = None
    reditelTel : str = None
    stravovani: int = None
    ubytovani:str = None
    url: str = None

    vyucovaneJazyky : list[str] = []
    typZrizovatele : str = None
    typSkoly : str = None

    def print(self):
        print(f"email: {self.email}")
        print(f"ico: {self.ico}")
        print(f"kontaktniOsoba: {self.kontaktniOsoba}")
        print(f"kontaktniOsobaTel: {self.kontaktniOsobaTel}")
        print(f"nazev: {self.nazev}")
        print(f"poznamka: {self.poznamka}")
        print(f"reditel: {self.reditel}")
        print(f"reditelTel: {self.reditelTel}")
        print(f"stravovani: {self.stravovani}")
        print(f"ubytovani: {self.ubytovani}")
        print(f"url: {self.url}")
        print(f"vyucovaneJazyky: {self.vyucovaneJazyky}")
        print(f"typZrizovatele: {self.typZrizovatele}")
        print(f"typSkoly: {self.typSkoly}")

class ExporterSkola(Exporter):
    
    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS skola 
                                (ID SERIAL PRIMARY KEY, 
                                Nazev VARCHAR(255), 
                                ICO VARCHAR(8),
                                Email VARCHAR(254),
                                KontaktniOsoba VARCHAR(64),
                                KontaktniOsobaTel VARCHAR(50),
                                Poznamka VARCHAR(4000),
                                Reditel VARCHAR(64),
                                ReditelTel VARCHAR(50),
                                Stravovani INT,
                                Ubytovani INT,
                                Url VARCHAR(2048),
                                TypZrizovateleID INT,
                                TypSkolyID INT,
                                FOREIGN KEY (TypZrizovateleID) REFERENCES typ_zrizovatele(ID),
                                FOREIGN KEY (TypSkolyID) REFERENCES typ_skoly(ID)
                            );""")

    def db_export_one(self, model : ModelSkola):
        self.cur.execute("SELECT ID FROM typ_zrizovatele WHERE Kod = %s", (model.typZrizovatele, ))
        typZrizovateleID = self.cur.fetchone()[0]
        self.cur.execute("SELECT ID FROM typ_skoly WHERE Kod = %s", (model.typSkoly, ))
        typSkolyID = self.cur.fetchone()[0]

        self.cur.execute("""
                         INSERT INTO skola(Nazev, ICO, Email, KontaktniOsoba, KontaktniOsobaTel,
                                        Poznamka, Reditel, ReditelTel, Stravovani, Ubytovani, Url, TypZrizovateleID, 
                                        TypSkolyID) VALUES(%s, %s, %s, %s, %s,
                                                            %s, %s, %s, %s, %s, %s, %s,
                                                            %s) RETURNING ID
                         """, (model.nazev, model.ico, model.email, model.kontaktniOsoba, model.kontaktniOsobaTel, 
                                model.poznamka, model.reditel, model.reditelTel, model.stravovani, model.ubytovani, 
                                    model.url, typZrizovateleID, typSkolyID))

        skolaID = self.cur.fetchone()[0]

        skolaVyucovanyJazykExporter = ExporterSkolaVyucovanyJazyk()
        for jazyk in model.vyucovaneJazyky:
            self.cur.execute("SELECT ID FROM jazyk WHERE Kod = %s", (jazyk, ))

            jazykID = self.cur.fetchone()[0]
            skolaVyucovanyJazykExporter.db_export_one(skolaID, jazykID)

        return skolaID


    def json_export(self):
        df = pd.read_json("skoly.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            modelSkola = ModelSkola()
            modelSkola.email = polozky[key].get("email")
            modelSkola.ico = polozky[key].get("ico")
            modelSkola.kontaktniOsoba = polozky[key].get("kontaktniOsoba")
            modelSkola.kontaktniOsobaTel = polozky[key].get("kontaktniOsobaTelefon")
            modelSkola.nazev = polozky[key].get("nazev")
            modelSkola.poznamka = polozky[key].get("poznamka")
            modelSkola.reditel = polozky[key].get("reditel")
            modelSkola.reditelTel = polozky[key].get("reditelTelefon")
            modelSkola.stravovani = polozky[key].get("stravovani")
            modelSkola.ubytovani = polozky[key].get("ubytovani")

            typZrizovateleDict : dict = polozky[key].get("typZrizovatele")
            typZrizovateleStr : str = typZrizovateleDict.get("id")
            typZrizovatele = typZrizovateleStr.split("/")[1]
            modelSkola.typZrizovatele = typZrizovatele

            typSkolyDict : dict = polozky[key].get("typSkoly")
            typSkolyStr : str = typSkolyDict.get("id")
            typSkoly = typSkolyStr.split("/")[1]
            modelSkola.typSkoly = typSkoly

            vyucovaneJazykyList : list[dict] = polozky[key].get("vyucovaneJazyky")
            vyucovanejazyky = []
            if vyucovaneJazykyList is not None:
                for vyucovanyJazykDict in vyucovaneJazykyList:
                    vyucovanyJazykStr : str = vyucovanyJazykDict.get("id")
                    vyucovanejazyky.append(vyucovanyJazykStr.split("/")[1])
            modelSkola.vyucovaneJazyky = vyucovanejazyky

            skolaID = self.db_export_one(modelSkola)

            podskolyExporter = ExporterPodskola()
            podskolyExporter.exportList(skolaID, polozky[key].get("soucastiSkoly"))

            adresaExporter = ExporterAdresa()
            modelAdresa = ModelAdresa()
            modelAdresa.skolaID = skolaID

            adresaDict : dict = polozky[key].get("adresaSidla")
            modelAdresa.cisloDomovni = adresaDict.get("cisloDomovni")
            modelAdresa.cisloOrientacni = adresaDict.get("cisloOrientacni")
            modelAdresa.kodAdresnihoMista = adresaDict.get("kodAdresnihoMista")
            modelAdresa.psc = adresaDict.get("psc")
            
            adresaObecDict : dict = adresaDict.get("obec")
            adresaObecStr : str = adresaObecDict.get("id")
            modelAdresa.obecKod = adresaObecStr.split("/")[1]

            mestskyObvodMestskaCastDict : dict = adresaDict.get("mestskyObvodMestskaCast")
            if mestskyObvodMestskaCastDict is not None:
                mestskyObvodMestskaCastStr : str = mestskyObvodMestskaCastDict.get("id")
                modelAdresa.mestskyObvodMestskaCast = mestskyObvodMestskaCastStr.split("/")[1]

            castObceDict : dict = adresaDict.get("castObce")
            if castObceDict is not None:
                castObceStr : str = castObceDict.get("id")
                modelAdresa.castObceKod = castObceStr.split("/")[1]

            adresaExporter.db_export_one(modelAdresa)
        
    def printResult(self):
        rows = self.cur.fetchall()

        # Print the list of databases
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM skola")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS skola CASCADE")