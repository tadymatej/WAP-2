
from ..exporter import Exporter

import pandas as pd

import xml.etree.ElementTree as ET

from xml.etree.ElementTree import Element

from ..exporterSkolaDruhTyp import ExporterSkolaDruhTyp
from ..exporterZarizeniDruhTyp import ExporterZarizeniDruhTyp
from ..exporterSkolkaZakladka import SkolkaZakladkaModel
from ..exporterSkolkaZakladka import ExporterSkolkaZakladka
from ..exporterOborSkolkyZakladky import ExporterOborSkolkyZakladky
from ..exporterOborSkolkyZakladky import OborSkolkyZakladkyModel
from ..exporterZarizeniSkolkyZakladky import ExporterZarizeniSkolkyZakladky
from ..exporterZarizeniSkolkyZakladky import ZarizeniSkolkyZakladkyModel

from ..exporterZarizeniSkolkyZakladkyAdresa import ExporterZarizeniSkolkyZakladkyAdresa
from ..exporterSkolkaZakladkaAdresa import ExporterSkolkaZakladkaAdresa
from ..exporterAdresa import ExporterAdresa
from ..exporterAdresa import ModelAdresa
from ..dbController import DbController

"""
Exporter for XML file with informations about the schools to the database
"""
class XMLExporterSkola():

    def __init__(self, dbController : DbController) -> None:
        self.dbController = dbController

        self.exporterAdresa = ExporterAdresa(dbController)
        self.exporterSkolkaZakladkaAdresa = ExporterSkolkaZakladkaAdresa(dbController)
        self.exporterZarizeniSkolkyZakladkyAdresa = ExporterZarizeniSkolkyZakladkyAdresa(dbController)


        self.exporterZarizeniDruhTyp = ExporterZarizeniDruhTyp(dbController)
        self.exporterSkolaDruhTyp = ExporterSkolaDruhTyp(dbController)
        
        self.exporterSkolkaZakladka = ExporterSkolkaZakladka(dbController)

        self.exporterOborSkolkyZakladky = ExporterOborSkolkyZakladky(dbController)
        self.exporterZarizeniSkolkyZakladky = ExporterZarizeniSkolkyZakladky(dbController)

    def export(self, fileName='vrejcelk.xml'):
        """
        Performs the export. 
        Args: 
            
        """
        tree = ET.parse(fileName)
        root = tree.getroot()
        pravniSubjektyEls : list[Element] = root.findall("PravniSubjekt")

        for pravniSubjektEl in pravniSubjektyEls:
            modelSkolkaZakladka = SkolkaZakladkaModel()

            nazev : str = pravniSubjektEl.find("Reditelstvi/RedPlnyNazev").text
            modelSkolkaZakladka.nazev = nazev
            nazevZkraceny = pravniSubjektEl.find("Reditelstvi/RedZkracenyNazev").text
            modelSkolkaZakladka.zkracenyNazev = nazevZkraceny

            druhZrizovatele : int = int(pravniSubjektEl.find("Reditelstvi/DruhZrizovatele").text)
            #5 == soukromá, 6 == církev 
            # 2 = obec, 7 = Kraj
            # 1 = MŠMT (státní správa)
            # 3 = Stát
            if(druhZrizovatele == 7):
                druhZrizovatele = "kr"
            elif(druhZrizovatele == 6):
                druhZrizovatele = "cirkev"
            elif(druhZrizovatele == 5):
                druhZrizovatele = "soukr"
            elif(druhZrizovatele == 3):
                druhZrizovatele = "st"
            elif(druhZrizovatele == 2):
                druhZrizovatele = "obec"
            elif(druhZrizovatele == 1):
                druhZrizovatele = "st"
            modelSkolkaZakladka.typZrizovateleKod = druhZrizovatele
            emailReditel = pravniSubjektEl.find("Reditelstvi/Email1").text
            modelSkolkaZakladka.reditelEmail = emailReditel

            reditelJmenoEl = pravniSubjektEl.find("Reditelstvi/Reditel/ReditelJmeno")
            if reditelJmenoEl is not None:
                modelSkolkaZakladka.reditel = reditelJmenoEl.text
            skolyZarizeniEls = pravniSubjektEl.findall("SkolyZarizeni/SkolaZarizeni")

            createdSkolkaZakladkaIDs : list[int] = []
            createdZarizeniSkolkyZakladkyModels : list[ZarizeniSkolkyZakladkyModel] = []
            createdZarizeniSkolkyZakladkyAddresses : list[list[Element]] = []
            for skolaZarizeni in skolyZarizeniEls:
                kapacita = -1
                try:
                    kapacita : int = int(skolaZarizeni.find("SkolaKapacita").text)
                except:
                    kapacita = -1
                jazyk = skolaZarizeni.find("SkolaJazyk").text
                if jazyk == "český":
                    jazyk = "ceJ"
                elif jazyk == "polský":
                    jazyk = "polJ"
                elif jazyk == "český+polský":
                    jazyk = "ceJ"
                modelSkolkaZakladka.jazykKod = jazyk
                
                datumZahajeni = skolaZarizeni.find("SkolaDatumZahajeni").text
                skolaDruhTyp = skolaZarizeni.find("SkolaDruhTyp").text
                skolaTypPlnyNazev = skolaZarizeni.find("SkolaPlnyNazev").text
                izo : int = int(skolaZarizeni.find("IZO").text)
                modelSkolkaZakladka.izo = izo
                

                if(skolaDruhTyp == "A00" or skolaDruhTyp == "B00" or skolaDruhTyp == "F10"):   
                    modelSkolkaZakladka.kapacita = kapacita
                    modelSkolkaZakladka.datumZahajeni = datumZahajeni

                    skolaDruhTypID = self.exporterSkolaDruhTyp.db_export_one(skolaDruhTyp, skolaTypPlnyNazev)
                    modelSkolkaZakladka.skolaDruhTypID = skolaDruhTypID

                    skolkaZakladkaID = self.exporterSkolkaZakladka.db_export_one(modelSkolkaZakladka)
                    if skolkaZakladkaID != None:
                        createdSkolkaZakladkaIDs.append(skolkaZakladkaID)

                        oboryVzdelavani = skolaZarizeni.findall("SkolaOboryVzdelani/SkolaOborVzdelani")
                        for obor in oboryVzdelavani:
                            oborSkolkyZakladkyModel = OborSkolkyZakladkyModel()
                            kod = obor.find("OborKod").text
                            nazev = obor.find("OborNazev").text
                            oborJazyk : int = int(obor.find("JazykOboru").text)
                            if oborJazyk == 10 or oborJazyk == 18:
                                oborJazyk = "ceJ"
                            elif oborJazyk == 50:
                                oborJazyk = "polJ"

                            delkaVzdelavani = obor.find("DelkaVzdelavani").text
                            if(delkaVzdelavani == "90"):
                                delkaVzdelavani = 9
                            elif(delkaVzdelavani == "80"):
                                delkaVzdelavani = 8
                            elif(delkaVzdelavani == "40"):
                                delkaVzdelavani = 4
                            elif(delkaVzdelavani == "A0"):
                                delkaVzdelavani = 10

                            oborKapacita : int = int(obor.find("OborKapacita").text)
                            oborDobihajici = bool(obor.find("OborDobihajici").text) #True -> ignoruj

                            oborSkolkyZakladkyModel.kod = kod
                            oborSkolkyZakladkyModel.nazev = nazev
                            oborSkolkyZakladkyModel.jazykKod = oborJazyk
                            oborSkolkyZakladkyModel.delkaVzdelavani = delkaVzdelavani
                            oborSkolkyZakladkyModel.kapacita = oborKapacita
                            oborSkolkyZakladkyModel.oborDobihajici = oborDobihajici
                            oborSkolkyZakladkyModel.skolkaZakladkaID = skolkaZakladkaID
                            
                            self.exporterOborSkolkyZakladky.db_export_one(oborSkolkyZakladkyModel)


                        oboryVzdelavaniZUS = skolaZarizeni.findall("SkolaOboryVzdelaniZUS/SkolaOborVzdelaniZUS")
                        for obor in oboryVzdelavaniZUS:
                            oborSkolkyZakladkyModel = OborSkolkyZakladkyModel()
                            kod = obor.find("OborZUS").text
                            nazev = obor.find("OborZUSNazev").text
                            kapacita : int = int(obor.find("OborZUSKapacita").text)

                            oborSkolkyZakladkyModel.kod = kod
                            oborSkolkyZakladkyModel.jazykKod = "ceJ"
                            oborSkolkyZakladkyModel.nazev = nazev
                            oborSkolkyZakladkyModel.kapacita = kapacita
                            oborSkolkyZakladkyModel.skolkaZakladkaID = skolkaZakladkaID

                            self.exporterOborSkolkyZakladky.db_export_one(oborSkolkyZakladkyModel)

                        adresyEls = skolaZarizeni.findall("SkolaMistaVykonuCinnosti/SkolaMistoVykonuCinnosti")
                        for adresa in adresyEls:
                            adresaLine1 = adresa.find("MistoAdresa1").text
                            adresaLine2 = adresa.find("MistoAdresa2").text
                            adresaLine3 = adresa.find("MistoAdresa3").text
                            #zatím nepodporujeme tento formát adres
                            try:
                                modelAdresa = self.adresaLinesToModelAdresa(adresaLine1, adresaLine2, adresaLine3)

                                adresaID = self.exporterAdresa.db_export_one(modelAdresa)

                                self.exporterSkolkaZakladkaAdresa.db_export_one(skolkaZakladkaID, adresaID)
                            except:
                                pass

                else:
                    zarizeniDruhTypID = self.exporterZarizeniDruhTyp.db_export_one(skolaDruhTyp, skolaTypPlnyNazev)
                    modelZarizeniSkolkyZakladky = ZarizeniSkolkyZakladkyModel()
                    modelZarizeniSkolkyZakladky.kapacita = int(kapacita)
                    modelZarizeniSkolkyZakladky.nazev = skolaTypPlnyNazev
                    modelZarizeniSkolkyZakladky.zarizeniDruhTypID = zarizeniDruhTypID
                    createdZarizeniSkolkyZakladkyModels.append(modelZarizeniSkolkyZakladky)
                    adresyEls = skolaZarizeni.findall("SkolaMistaVykonuCinnosti/SkolaMistoVykonuCinnosti")
                    createdZarizeniSkolkyZakladkyAddresses.append(adresyEls)

            for skolkaZakladkaID in createdSkolkaZakladkaIDs:
                for zarizeniSkolkyZakladkyModel in createdZarizeniSkolkyZakladkyModels:
                    zarizeniSkolkyZakladkyModel.skolkaZakladkaID = skolkaZakladkaID
                    zarizeniSkolkyZakladkyID = self.exporterZarizeniSkolkyZakladky.db_export_one(zarizeniSkolkyZakladkyModel)

                    adresyEls = skolaZarizeni.findall("SkolaMistaVykonuCinnosti/SkolaMistoVykonuCinnosti")
                    for adresa in adresyEls:
                        adresaLine1 = adresa.find("MistoAdresa1").text
                        adresaLine2 = adresa.find("MistoAdresa2").text
                        adresaLine3 = adresa.find("MistoAdresa3").text
                        #zatím nepodporujeme tento formát adres
                        try:
                            self.adresaLinesToModelAdresa(adresaLine1, adresaLine2, adresaLine3)

                            adresaID = self.exporterAdresa.db_export_one(modelAdresa)

                            self.exporterZarizeniSkolkyZakladkyAdresa.db_export_one(zarizeniSkolkyZakladkyID, adresaID)
                        except:
                            pass


    def adresaLinesToModelAdresa(self, adresaLine1 : str, adresaLine2 : str, adresaLine3 : str):
        """
        Args:
            adresaLine1: ulice CisloPopisne/CisloOrientacni | č.p. cisloPopisne
            adresaLine2: castMesta | psc mesto | psc mesto
            adresaLine3: psc mesto | psc cast_v_praze | None
        """
        print("---")
        print(adresaLine1)
        print(adresaLine2)
        print(adresaLine3)

        modelAdresa = ModelAdresa()

        if(adresaLine1.find("č.p.") != -1):
            modelAdresa.cisloDomovni = int(adresaLine1.replace("č.p. ", ""))

            modelAdresa.psc = adresaLine2[:6]
            modelAdresa.psc = modelAdresa.psc.replace(" ", "")

            modelAdresa.obecNameStr = adresaLine2[7:]
        else:
            ulice_splitted = adresaLine1.split("/")
            if len(ulice_splitted) > 1:
                modelAdresa.cisloOrientacni = ulice_splitted[1]
            lastSpacePos = ulice_splitted[0].rfind(" ")
            modelAdresa.ulice = ulice_splitted[0][:lastSpacePos]
            modelAdresa.cisloDomovni = int(ulice_splitted[0][lastSpacePos + 1:])

            if adresaLine3 == "" or adresaLine3 is None:
                modelAdresa.psc = adresaLine2[:6]
                modelAdresa.psc = modelAdresa.psc.replace(" ", "")
                modelAdresa.obecNameStr = adresaLine2[7:]
            else:
                modelAdresa.castObceStr = adresaLine2
                modelAdresa.psc = adresaLine3[:6]
                modelAdresa.psc = modelAdresa.psc.replace(" ", "")
                if adresaLine3.find("Praha") != -1:
                    modelAdresa.obecNameStr = "Praha"
                    modelAdresa.mestskyObvodMestskaCastNameStr = adresaLine3[7:]
                else:
                    modelAdresa.obecNameStr = adresaLine3[7:]
                    #obvodMestskaCast je None!!! Misto toho tam je castMestaStr
        modelAdresa.print()
        return modelAdresa