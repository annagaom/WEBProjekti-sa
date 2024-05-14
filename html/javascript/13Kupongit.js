'use strict';

/**
 * Hakee valitun kielen HTML-elementistä.
 *
 * @returns {string} Valittu kieli, oletusarvoisesti 'FI'.
 */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/**
 * Näyttää tai piilottaa kupongin käyttäjän statuksen perusteella.
 *
 * Kun sivu on ladattu, tarkistaa käyttäjän statuksen ja asettaa kupongin näkyvyyden.
 */
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');  // Hakee tunnistetiedot

    const base64Payload = token.split('.')[1];  // Osa JWT-tokenista
    const payload = atob(base64Payload);  // Dekoodaa Base64
    const parsedPayload = JSON.parse(payload);  // Parsii JSON-muodossa
    const userID = parsedPayload.asiakas_id;  // Hakee käyttäjän ID:n

    const userStatusElement = document.getElementById('userStatus');  // Kupongin HTML-elementti

    if (token) {
        fetch(`http:/localhost:3000/api/v1/asiakas/alennus/${userID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,  // Käyttää Bearer-tokenia
            },
        })
            .then(response => response.json())  // Parsii vastaus JSON-muodossa
            .then(data => {
                if (data.isEligible) {  // Tarkistaa, onko käyttäjä oikeutettu alennukseen
                    userStatusElement.style.display = 'block';  // Näyttää kupongin
                } else {
                    userStatusElement.style.display = 'none';  // Piilottaa kupongin
                }
            })
            .catch(error => {
                console.error("Virhe kupongin näkyvyyden tarkistuksessa: ", error);
            });
    }
});

/**
 * Kopioi annetun tekstin leikepöydälle ja näyttää vahvistusviestin.
 *
 * @param {string} text - Teksti, joka kopioidaan.
 */
function copyToClipboard(text) {
    const selectedLanguage = getSelectedLanguage();

    navigator.clipboard.writeText(text).then(() => {
        // Näyttää vahvistusviestin valitulla kielellä
        switch (selectedLanguage) {
            case 'EN':
                alert("Code copied to clipboard: " + text);
                break;
            case 'CN':
                alert("代码已复制到剪贴板：" + text);
                break;
            case 'ET':
                alert("Kood kopeeritud lõikelauale: " + text);
                break;
            case 'SV':
                alert("Koden kopierades till urklipp: " + text);
                break;
            case 'FI':
            default:
                alert("Koodi kopioitu leikepöydälle: " + text);
                break;
        }
    }).catch(err => {
        console.error("Virhe kopioitaessa leikepöydälle: ", err);
        // Näyttää virheviestin, jos kopiointi epäonnistuu
        switch (selectedLanguage) {
            case 'EN':
                alert("Error copying to clipboard. Please try again.");
                break;
            case 'CN':
                alert("复制到剪贴板时出错。请再试一次。");
                break;
            case 'ET':
                alert("Lõikelauale kopeerimisel tekkis viga. Proovige uuesti.");
                break;
            case 'SV':
                alert("Fel vid kopiering till urklipp. Försök igen.");
                break;
            case 'FI':
            default:
                alert("Virhe kopioitaessa leikepöydälle. Yritä uudelleen.");
                break;
        }
    });
}

/**
 * Asettaa tapahtumakuuntelijat alennuskoodien kuville.
 * Kun sivu on ladattu, liitetään kuuntelijat kupongin kopioimiseen.
 */
document.addEventListener("DOMContentLoaded", () => {
    const ensiTilausImg = document.getElementById("ensi_tilaus_img");  // Kuva EnsiTilaus-koodille
    const alennusRyhmaImg = document.getElementById("alennus_ryhma_img");  // Kuva AlennusRyhma-koodille

    ensiTilausImg.addEventListener("click", () => {
        copyToClipboard("EnsiTilaus15");  // Kopioi koodin EnsiTilaus15
    });

    alennusRyhmaImg.addEventListener("click", () => {
        copyToClipboard("AlennusRyhma15");  // Kopioi koodin AlennusRyhma15
    });
});
