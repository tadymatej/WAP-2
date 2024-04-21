
from .exporter import Exporter
from .dbController import DbController

class ExporterZarizeniSkolkyZakladkyAdresa(Exporter):
    """
    Exporter from not db format to database for table zarizeniskolkyzakladky_adresa (table for n-n relation between tables zarizeni_skolky_zakladky and adresa)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS zarizeniskolkyzakladky_adresa
                                (ID SERIAL PRIMARY KEY, 
                                AdresaID INT,
                                ZarizeniSkolkyZakladkyID INT,                                
                                FOREIGN KEY (AdresaID) REFERENCES adresa(ID),
                                FOREIGN KEY (ZarizeniSkolkyZakladkyID) REFERENCES zarizeni_skolky_zakladky(ID)
                            );""")

    def db_export_one(self, zarizeniSkolkyZakladkyID : int, adresaID : int):
        """
        Creates one column in database in relational table
        """
        self.cur.execute("INSERT INTO zarizeniskolkyzakladky_adresa(ZarizeniSkolkyZakladkyID, AdresaID) VALUES(%s, %s)", (zarizeniSkolkyZakladkyID, adresaID))
        
    def db_select(self):
        self.cur.execute("SELECT * FROM zarizeniskolkyzakladky_adresa")

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS zarizeniskolkyzakladky_adresa CASCADE")