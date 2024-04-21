from .exporter import Exporter
from .exporterObor import ExporterObor

import pandas as pd
from .dbController import DbController

class ExporterPodskola(Exporter):
    """
    Exporter from not db format to database for table podskola (Vyšší odborná škola v rámci jedné školy, Střední škola s maturitou v rámci té samé školy)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

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
        """
        Exports one entry to the database
        Args:
            skolaID: ID of the skola table, which has this podskola
            izo: izo identifier
            druhPodskoly: text identyfing this podskola
        """
        self.cur.execute("SELECT ID FROM druh_podskoly WHERE Kod = %s", (druhPodskoly, ))
        druhPodskolyID = self.cur.fetchone()[0]
        self.cur.execute("INSERT INTO Podskola(IZO, DruhPodskolyID, SkolaID) VALUES(%s, %s, %s) RETURNING ID", (izo, druhPodskolyID, skolaID))
        return self.cur.fetchone()[0]

    def export(self, skolaID : int, data : dict):
        """
        Exports one dict containing data about podskola
        """
        izo = data.get("izo")
        druhPodskolyDict : dict = data.get("druhSkoly")
        druhPodskolyStr : str = druhPodskolyDict.get("id") 
        druhPodskoly = druhPodskolyStr.split("/")[1]
        podskolaID = self.db_export_one(skolaID, izo, druhPodskoly)

        exporterObor = ExporterObor(self.dbController)
        exporterObor.exportList(podskolaID, data.get("vyucovaneObory"))

    def exportList(self, skolaID : int, data : list[dict]):
        """
        Exports list of dicts which contains data about podskolas
        """
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