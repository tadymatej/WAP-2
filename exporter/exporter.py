

import psycopg2

from .dbController import DbController

class Exporter():

    def printResult(self):
        raise NotImplementedError()

    def db_create(self):
        raise NotImplementedError()

    def db_clear(self):
        raise NotImplementedError()

    def json_export(self):
        raise NotImplementedError()

    def printResult(self):
        raise NotImplementedError()
        
    def db_select(self):
        raise NotImplementedError()

    def __init__(self, dbController : DbController) -> None:
        self.dbController = dbController
        self.cur = dbController.cur
