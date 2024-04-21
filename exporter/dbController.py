

import psycopg2

class DbController():
    """
    Controller for database. It allows to perform DB queries throught cur (cursor)
    """

    def __del__(self):
        self.cur.close()
        self.conn.close()

    def __init__(self, cursor_factory=None, host="localhost", database="schools", user="myuser", password="mypassword") -> None:
        """
        Kwargs:
            cursor_factory: factory which will create the cursor.
            host: host to connect to
            database: database to connect to
            user: user which should be used for the db connection
            password: password for the given user
        """

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
