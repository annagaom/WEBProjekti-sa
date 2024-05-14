[Linkki serveriin](https://users.metropolia.fi/~sarapap/WEBProjekti/)

[Linkki suoraan etusivulle](https://users.metropolia.fi/~sarapap/WEBProjekti/html/fi/1Etusivu.html)


[Linkki ecloud](http://10.120.32.68/app/fi/11Login.html)

Suosittelemme laittamaan noden pyörimään testausta varten (ecloudin kanssa ollut ongelmia).


Terminaaliin:

git clone https://github.com/sarapap/WEBProjekti.git

npm i

npm run dev


S&A CAFE - ANNA & SARA

Sovelluksemme on ravintolateemainen verkkosivusto, joka antaa käyttäjille mahdollisuuden tutustua S&A Cafe -kahvilamme tuotteisiin, tehdä tilauksia ja varata pöytiä. Tarjontaamme kuuluu monipuolinen valikoima kakkuja, suolaisia leivonnaisia, salaatteja, leipiä ja makeita leivonnaisia. Äskettäin lisäsimme valikoimaamme myös lämpimiä aterioita, joita voi nauttia lounaaksi tai illalliseksi. Koska olemme pääasiassa kahvila, tarjoamme myös laajan valikoiman kahveja ja muita kahvilajuomia.

Kohderyhmä: Kahvilassa kävijät, kuten opiskelijat ja työssäkäyvät aikuiset (kun etsii esimerkiksi opiskelu-, lounas- tai illallispaikkaa). Koska hinnat ovat melko kalliita, niin kohderyhmä keskittyy täysikäisiin. Myös ihmiset, jotka tilaavat ruokaa verkosta ja tekevät tilavarauksia.

Toiminnallisuus: Sovellus mahdollistaa kielen vaihdon FI/EN/SV/ET/CN. Jokainen toiminnallisuus on mahdollista eri kielillä. Sovellus antaa mahdollisuuden lähettää lomakkeita, kuten palautetta joka tallentuu tietokantaan, ja tilanvarauslomakkeen, joka lähettää tilanvarauskyselyn omistajan Saran sähköpostiin.

Pääkäyttäjällä on mahdollisuus muokata etusivun alaosasta löytyvän linkin kautta tuotteita (lisätä tuotteen, lisätä erityisruokavalioita sekä poistaa niitä, sekä muokata valikoiman tuotteita), tarkastella yritystoimintaa, sekä tarkastella saatuja palautteita. Myös uuden käyttäjän lisääminen manuaalisesti kuuluu pääkäyttäjän sivun ominaisuuksiin (jos haluaa lisätä esimerkiksi uuden pääkäyttäjän, kun rekisteröityessä käyttäjästä tulee suoraan normaali käyttäjä.) Normaalilla käyttäjällä (vieras tai rekisteröitynyt) ei ole mahdollisuutta päästä tälle sivulle.

Käyttäjän on mahdollista rekisteröityä ja kirjautua sisään. Käyttäjällä on mahdollisuus kirjautuneena lisätä suosikkeihin ja ostoskoriin tuotteita (jatkokehitys: myös kirjautumatta/rekisteröitymättä voi lisätä suosikkeihin/lisätä ostoskoriin). Ostoskoriin lisätessä voi valita myös määrän. Nämä tiedot pysyvät vaikka käyttäjä kirjautuisi ulos. Käyttäjä voi myös poistaa tuotteita suosikeista ja ostoskorista. Käyttäjä voi lisätä omat maksutietonsa ja saada tilaus tehtyä. Tilaus tallennetaan käyttäjän omiin tietoihin (ja tulee myös päähallinnan yritystoiminnan tietoihin).

Kun käyttäjä on kirjautuneena, aiempi kirjautumispainike onkin nyt painike omiin tietoihin. Omissa tiedoissa on lueteltuna kaikki käyttäjän määrittelemät tiedot. Käyttäjä voi vaihtaa omia tietojaan (tietoja voi vaihtaa yksitellen), sekä vaihtaa oman salasanan. Käyttäjä voi myös ilmoittaa halutessaan omat ruoka-allergiat, ja niitäkin on mahdollista poistaa. Kun nämä on kirjattu, ne näkyvät Omat Tiedot -sivulla. Samalla sivulla on mahdollisuus tarkastella tilauksia, joita käyttäjä on tehnyt. Sivulla on myös kupongit, joita käyttäjä voi hyödyntää. Kun kuponkia klikkaa, se kopioi leikepöydälle koodin, jota voi hyödyntää, kun käyttäjä on suorittamassa maksua (jatkokehityksenä vielä, että koodi antaa alennusta). Jos rekisteröityessä on määritellyt onko opiskelija tai eläkeläinen (vapaaehtoinen), niin sivulle tulee esiin kuponki, joka on vain niille, jotka ovat jomman kumman näistä valinneet. Jos tätä valintaa ei ole tehnyt, kuponkia ei tule esiin.

Ohjeet:

Kielen Vaihto
- Etsi sovelluksesta kielivalikko.
- Valitse haluamasi kieli (FI, EN, SV, ET, CN).

Rekisteröityminen ja Kirjautuminen

- Etsi rekisteröitymisvaihtoehto ja anna pyydetyt tiedot
- Kirjaudu sisään: Käytä rekisteröitymisen yhteydessä luomaasi tunnusta ja salasanaa.
- Tarkista omat tiedot kirjautumisen jälkeen ja päivitä tarvittaessa.

Ostoskori ja Suosikit

- Valitse tuote ja klikkaa "Lisää ostoskoriin".
- Voit valita tuotteiden määrän ostoskorissa.
- Jos haluat tallentaa tuotteen suosikiksi, klikkaa "Lisää suosikkeihin".
- Siirry ostoskoriin ja seuraa ohjeita tilauksen tekemiseksi.
- Voit poistaa tuotteita suosikeista ja ostoskorista.

Maksutietojen Lisäys ja Tilausten Hallinta

- Tilauksen tekeminen: Kun olet valmis, siirry ostoskoriin ja tee tilaus.
- Tilausten tarkastelu: Voit nähdä tehdyt tilaukset "Omat tiedot" -osiossa.
- Jos käytössäsi on kuponki, klikkaa sitä kopioidaksesi koodi.

Palaute ja Tilanvaraus

- Mene "Palaute"-osioon ja täytä lomake. Lähetä palaute.
- Käytä tilanvarauslomaketta varataksesi tilan. Lomake lähettää varauskyselyn sähköpostitse omistajalle.

Pääkäyttäjän Toiminnot (jos olet pääkäyttäjä)

- Tuotteiden hallinta: Voit lisätä, muokata ja poistaa tuotteita etusivun alaosan linkistä.
- Yritystoiminnan tarkastelu: Pääkäyttäjä voi tarkastella yritystoiminnan tietoja ja saatuja palautteita.
- Uusien käyttäjien lisääminen: Voit lisätä uusia käyttäjiä manuaalisesti, mukaan lukien uusia pääkäyttäjiä.
