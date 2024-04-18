
from .exporter import Exporter

import pandas as pd

class ZarizeniSkolkyZakladkyModel():
    nazev : str = None
    kapacita : int = None
    skolkaZakladkaID : int = None
    zarizeniDruhTypID : int = None

class ExporterZarizeniSkolkyZakladky(Exporter):

    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS zarizeni_skolky_zakladky
                            (ID SERIAL PRIMARY KEY, 
                            Kapacita INT,
                            Nazev VARCHAR(255),
                            SkolkaZakladkaID INT,
                            ZarizeniDruhTypID INT,
                            FOREIGN KEY (ZarizeniDruhTypID) REFERENCES zarizeni_druh_typ(ID),
                            FOREIGN KEY (SkolkaZakladkaID) REFERENCES skolka_zakladka(ID)
                         );""")
        
    def db_export_one(self, model : ZarizeniSkolkyZakladkyModel):
        self.cur.execute("""INSERT INTO zarizeni_skolky_zakladky (Kapacita, Nazev, SkolkaZakladkaID, ZarizeniDruhTypID
                         ) VALUES(%s, %s, %s, %s) RETURNING ID
                """, (model.kapacita, model.nazev, model.skolkaZakladkaID, model.zarizeniDruhTypID))  
        return self.cur.fetchone()[0]

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM zarizeni_skolky_zakladky")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS zarizeni_skolky_zakladky CASCADE")