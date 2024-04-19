
from .exporter import Exporter
from .dbController import DbController

class ExporterSkolaVyucovanyJazyk(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS skola_vyucovanyjazyk
                                (ID SERIAL PRIMARY KEY, 
                                SkolaID INT,
                                JazykID INT,                                
                                FOREIGN KEY (SkolaID) REFERENCES skola(ID),
                                FOREIGN KEY (JazykID) REFERENCES jazyk(ID)
                            );""")

    def db_export_one(self, skolaID : int, jazykID : int):
        self.cur.execute("INSERT INTO skola_vyucovanyjazyk(SkolaID, JazykID) VALUES(%s, %s)", (skolaID, jazykID))
        
    def db_select(self):
        self.cur.execute("SELECT * FROM skola_vyucovanyjazyk")

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS skola_vyucovanyjazyk CASCADE")