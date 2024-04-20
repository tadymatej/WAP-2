

from .exporter import Exporter
import pandas as pd
from .dbController import DbController

class ExporterOkres(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS okres 
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            KrajID INT,
                            Kod3 VARCHAR(20),
                            Kod VARCHAR(20),
                            FOREIGN KEY (KrajID) REFERENCES kraj(ID)
                         );""")
        
    def db_export_one(self, kod : int, kodLau : str, nazev : str, krajKod : str):
        self.cur.execute("SELECT ID FROM kraj WHERE Kod = %s", (krajKod, ))
        krajID = self.cur.fetchone()[0]
        self.cur.execute("INSERT INTO okres (Kod, Nazev, Kod3, KrajID) VALUES(%s, %s, %s, %s)", (kod, nazev, kodLau, krajID))

    def json_export(self):
        df = pd.read_json("okresy.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            kraj : str = polozky[key].get("kraj")
            krajKod : str = kraj.split("/")[1]
            kod3 = polozky[key].get("kodLau")
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, kod3, nazev, krajKod)

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM okres")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS okres CASCADE")