

import pandas as pd

from .exporter import Exporter
from .dbController import DbController

class ExporterKraj(Exporter):
    """
    Exporter from not db format to database for table kraj (Vysočina, Jihomoravský, ..)
    """
        
    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS kraj 
                                (ID SERIAL PRIMARY KEY, 
                                Nazev VARCHAR(100), 
                                Kod VARCHAR(20),
                                Kod3 VARCHAR(20)
                            );""")

    def db_export_one(self, kod : str, kod3 : str, nazev : str):
        """
        Exports one entry to the database
        Args:
            kod: code of the kraj
            kod3: another code of the kraj
        """
        self.cur.execute("INSERT INTO kraj(Nazev, Kod, Kod3) VALUES(%s, %s, %s)", (nazev, kod, kod3))

    def json_export(self):
        df = pd.read_json("kraje.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            kod3 = polozky[key].get("kodNuts3")
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, kod3, nazev)
        
    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM kraj")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS kraj CASCADE")