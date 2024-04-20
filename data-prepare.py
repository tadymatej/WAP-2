
import json
import pandas as pd

from exporter.exporterKraj import ExporterKraj
from exporter.exporterOkres import ExporterOkres
from exporter.exporter import Exporter
from exporter.exporterObec import ExporterObec
from exporter.exporterJazyk import ExporterJazyk
from exporter.exporterTypZrizovatele import ExporterTypZrizovatele
from exporter.exporterTypSkoly import ExporterTypSkoly
from exporter.exporterDruhPodskoly import ExporterDruhPodskoly
from exporter.exporterDruhStudia import ExporterDruhStudia
from exporter.exporterFormaStudia import ExporterFormaStudia
from exporter.exporterUkonceniStudia import ExporterUkonceniStudia
from exporter.exporterVhodnostProZaky import ExporterVhodnostProZaky
from exporter.exporterStupenVzdelani import ExporterStupenVzdelani
from exporter.exporterPrijimaciZkouska import ExporterPrijimaciZkouska
from exporter.exporterSkola import ExporterSkola
from exporter.exporterSkolaVyucovanyJazyk import ExporterSkolaVyucovanyJazyk
from exporter.exporterPodskola import ExporterPodskola
from exporter.exporterSkolaVyucovanyJazyk import ExporterSkolaVyucovanyJazyk
from exporter.exporterObor import ExporterObor
from exporter.exporterOborPrijimaciZkouska import ExporterOborPrijimaciZkouska
from exporter.exporterOborVhodnostProZaky import ExporterOborVhodnostProZaky
from exporter.exporterMestskaCastObvod import ExporterMestskaCastObvod
from exporter.exporterAdresa import ExporterAdresa
from exporter.exporterCastObce import ExporterCastObce

from exporter.xmlExporters.xmlExporterSkola import XMLExporterSkola

from exporter.exporterSkolaDruhTyp import ExporterSkolaDruhTyp
from exporter.exporterZarizeniDruhTyp import ExporterZarizeniDruhTyp
from exporter.exporterSkolkaZakladka import ExporterSkolkaZakladka
from exporter.exporterSkolkaZakladkaAdresa import ExporterSkolkaZakladkaAdresa
from exporter.exporterOborSkolkyZakladky import ExporterOborSkolkyZakladky
from exporter.exporterZarizeniSkolkyZakladky import ExporterZarizeniSkolkyZakladky
from exporter.exporterZarizeniSkolkyZakladkyAdresa import ExporterZarizeniSkolkyZakladkyAdresa
from exporter.dbController import DbController
from exporter.exporterHodnoceni import ExporterHodnoceni
from exporter.exporterTypRoleUzivatele import ExporterTypRoleUzivatele

def main():

    dbController = DbController()


    exporters : list[Exporter] = [ExporterKraj(dbController), ExporterOkres(dbController), ExporterObec(dbController),  ExporterCastObce(dbController), ExporterJazyk(dbController), ExporterTypZrizovatele(dbController), ExporterMestskaCastObvod(dbController), 
                                  ExporterTypSkoly(dbController), ExporterDruhPodskoly(dbController), ExporterDruhStudia(dbController), 
                                  ExporterFormaStudia(dbController), ExporterUkonceniStudia(dbController), ExporterVhodnostProZaky(dbController),
                                  ExporterStupenVzdelani(dbController), ExporterPrijimaciZkouska(dbController), ExporterSkola(dbController)]

    exportersClearCreate = exporters.copy()
    exportersClearCreate.extend([ExporterSkolaVyucovanyJazyk(dbController), ExporterPodskola(dbController), ExporterObor(dbController), ExporterOborPrijimaciZkouska(dbController),
                                ExporterOborVhodnostProZaky(dbController), ExporterAdresa(dbController), 
                                
                                ExporterZarizeniDruhTyp(dbController), ExporterSkolaDruhTyp(dbController), 
                                ExporterSkolkaZakladka(dbController), ExporterZarizeniSkolkyZakladky(dbController),
                                ExporterOborSkolkyZakladky(dbController),
                                ExporterZarizeniSkolkyZakladkyAdresa(dbController), ExporterSkolkaZakladkaAdresa(dbController),

                                ExporterTypRoleUzivatele(dbController), ExporterHodnoceni(dbController)])

    for exporter in exportersClearCreate:
        exporter.db_clear()

    for exporter in exportersClearCreate:
        exporter.db_create()

    for exporter in exporters:
        print("exporting ", exporter)
        exporter.json_export()

    xmlExorterSkola = XMLExporterSkola(dbController)

    exportersPrint : list[Exporter] = [ExporterObec(dbController)]

    for exporter in exportersPrint:
        exporter.db_select()
        exporter.printResult()

main()