



from .exporter import Exporter
import pandas as pd


class ModelAdresa():
    skolaID : int = None
    cisloDomovni : int = None
    cisloOrientacni : str = None
    kodAdresnihoMista : int = None
    psc : str = None
    ulice : str = None
    
    mestskyObvodMestskaCast : str = None
    obecKod : str

class ExporterAdresa(Exporter):

    def __init__(self):
        super().__init__()

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
                            FOREIGN KEY (SkolaID) REFERENCES skola(ID),
                            FOREIGN KEY (ObecID) REFERENCES obec(ID),
                            FOREIGN KEY (MestskaCastObvodID) REFERENCES mestska_cast_obvod(ID)
                         );""")
        
    def db_export_one(self, model : ModelAdresa):
        
        self.cur.execute("SELECT ID FROM obec WHERE Kod = %s", (model.obecKod, ))
        obecID = self.cur.fetchone()[0]

        mestskaCastObvodID = None
        if model.mestskyObvodMestskaCast is not None:
            self.cur.execute("SELECT ID FROM mestska_cast_obvod WHERE Kod = %s", (model.mestskyObvodMestskaCast, ))
            mestskaCastObvodID = self.cur.fetchone()[0]

        self.cur.execute("""INSERT INTO adresa(
                            CisloDomovni, CisloOrientacni, KodAdresnihoMista, PSC, 
                            Ulice, SkolaID, ObecID, MestskaCastObvodID
        ) VALUES(%s, %s, %s, %s, 
                %s, %s, %s, %s) RETURNING ID """, (model.cisloDomovni, model.cisloOrientacni, model.kodAdresnihoMista,
                                                   model.psc, model.ulice, model.skolaID, obecID, mestskaCastObvodID))
        return self.cur.fetchone()[0]


    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM adresa")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS adresa CASCADE")