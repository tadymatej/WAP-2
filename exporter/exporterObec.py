from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterObec(Exporter):
    """
    Exporter from not db format to database for table obec (Třebíč, Dukovany, ...)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS obec
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            OkresID INT,
                            Kod VARCHAR(20),
                            FOREIGN KEY (OkresID) REFERENCES okres(ID)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str, okresKod : str):
        """
        Exports one entry of obec to database
        Args:
            kod: code of the city
            nazev: name of the city
            okresKod: okres in which is this city located
        """
        self.cur.execute("SELECT ID FROM okres WHERE Kod = %s", (okresKod, ))
        okresID = self.cur.fetchone()[0]
        self.cur.execute("INSERT INTO obec(Kod, Nazev, OkresID) VALUES(%s, %s, %s)", (kod, nazev, okresID))

    def json_export(self):
        df = pd.read_json("obce.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            okres : str = polozky[key].get("okres")
            okresKod : str = okres.split("/")[1]
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, nazev, okresKod)

    def printResult(self):
        rows = self.cur.fetchall()

        for row in rows:
            print(row)

    def db_select(self):
        self.cur.execute("SELECT * FROM obec")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS obec CASCADE")