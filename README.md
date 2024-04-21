# WAP projekt - vyhledávač škol a školek

Cílem projetku bylo vytvořit webovou aplikaci, která umožní uživateli vyhledávat a vybírat školy dle preferencí daného uživatele. Aplikace cílí na dvě skupiny uživatelů. První skupinou jsou maminky a rodiče dětí v předškolním věku, kteří vyhledávají mateřskou školku pro své dítě v okolí, případně základní školu. Problémem dnešní doby je ten, že kapacita školek je značně omezená a kvůli uprchlické krizi v souvislosti s válkou na Ukrajině je tento problém velmi častý. Aplikace tedy umožní rodičům vyhledat školku v blízkém okolí pro jejich dítě.

Obdobně poté pro studenty základních, středních, případně vysokých škol, umožní aplikace vyhledat příslušné obory (školy) na středních / vysokých školách. I zde, zejména pro žáky středních škol je v dnešní době složité se dostat na střední školu z kapacitních důvodů, znovu z důvodů uprchlické krize. Například v roce 2024 se hlásilo 98 945 žáků, naopak v roce 2023 se hlásilo na střední školy 89 729 žáků, což je nárůst o asi 10%. Dále pokud se podíváme, kolik žáků se hlásilo v roce 2021, tak to bylo dokonce pouze 60 991. [Zdroj](https://www.to-das.cz/pocet-prihlasenych-na-stredni-skoly-2024-jak-zjistit-pocet-prihlasek-na-ss-statistiky-podanych-prihlasek-vcetne-priorit/), [Zdroj2](https://prijimacky.cermat.cz/aktuality/85-aktuality/343-jpz-pocty-uchazecu-prihlasek-2023)

Z těchto důvodů jsme se rozhodli tvořit tuto aplikaci, která se snaží ulehčit vyhledání preferované školy uživatelům, včetně prioritizace vyhledávaných škol. 

V dohledné době se chystáme tuto aplikaci také publikovat.

## Authors
- Matěj Žalmánek (xzalma00)
  - Extrakce a zpracování dat ze souborů XML, JSON
  - Backend implementace
  - implementace části Frontendu

- Jan Zimola (xzimol04)
  - Návrh uživatelského rozhraní ve Figmě
  - implementace Části backendu
  - Frontend implementace

## Spuštění

### Python scripty pro přípravu dat

#### Instalace knihoven
Pro správnou funkci knihoven pythonu jsou potřeba následující knihovny:
- pandas
- psycopg2
- ET
- geopy

Pokud nejsou nainstalovány globálně, lze je nainstalovat lokálně následujícím způsobem:
```
python3 -m venv myenv
source myenv/bin/activate
pip3 install pandas
pip3 install psycopg2
pip3 install ET
pip3 install geopy
```

#### Generování databáze
Pro generování spustte následující příkazy v root složce projektu:
```
python3 data-prepare.py
```

#### 
```
python3 obce-get-coordinates.py
```

#### Použití .sql souboru
Pro rychlejší generování databáze jsme vyexportovali výsledný .sql script, který je uložen ve složce
- /db/schools.sql

### Spuštění projektu
Pro spuštění projektu aplikace spustte následující příkazy ze složky ./wap_schools_2/
```
```

## Dokumentace

Schéma vytvořené databáze lze vidět v souboru 
![/docs/ER.png](/docs/ER.png)

Ve stejné složce je poté dokumentace všech kodů, včetně kodů pro extrakci dat z formátu json, XML, stejně tak dokumentace kodu výsledné aplikace.