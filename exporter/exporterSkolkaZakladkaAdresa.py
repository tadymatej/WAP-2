
from .exporter import Exporter

class ExporterSkolkaZakladkaAdresa(Exporter):
    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS skolkazakladka_adresa
                                (ID SERIAL PRIMARY KEY, 
                                AdresaID INT,
                                SkolkaZakladkaID INT,                                
                                FOREIGN KEY (AdresaID) REFERENCES adresa(ID),
                                FOREIGN KEY (SkolkaZakladkaID) REFERENCES skolka_zakladka(ID)
                            );""")

    def db_export_one(self, skolkaZakladkaID : int, adresaID : int):
        self.cur.execute("INSERT INTO skolkazakladka_adresa(skolkaZakladkaID, AdresaID) VALUES(%s, %s)", (skolkaZakladkaID, adresaID))
        
    def db_select(self):
        self.cur.execute("SELECT * FROM skolkazakladka_adresa")

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS skolkazakladka_adresa CASCADE")