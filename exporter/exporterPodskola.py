from .exporter import Exporter
from .exporterObor import ExporterObor

import pandas as pd

class ExporterPodskola(Exporter):

    def __init__(self):
        super().__init__()

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS Podskola
                            (ID SERIAL PRIMARY KEY, 
                            IZO INT, 
                            DruhPodskolyID INT,
                            SkolaID INT,
                            FOREIGN KEY (SkolaID) REFERENCES skola(ID),
                            FOREIGN KEY (DruhPodskolyID) REFERENCES druh_podskoly(ID)
                         );""")
        
    def db_export_one(self, skolaID, izo : int, druhPodskoly : str):
        self.cur.execute("SELECT ID FROM druh_podskoly WHERE Kod = %s", (druhPodskoly, ))
        druhPodskolyID = self.cur.fetchone()[0]
        self.cur.execute("INSERT INTO Podskola(IZO, DruhPodskolyID, SkolaID) VALUES(%s, %s, %s) RETURNING ID", (izo, druhPodskolyID, skolaID))
        return self.cur.fetchone()[0]

    def export(self, skolaID : int, data : dict):
        izo = data.get("izo")
        druhPodskolyDict : dict = data.get("druhSkoly")
        druhPodskolyStr : str = druhPodskolyDict.get("id") 
        druhPodskoly = druhPodskolyStr.split("/")[1]
        podskolaID = self.db_export_one(skolaID, izo, druhPodskoly)

        exporterObor = ExporterObor()
        exporterObor.exportList(podskolaID, data.get("vyucovaneObory"))

    def exportList(self, skolaID : int, data : list[dict]):
        for d in data:
            self.export(skolaID, d)


    def printResult(self):
        rows = self.cur.fetchall()

        for row in rows:
            print(row)

    def db_select(self):
        self.cur.execute("SELECT * FROM Podskola")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS Podskola CASCADE")