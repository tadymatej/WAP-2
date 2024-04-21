from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class ExporterHodnoceni(Exporter):
    """
    Exporter from not db format to database for table hodnoceni (rating)
    """
    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS hodnoceni
                            (ID SERIAL PRIMARY KEY,
                            Hvezdicek INT NOT NULL,
                            Popis VARCHAR(1000),
                            JinaRoleUzivatele VARCHAR(100),
                            Autor VARCHAR(100),
                            TypRoleUzivateleID INT,
                            SkolaID INT,
                            SkolkaZakladkaID INT,
                            FOREIGN KEY (SkolaID) REFERENCES skola(ID),
                            FOREIGN KEY (TypRoleUzivateleID) REFERENCES typ_role_uzivatele(ID),
                            FOREIGN KEY (SkolkaZakladkaID) REFERENCES skolka_zakladka(ID)
                         );""")
        
    def db_select(self):
        self.cur.execute("SELECT * FROM hodnoceni")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS hodnoceni CASCADE")