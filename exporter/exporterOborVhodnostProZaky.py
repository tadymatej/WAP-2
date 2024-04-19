
from .exporter import Exporter
from .dbController import DbController

class ExporterOborVhodnostProZaky(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS obor_vhodnostprozaky
                                (ID SERIAL PRIMARY KEY, 
                                OborID INT,
                                VhodnostProZakyID INT,                                
                                FOREIGN KEY (OborID) REFERENCES obor(ID),
                                FOREIGN KEY (VhodnostProZakyID) REFERENCES vhodnost_pro_zaky(ID)
                            );""")

    def db_export_one(self, oborID : int, vhodnostProZakyID : int):
        self.cur.execute("INSERT INTO obor_vhodnostprozaky(OborID, VhodnostProZakyID) VALUES(%s, %s)", (oborID, vhodnostProZakyID))
        
    def db_select(self):
        self.cur.execute("SELECT * FROM obor_vhodnostprozaky")

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS obor_vhodnostprozaky CASCADE")