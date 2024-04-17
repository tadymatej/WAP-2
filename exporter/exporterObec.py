from .exporter import Exporter

import pandas as pd

class ExporterObec(Exporter):

    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS obec
                            (ID INT PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Okres_ID INT,
                            FOREIGN KEY (Okres_ID) REFERENCES okres(ID)
                         );""")
        
    def db_export_one(self, id : int, nazev : str, okresID : int):
        self.cur.execute("INSERT INTO obec(ID, Nazev, Okres_ID) VALUES(%s, %s, %s)", (id, nazev, okresID))

    def json_export(self):
        df = pd.read_json("obce.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            okres : str = polozky[key].get("okres")
            okresID : int = okres.split("/")[1]
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, nazev, okresID)

    def printResult(self):
        rows = self.cur.fetchall()

        for row in rows:
            print(row[0], row[1], row[2])

    def db_select(self):
        self.cur.execute("SELECT * FROM obec")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS obec CASCADE")