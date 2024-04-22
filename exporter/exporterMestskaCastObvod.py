from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterMestskaCastObvod(Exporter):
    """
    Exporter from not db format to database for table obec (Třebíč, Dukovany, ...)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS mestska_cast_obvod
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100),
                            Kod INT,
                            ObecID INT,
                            FOREIGN KEY (ObecID) REFERENCES obec(ID)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str, obecKod : str):
        """
        Exports one entry of mestskaCastObvod
        Args:
            kod: Code of mestskaCastObvod
            nazev: Name of mestskaCastObvod
            obecKod: code of the city in which is mestskaCastObvod located
        """
        self.cur.execute("SELECT ID FROM obec WHERE Kod = %s", (obecKod, ))
        obecID = self.cur.fetchone()[0]

        self.cur.execute("INSERT INTO mestska_cast_obvod(Kod, Nazev, ObecID) VALUES(%s, %s, %s)", (kod, nazev, obecID))

    def json_export(self):
        df = pd.read_json("data/mestske-obvody-mestske-casti.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            nazev = polozky[key].get("nazev")["cs"]
            obecStr : str = polozky[key].get("obec")
            obecKod = obecStr.split("/")[1]

            self.db_export_one(kod, nazev, obecKod)

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM mestska_cast_obvod")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS mestska_cast_obvod CASCADE")