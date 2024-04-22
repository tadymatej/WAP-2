from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterFormaStudia(Exporter):
    """
    Exporter from not db format to database for table forma_studia (denní, dálková, prezenční, ...)
    """
    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS forma_studia
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str):
        """
        Exports one entry to the database
        Args:
            kod: code of the formaStudia
            nazev: Name of the formaStudia
        """
        self.cur.execute("INSERT INTO forma_studia(Nazev, Kod) VALUES(%s, %s)", (nazev, kod))

    def json_export(self):
        df = pd.read_json("data/formy-studia.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, nazev)

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM forma_studia")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS forma_studia CASCADE")