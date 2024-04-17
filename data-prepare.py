
import json
import pandas as pd
import psycopg2

class Importer():

    def __del__(self):
        self.cur.close()
        self.conn.close()

    def __init__(self) -> None:
        # Define connection parameters
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


        self.cur.execute("SELECT 'CREATE DATABASE schools' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'schools')")


        self.cur.execute("CREATE TABLE IF NOT EXISTS kraj (ID INT, VARCHAR() Nazev, VARCHAR(20) Kod);")
        self.cur.execute("SELECT datname FROM pg_database;")

        self.cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_catalog='schools'")

    def db_clear(self):
        self.cur.execute("DROP TABLE IF EXISTS MyTable")

        self.cur.execute("DROP TABLE IF EXISTS kraj")


    def db_import_kraj(self, id : int, kod3 : str, nazev : str):
        pass

    def import_kraje(self):
        df = pd.read_json("kraje.json")
        polozky = df.get("polozky")
        for key in polozky.keys():
            kod = polozky[key].get("kod")
            kod3 = polozky[key].get("kodNuts3")
            nazev = polozky[key].get("nazev")["cs"]

            self.db_import_kraj(kod, kod3, nazev)

    def printResult(self):
                # Fetch all rows from the result
        rows = self.cur.fetchall()

        # Print the list of databases
        for row in rows:
            print(row[0])



i = Importer()
i.printResult()


