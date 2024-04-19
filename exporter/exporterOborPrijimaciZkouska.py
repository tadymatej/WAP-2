
from .exporter import Exporter
from .dbController import DbController

class ExporterOborPrijimaciZkouska(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS obor_prijimacizkouska
                                (ID SERIAL PRIMARY KEY, 
                                OborID INT,
                                PrijimaciZkouskaID INT,                                
                                FOREIGN KEY (OborID) REFERENCES obor(ID),
                                FOREIGN KEY (PrijimaciZkouskaID) REFERENCES prijimaci_zkouska(ID)
                            );""")

    def db_export_one(self, oborID : int, prijimaciZkouskaID : int):
        self.cur.execute("INSERT INTO obor_prijimacizkouska(OborID, PrijimaciZkouskaID) VALUES(%s, %s)", (oborID, prijimaciZkouskaID))
        
    def db_select(self):
        self.cur.execute("SELECT * FROM obor_prijimacizkouska")

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS obor_prijimacizkouska CASCADE")