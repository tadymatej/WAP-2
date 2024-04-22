from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterDruhPodskoly(Exporter):
    """
    Exporter from not db format to database for table druh_podskoly (Střední, vysoká, učiliště, vyšší odborná, ..)
    """
    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS druh_podskoly
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str):
        """
        Exports one entry of the druh_podskoly to database
        Args:
            kod: Code of the druhPodskoly
            nazev: Name of the druhPodskoly
        """
        self.cur.execute("INSERT INTO druh_podskoly(Nazev, Kod) VALUES(%s, %s)", (nazev, kod))

    def json_export(self):
        df = pd.read_json("data/druhy-skoly.json")
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
        self.cur.execute("SELECT * FROM druh_podskoly")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS druh_podskoly CASCADE")