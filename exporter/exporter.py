

import psycopg2

class Exporter():

    def __del__(self):
        self.cur.close()
        self.conn.close()

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

    def db_clear(self):
        raise NotImplementedError()

    def __init__(self) -> None:
        host = "localhost"
        database = "schools"
        user = "myuser"
        password = "mypassword"

        # Connect to PostgreSQL server
        self.conn = psycopg2.connect(
            host=host,
            database=database,
            user=user,
            password=password
        )
        self.conn.autocommit = True 

        # Create a cursor for executing SQL commands
        self.cur = self.conn.cursor()

        self.db_clear()
        self.db_create()
