



from .exporter import Exporter
import pandas as pd

from .dbController import DbController

class ModelAdresa():
    skolaID : int = None
    cisloDomovni : int = None
    cisloOrientacni : str = None
    kodAdresnihoMista : int = None
    psc : str = None
    ulice : str = None
    
    mestskyObvodMestskaCast : str = None
    obecKod : str = None

    obecNameStr : str = None
    mestskyObvodMestskaCastNameStr : str = None

    castObceStr : str = None
    castObceKod : str = None

    def print(self):
        print("cisloDomovni=", self.cisloDomovni)
        print("cisloOrientacni=", self.cisloOrientacni)
        print("ulice=", self.ulice)
        print("mestskyObvodMestskaCastStr=", self.mestskyObvodMestskaCastNameStr)
        print("castObceStr=", self.castObceStr)
        print("obecName=", self.obecNameStr)

class ExporterAdresa(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS adresa 
                            (ID SERIAL PRIMARY KEY, 
                            CisloDomovni INT,
                            CisloOrientacni VARCHAR(41),
                            KodAdresnihoMista INT,
                            PSC VARCHAR(5),
                            Ulice VARCHAR(48),
                            SkolaID INT,
                            ObecID INT,
                            MestskaCastObvodID INT,
                            CastObceID INT,
                            Lat DOUBLE PRECISION,
                            Lon DOUBLE PRECISION, 
                            FOREIGN KEY (SkolaID) REFERENCES skola(ID),
                            FOREIGN KEY (ObecID) REFERENCES obec(ID),
                            FOREIGN KEY (CastObceID) REFERENCES cast_obce(ID),
                            FOREIGN KEY (MestskaCastObvodID) REFERENCES mestska_cast_obvod(ID)
                         );""")

    def setLocation(self, adresaID, lat, lon):
        self.cur.execute("UPDATE adresa SET lat = %s, lon = %s WHERE ID = %s", (lat, lon, adresaID))
        
    def db_export_one(self, model : ModelAdresa):
        mestskaCastObvodID = None
        if (model.mestskyObvodMestskaCast is None):
            if(model.mestskyObvodMestskaCastNameStr is not None):
                self.cur.execute("SELECT ID FROM mestska_cast_obvod WHERE Nazev LIKE %s", ('%' + model.mestskyObvodMestskaCastNameStr + '%',))
                res = self.cur.fetchone()
                if res is not None:
                    mestskaCastObvodID = res[0]
        else:
            self.cur.execute("SELECT ID FROM mestska_cast_obvod WHERE Kod = %s", (model.mestskyObvodMestskaCast, ))
            mestskaCastObvodID = self.cur.fetchone()[0]
        obecID = None
        if(model.obecKod is None):
            if model.obecNameStr is not None:
                self.cur.execute("SELECT ID FROM obec WHERE Nazev LIKE %s", ('%' + model.obecNameStr + '%',))
                res = self.cur.fetchone()
                if res is not None:
                    obecID = res[0]
        else:
            self.cur.execute("SELECT ID FROM obec WHERE Kod = %s", (model.obecKod, ))
            obecID = self.cur.fetchone()[0]

        castObceID = None
        if(model.castObceKod is None):
            if (model.castObceStr is not None):
                self.cur.execute("SELECT ID FROM cast_obce WHERE Nazev LIKE %s", ('%' + model.castObceStr + '%', ))
                res = self.cur.fetchone()
                if res is not None:
                    castObceID = res[0]
        else:
            self.cur.execute("SELECT ID FROM cast_obce WHERE Kod = %s", (model.castObceKod, ))
            castObceID = self.cur.fetchone()[0]

        self.cur.execute("""INSERT INTO adresa(
                            CisloDomovni, CisloOrientacni, KodAdresnihoMista, PSC, 
                            Ulice, SkolaID, ObecID, MestskaCastObvodID, CastObceID
        ) VALUES(%s, %s, %s, %s, 
                %s, %s, %s, %s, %s) RETURNING ID """, (model.cisloDomovni, model.cisloOrientacni, model.kodAdresnihoMista,
                                                   model.psc, model.ulice, model.skolaID, obecID, mestskaCastObvodID, castObceID))
        return self.cur.fetchone()[0]


    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM adresa")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS adresa CASCADE")