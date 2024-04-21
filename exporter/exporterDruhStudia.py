from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterDruhStudia(Exporter):
    """
    Exporter from not db format to database for table druh_studia (Nástavbové, Maturitní, Magisterské,...)
    """
    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS druh_studia
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str):
        """
        Exports one entry to the database
        Args:
            kod: Code of the druhStudia entry
            nazev: Name of the druhStudia entry
        """
        self.cur.execute("INSERT INTO druh_studia(Nazev, Kod) VALUES(%s, %s)", (nazev, kod))

    def json_export(self):
        df = pd.read_json("druhy-studia.json")
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
        self.cur.execute("SELECT * FROM druh_studia")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS druh_studia CASCADE")