
from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class OborSkolkyZakladkyModel():
    kapacita : int = None
    delkaVzdelavani : int = None
    oborDobihajici : bool = None
    nazev : str = None
    kod : str = None
    skolkaZakladkaID : int = None
    jazykKod : str = None

class ExporterOborSkolkyZakladky(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS obor_skolky_zakladky
                            (ID SERIAL PRIMARY KEY, 
                            Kapacita INT,
                            DelkaVzdelavani INT,
                            OborDobihajici BOOLEAN,
                            Nazev VARCHAR(255),
                            Kod VARCHAR(100),
                            SkolkaZakladkaID INT,
                            JazykID INT,
                            FOREIGN KEY (SkolkaZakladkaID) REFERENCES skolka_zakladka(ID),
                            FOREIGN KEY (JazykID) REFERENCES jazyk(ID)
                         );""")
        
    def db_export_one(self, model : OborSkolkyZakladkyModel):

        self.cur.execute("SELECT ID FROM jazyk WHERE Kod = %s", (model.jazykKod, ))
        jazykID = self.cur.fetchone()[0]

        self.cur.execute("""INSERT INTO obor_skolky_zakladky (Kapacita, DelkaVzdelavani, OborDobihajici,
                                Nazev, Kod, SkolkaZakladkaID, JazykID
                         ) VALUES(%s, %s, %s,
                                %s, %s, %s, %s)
                """, (model.kapacita, model.delkaVzdelavani, model.oborDobihajici, 
                      model.nazev, model.kod, model.skolkaZakladkaID, jazykID))  

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM obor_skolky_zakladky")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS obor_skolky_zakladky CASCADE")