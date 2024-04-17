

import pandas as pd

from .exporter import Exporter

class ExporterKraj(Exporter):
    
    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS kraj 
                                (ID INT PRIMARY KEY, 
                                Nazev VARCHAR(100), 
                                Kod VARCHAR(20)
                            );""")

    def db_export_one(self, id : int, kod3 : str, nazev : str):
        self.cur.execute("INSERT INTO kraj(Nazev, Kod, ID) VALUES(%s, %s, %s)", (nazev, kod3, id))

    def json_export(self):
        df = pd.read_json("kraje.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            kod3 = polozky[key].get("kodNuts3")
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, kod3, nazev)
        
    def printResult(self):
                # Fetch all rows from the result
        rows = self.cur.fetchall()

        # Print the list of databases
        for row in rows:
            print(row[0], row[1], row[2])
        
    def db_select(self):
        self.cur.execute("SELECT * FROM kraj")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS kraj CASCADE")