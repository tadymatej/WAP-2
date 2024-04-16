
import json
import pandas as pd

from sqlalchemy import create_engine

def db_import_kraj(id : int, kod3 : str, nazev : str):
    pass

def import_kraje():
    df = pd.read_json("kraje.json")
    polozky = df.get("polozky")
    for key in polozky.keys():
        kod = polozky[key].get("kod")
        kod3 = polozky[key].get("kodNuts3")
        nazev = polozky[key].get("nazev")["cs"]

        db_import_kraj(kod, kod3, nazev)



# Definice cesty k CSV souboru a cesty k SQLite databázi
csv_file_path = 'path/to/your/csv/file.csv'
database_url = 'postgresql://username:password@localhost/database_name'

# Načtení dat z CSV do pandas DataFrame
df = pd.read_csv(csv_file_path)

# Vytvoření připojení k databázi pomocí SQLAlchemy
engine = create_engine(database_url)

# Import dat z pandas DataFrame do databáze
df.to_sql('table_name', con=engine, if_exists='replace', index=False)

import_kraje()