

from .exporter import Exporter
import pandas as pd

from .exporterOborPrijimaciZkouska import ExporterOborPrijimaciZkouska
from .exporterOborVhodnostProZaky import ExporterOborVhodnostProZaky
from .dbController import DbController

class ModelObor():
    aktualniRokPrijmou : int = None
    delkaStudia : int = None
    kod : str = None 
    minulyRokPrihlaseno : int = None 
    minulyRokPrijato : int = None 
    minulySkolniRok : int = None 
    nazevOboru : str = None 
    nenabizet : bool = None 
    prospech : float = None 
    skolne : int = None 
    zobrazitVKataloguSkol : bool = None 
    povinnaLekarskaProhlidka : bool = None
    vhodneProZakyOZP : bool = None

    druhStudia : str = None
    formaStudia : str = None 
    ukonceniStudia : str = None 
    vhodnostProZaky : list[str] = [] 
    stupenVzdelani : str = None
    prijimaciZkousky : list[str] = []

class ExporterObor(Exporter):

    def __init__(self, dbController : DbController):
        super().__init__(dbController)

    def db_create(self):
        self.cur.execute("""CREATE TABLE IF NOT EXISTS obor 
                            (ID SERIAL PRIMARY KEY, 
                            AktualniRokPrijmou INT, 
                            DelkaStudia INT,
                            Kod VARCHAR(13),
                            MinulyRokPrihlaseno INT,
                            MinulyRokPrijato INT,
                            NazevOboru VARCHAR(120),
                            Nenabizet BOOLEAN,
                            Prospech DOUBLE PRECISION,
                            Skolne INT,
                            ZobrazitVKataloguSkol BOOLEAN,
                            PovinnaLekarskaProhlidka BOOLEAN,
                            VhodneProZakyOZP BOOLEAN,
                            PodskolaID INT,
                            DruhStudiaID INT,
                            FormaStudiaID INT,
                            UkonceniStudiaID INT,
                            StupenVzdelaniID INT,
                            FOREIGN KEY (PodskolaID) REFERENCES podskola(ID),
                            FOREIGN KEY (DruhStudiaID) REFERENCES druh_studia(ID),
                            FOREIGN KEY (FormaStudiaID) REFERENCES forma_studia(ID),
                            FOREIGN KEY (UkonceniStudiaID) REFERENCES ukonceni_studia(ID),
                            FOREIGN KEY (StupenVzdelaniID) REFERENCES stupen_vzdelani(ID)
                         );""")
        
    def db_export_one(self, podskolaID : int, model : ModelObor):

        self.cur.execute("SELECT ID FROM druh_studia WHERE Kod = %s", (model.druhStudia, ))
        druhStudiaID = self.cur.fetchone()[0]

        self.cur.execute("SELECT ID FROM forma_studia WHERE Kod = %s", (model.formaStudia, ))
        formaStudiaID = self.cur.fetchone()[0]

        self.cur.execute("SELECT ID FROM ukonceni_studia WHERE Kod = %s", (model.ukonceniStudia, ))
        ukonceniStudiaID = self.cur.fetchone()[0]

        self.cur.execute("SELECT ID FROM stupen_vzdelani WHERE Kod = %s", (model.stupenVzdelani, ))
        stupenVzdelaniID = self.cur.fetchone()[0]

        self.cur.execute("""INSERT INTO obor (AktualniRokPrijmou, DelkaStudia, Kod, MinulyRokPrihlaseno, MinulyRokPrijato,
                                                NazevOboru, Nenabizet, Prospech, Skolne, ZobrazitVKataloguSkol, 
                                                PovinnaLekarskaProhlidka, VhodneProZakyOZP, PodskolaID, 
                                                DruhStudiaID, FormaStudiaID, UkonceniStudiaID, StupenVzdelaniID
                         ) VALUES(%s, %s, %s, %s, %s,
                                    %s, %s, %s, %s, %s,
                                    %s, %s, %s,
                                    %s, %s, %s, %s)
                             RETURNING ID""", (model.aktualniRokPrijmou, model.delkaStudia, model.kod, model.minulyRokPrihlaseno, 
                                                    model.minulyRokPrijato, model.nazevOboru, model.nenabizet, model.prospech, 
                                                    model.skolne, model.zobrazitVKataloguSkol, model.povinnaLekarskaProhlidka, 
                                                    model.vhodneProZakyOZP, podskolaID, druhStudiaID, formaStudiaID,
                                                    ukonceniStudiaID, stupenVzdelaniID))

        oborID = self.cur.fetchone()[0]
        exporterOborPrijimaciZkouska = ExporterOborPrijimaciZkouska(self.dbController)
        for prijimaciZkouska in model.prijimaciZkousky:
            self.cur.execute("SELECT ID FROM prijimaci_zkouska WHERE Kod = %s", (prijimaciZkouska, ))
            prijimaciZkouskaID = self.cur.fetchone()[0]

            exporterOborPrijimaciZkouska.db_export_one(oborID, prijimaciZkouskaID)

        exporterVhodnostProZaky = ExporterOborVhodnostProZaky(self.dbController)
        for vhodnostProZaky in model.vhodnostProZaky:
            self.cur.execute("SELECT ID FROM vhodnost_pro_zaky WHERE Kod = %s", (vhodnostProZaky, ))
            vhodnostProZakyID = self.cur.fetchone()[0]

            exporterVhodnostProZaky.db_export_one(oborID, vhodnostProZakyID)



    def export(self, podskolaID : int, data : dict):
        oborModel = ModelObor()
        oborModel.aktualniRokPrijmou = data.get("aktualniRokPrijmou")
        oborModel.delkaStudia = data.get("delkaStudia")
        oborModel.kod = data.get("kod")
        oborModel.zobrazitVKataloguSkol = data.get("ks")
        oborModel.minulyRokPrihlaseno = data.get("minulyRokPrihlaseno")
        oborModel.minulyRokPrijato = data.get("minulyRokPrijato")
        oborModel.minulySkolniRok = data.get("minulySkolniRok")
        oborModel.nazevOboru = data.get("nazevOboru")
        oborModel.nenabizet = data.get("nenabizet")
        oborModel.vhodneProZakyOZP = data.get("ozp")
        oborModel.povinnaLekarskaProhlidka = data.get("plp")
        oborModel.prospech = data.get("prospech")
        oborModel.skolne = data.get("skolne")

        stupenVzdelaniDict : dict = data.get("stupenVzdelani")
        stupenVzdelaniStr : str = stupenVzdelaniDict.get("id")
        oborModel.stupenVzdelani = stupenVzdelaniStr.split("/")[1]

        druhStudiaDict : dict = data.get("druhStudia")
        druhStudiaStr : str = druhStudiaDict.get("id")
        oborModel.druhStudia = druhStudiaStr.split("/")[1]

        formaStudiaDict : dict = data.get("formaStudia")
        formaStudiaStr : str = formaStudiaDict.get("id")
        oborModel.formaStudia = formaStudiaStr.split("/")[1]

        ukonceniStudiaDict : dict = data.get("ukonceniStudia")
        ukonceniStudiaStr : str = ukonceniStudiaDict.get("id")
        oborModel.ukonceniStudia = ukonceniStudiaStr.split("/")[1]

        vhodnostProZaky = []
        vhodnostProZakyList : list[dict] = data.get("vhodnostiProZaky")
        for vhodnostProZakyDict in vhodnostProZakyList:
            vhodnostProZakyStr : str = vhodnostProZakyDict.get("id")
            vhodnostProZaky.append(vhodnostProZakyStr.split("/")[1])
        oborModel.vhodnostProZaky = vhodnostProZaky

        prijimaciZkousky = []
        prijimaciZkouskyList : list[dict] = data.get("prijimaciZkousky")
        if prijimaciZkouskyList is not None:
            for prijimaciZkouskaDict in prijimaciZkouskyList:
                prijimaciZkouskaStr : str = prijimaciZkouskaDict.get("id")
                prijimaciZkousky.append(prijimaciZkouskaStr.split("/")[1])

        oborModel.prijimaciZkousky = prijimaciZkousky

        self.db_export_one(podskolaID, oborModel)





    def exportList(self, podskolaID : int, data : list[dict]):
        for d in data:
            self.export(podskolaID, d)

    def printResult(self):
        rows = self.cur.fetchall()
        for row in rows:
            print(row)
        
    def db_select(self):
        self.cur.execute("SELECT * FROM obor")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS obor CASCADE")