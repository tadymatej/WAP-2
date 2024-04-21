
from .exporter import Exporter
from .dbController import DbController

class ExporterSkolkaZakladkaAdresa(Exporter):
    """
    Exporter from not db format to database for table skolkazakladka_adresa (table for n-n relation between tables skolka_zakladka and adresa)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS skolkazakladka_adresa
                                (ID SERIAL PRIMARY KEY, 
                                AdresaID INT,
                                SkolkaZakladkaID INT,                                
                                FOREIGN KEY (AdresaID) REFERENCES adresa(ID),
                                FOREIGN KEY (SkolkaZakladkaID) REFERENCES skolka_zakladka(ID)
                            );""")

    def db_export_one(self, skolkaZakladkaID : int, adresaID : int):
        """
        Creates one column in database in relational table
        """
        self.cur.execute("INSERT INTO skolkazakladka_adresa(skolkaZakladkaID, AdresaID) VALUES(%s, %s)", (skolkaZakladkaID, adresaID))
        
    def db_select(self):
        self.cur.execute("SELECT * FROM skolkazakladka_adresa")

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS skolkazakladka_adresa CASCADE")