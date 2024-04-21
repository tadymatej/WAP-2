
from .exporter import Exporter

import pandas as pd
from .dbController import DbController

class SkolkaZakladkaModel():
    reditelEmail : str = None
    nazev : str = None
    zkracenyNazev : str = None
    reditel : str = None
    datumZahajeni : str = None
    kapacita : int = None
    skolaDruhTypID : int = None

    typZrizovateleKod : str = None
    jazykKod : str = None
    izo : int = None

class ExporterSkolkaZakladka(Exporter):
    """
    Exporter from not db format to database for table skolka_zakladka (Základní škola Hrotovice, Mateřská škola Hrotovice,..)
    """

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS skolka_zakladka
                            (ID SERIAL PRIMARY KEY, 
                            Nazev VARCHAR(255),
                            ZkracenyNazev VARCHAR(200),
                            Reditel VARCHAR(150),
                            ReditelEmail VARCHAR(200),
                            DatumZahajeni DATE,
                            Kapacita INT,
                            JazykID INT,
                            TypZrizovateleID INT,
                            SkolaDruhTypID INT,
                            FOREIGN KEY (SkolaDruhTypID) REFERENCES skola_druh_typ(ID),
                            FOREIGN KEY (JazykID) REFERENCES jazyk(ID),
                            FOREIGN KEY (TypZrizovateleID) REFERENCES typ_zrizovatele(ID)
                         );""")
        
    def db_export_one(self, model : SkolkaZakladkaModel):
        """
        Exports one entry of skolkaZakldka to the database
        Args:
            model: model containing informations about skolkaZakladka
        """
        self.cur.execute("SELECT ID FROM podskola WHERE izo = %s", (model.izo,))
        if self.cur.fetchone() is None:
            self.cur.execute("SELECT ID FROM typ_zrizovatele WHERE Kod = %s", (model.typZrizovateleKod, ))
            typZrizovateleID = self.cur.fetchone()[0]

            print(model.jazykKod)
            self.cur.execute("SELECT ID FROM jazyk WHERE Kod = %s", (model.jazykKod, ))
            jazykID = self.cur.fetchone()[0]


            self.cur.execute("""INSERT INTO skolka_zakladka(Nazev, ZkracenyNazev, Reditel,
                                ReditelEmail, DatumZahajeni, Kapacita, JazykID, TypZrizovateleID, SkolaDruhTypID
                            ) VALUES(%s, %s, %s,
                                %s, %s, %s, %s, %s, %s) RETURNING ID""", (model.nazev, model.zkracenyNazev, model.reditel,
                                                                    model.reditelEmail, model.datumZahajeni, model.kapacita, jazykID, 
                                                                    typZrizovateleID, model.skolaDruhTypID))
            return self.cur.fetchone()[0]
        return None

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM skolka_zakladka")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS skolka_zakladka CASCADE")