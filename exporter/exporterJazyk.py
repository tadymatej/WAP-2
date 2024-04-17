from .exporter import Exporter

import pandas as pd

class ExporterJazyk(Exporter):

    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS jazyk 
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20)
                         );""")
        
    def db_export_one(self, kod: str, nazev : str):
        self.cur.execute("INSERT INTO jazyk(Nazev, Kod) VALUES(%s, %s)", (kod, nazev))

    def json_export(self):
        df = pd.read_json("jazyky.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, nazev)
            
    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row[0], row[1], row[2])


    def db_select(self):
        self.cur.execute("SELECT * FROM jazyk")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS jazyk CASCADE")