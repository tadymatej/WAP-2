
from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterSkolaDruhTyp(Exporter):
    """
    Exporter from not db format to database for table skola_druh_typ (Mateřská škola, Základní škola, Základní umělecká škola)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS skola_druh_typ
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100), 
                            Kod VARCHAR(20)
                         );""")
        
    def db_export_one(self, kod : str, nazev : str) -> int:
        """
        Exports one entry to the database
        Args:
            kod: code of the skolaDruhTyp
            nazev: name of the skolaDruhTyp
        """
        self.cur.execute("SELECT ID FROM skola_druh_typ WHERE Kod = %s", (kod, ))
        res = self.cur.fetchone()
        if res is None:
            self.cur.execute("INSERT INTO skola_druh_typ(Nazev, Kod) VALUES(%s, %s) RETURNING ID", (nazev, kod))
            return self.cur.fetchone()[0]
        return res[0]

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM skola_druh_typ")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS skola_druh_typ CASCADE")