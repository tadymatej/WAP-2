

INSERT INTO typ_role_uzivatele(nazev) VALUES('Student');
INSERT INTO typ_role_uzivatele(nazev) VALUES('Pracovník školy');
INSERT INTO typ_role_uzivatele(nazev) VALUES('Učitel');

INSERT INTO hodnoceni
  (hvezdicek, popis, jinaroleuzivatele, autor, skolaid, skolkazakladkaid, typroleuzivateleid) VALUES 
  (50, 'Krasny popis', null, 'Matěj Žalmánek', 987, null, 1);

INSERT INTO hodnoceni
  (hvezdicek, popis, jinaroleuzivatele, autor, skolaid, skolkazakladkaid, typroleuzivateleid) VALUES 
  (40, 'Mene krasny popis', null, 'Jan Zimola', 987, null, 1);

INSERT INTO hodnoceni
  (hvezdicek, popis, jinaroleuzivatele, autor, skolaid, skolkazakladkaid, typroleuzivateleid) VALUES 
  (45, 'Mene krasny popis', null, 'Mamka', 987, null, 2);

INSERT INTO hodnoceni
  (hvezdicek, popis, jinaroleuzivatele, autor, skolaid, skolkazakladkaid, typroleuzivateleid) VALUES 
  (10, 'Ten gympl je pry těžky :(', 'Jen kamarád kamaráda', 'Kamarad Bob', 984, null, null);