
from .exporter import Exporter

import pandas as pd

class ExporterZarizeniDruhTyp(Exporter):

    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS zarizeni_druh_typ
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str):
        self.cur.execute("SELECT ID FROM zarizeni_druh_typ WHERE Kod = %s", (kod, ))
        res = self.cur.fetchone()
        if res is None:
            self.cur.execute("INSERT INTO zarizeni_druh_typ(Nazev, Kod) VALUES(%s, %s) RETURNING ID", (nazev, kod))
            return self.cur.fetchone()[0]
        return res[0]

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM zarizeni_druh_typ")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS zarizeni_druh_typ CASCADE")