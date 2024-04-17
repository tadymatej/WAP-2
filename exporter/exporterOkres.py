

from .exporter import Exporter
import pandas as pd

class ExporterOkres(Exporter):

    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS okres 
                            (ID INT PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kraj_ID INT,
                            Kod VARCHAR(20),
                            FOREIGN KEY (Kraj_ID) REFERENCES kraj(ID)
                         );""")
        
    def db_export_one(self, id : int, kod : str, nazev : str, krajID : int):
        self.cur.execute("INSERT INTO okres (ID, Nazev, Kod, Kraj_ID) VALUES(%s, %s, %s, %s)", (id, nazev, kod, krajID))

    def json_export(self):
        df = pd.read_json("okresy.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            kraj : str = polozky[key].get("kraj")
            krajID : int = kraj.split("/")[1]
            kod3 = polozky[key].get("kodLau")
            nazev = polozky[key].get("nazev")["cs"]

            self.db_export_one(kod, kod3, nazev, krajID)

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row[0], row[1], row[2], row[3])
        
    def db_select(self):
        self.cur.execute("SELECT * FROM okres")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS okres CASCADE")