from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterCastObce(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS cast_obce
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20),
                            ObecID INT,
                            FOREIGN KEY (ObecID) REFERENCES obec(ID)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str, obecKod : str):
        self.cur.execute("SELECT ID FROM obec WHERE Kod = %s", (obecKod, ))
        obecID = self.cur.fetchone()[0]
        self.cur.execute("INSERT INTO cast_obce(Kod, Nazev, ObecID) VALUES(%s, %s, %s)", (kod, nazev, obecID))

    def json_export(self):
        df = pd.read_json("casti-obci.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            obec : str = polozky[key].get("obec")
            obecKod : str = obec.split("/")[1]
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, nazev, obecKod)

    def printResult(self):
        rows = self.cur.fetchall()

        for row in rows:
            print(row)

    def db_select(self):
        self.cur.execute("SELECT * FROM cast_obce")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS cast_obce CASCADE")