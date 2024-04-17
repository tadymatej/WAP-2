
import json
import pandas as pd
import psycopg2

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

def main():

    #exporters : list[Exporter] = [ExporterKraj(), ExporterOkres(), ExporterObec()]
    exporters : list[Exporter] = [ExporterKraj(), ExporterOkres(), ExporterJazyk(), ExporterTypZrizovatele(), 
                                  ExporterTypSkoly(), ExporterDruhPodskoly(), ExporterDruhStudia(), 
                                  ExporterFormaStudia(), ExporterUkonceniStudia(), ExporterVhodnostProZaky(),
                                  ExporterStupenVzdelani(), ExporterPrijimaciZkouska()]
    for exporter in exporters:
        exporter.json_export()
        exporter.db_select()
        exporter.printResult()


main()

