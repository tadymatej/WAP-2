from .exporter import Exporter

import pandas as pd

class ExporterOkres(Exporter):

    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS okres 
                            (ID INT PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Okres_ID INT,
                            Kod VARCHAR(20),
                            FOREIGN KEY (Okres_ID) REFERENCES okres(ID)
                         );""")
        
    def db_export_one(self):
        pass

    def json_export(self):
        pass

    def printResult(self):
        rows = self.cur.fetchall()
        
    def db_select(self):
        self.cur.execute("SELECT * FROM kraj")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS kraj CASCADE")