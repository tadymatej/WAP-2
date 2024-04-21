

import psycopg2

from .dbController import DbController

class Exporter():
    """
    Exporter which will do exports from json / model to database
    """

    def printResult(self):
        """
        Prints the last query result
        """
        raise NotImplementedError()

    def db_create(self):
        """
        Creates table in database
        """
        raise NotImplementedError()

    def db_clear(self):
        """
        Drops the database and its referenced tables
        """
        raise NotImplementedError()

    def json_export(self):
        """
        Exports data from json file to database
        """
        raise NotImplementedError()
    
    def db_select(self):
        """
        Perform SQL select on this table
        """
        raise NotImplementedError()

    def __init__(self, dbController : DbController) -> None:
        self.dbController = dbController
        self.cur = dbController.cur
