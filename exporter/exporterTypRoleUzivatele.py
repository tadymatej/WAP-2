
from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterTypRoleUzivatele(Exporter):
    """
    Exporter from not db format to database for table typ_role_uzivatele (For hodnoceni table, for example teacher, student, ...)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS typ_role_uzivatele
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(100)
                         );""")
        
    def db_select(self):
        self.cur.execute("SELECT * FROM typ_role_uzivatele")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS typ_role_uzivatele CASCADE")