

import psycopg2

class DbController():

    def __del__(self):
        self.cur.close()
        self.conn.close()

    def __init__(self, cursor_factory=None) -> None:
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
        self.cur = self.conn.cursor(cursor_factory=cursor_factory)
