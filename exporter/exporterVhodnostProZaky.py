from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterVhodnostProZaky(Exporter):
    """
    Exporter from not db format to database for table vhodnost_pro_zaky (Maturanti, 7. třída, 9. třída, ...)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS vhodnost_pro_zaky
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str):
        """
        Exports one entry to the database
        Args:
            kod: code of the vhodnostProZaky
            nazev: name of the vhodnostProZaky
        """
        self.cur.execute("INSERT INTO vhodnost_pro_zaky(Nazev, Kod) VALUES(%s, %s)", (nazev, kod))

    def json_export(self):
        df = pd.read_json("vhodnosti-pro-zaky.json")
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
        self.cur.execute("SELECT * FROM vhodnost_pro_zaky")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS vhodnost_pro_zaky CASCADE")