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
 * Käsittelee rekisteröintilomakkeen lähetyksen ja suorittaa käyttäjän rekisteröinnin.
 *
 * Kun sivu on ladattu, liitetään tapahtumakuuntelija lomakkeen lähettämiseen.
 */
document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.querySelector('#register-form');
    const selectedLanguage = getSelectedLanguage();

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();  // Estää lomakkeen oletustoiminnan

            const data = {
                etunimi: document.getElementById('firstname')?.value || '',
                sukunimi: document.getElementById('lastname')?.value || '',
                tunnus: document.getElementById('tunnus')?.value || '',
                salasana: document.getElementById('password')?.value || '',
                email: document.getElementById('email')?.value || '',
                puhelin: document.getElementById('phone') ? parseInt(document.getElementById('phone').value, 10) : null,
                syntymapaiva: document.getElementById('syntymapaiva')?.value.trim() || null,
                rooli: 'user',
                ehdot_hyvaksytty: document.querySelector('#accept-1')?.checked ? 1 : 0,
                allennus_ryhma: document.querySelector('input[name="status"]:checked')?.value || null,
            };

            // Varmistaa, että käyttäjä hyväksyy ehdot ennen rekisteröintiä
            if (data.ehdot_hyvaksytty === 0) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert('You must accept the terms.');
                        break;
                    case 'CN':
                        alert('您必须接受条款。');
                        break;
                    case 'ET':
                        alert('Teil tuleb tingimused heaks kiita.');
                        break;
                    case 'SV':
                        alert('Du måste godkänna villkoren.');
                        break;
                    case 'FI':
                    default:
                        alert('Sinun on hyväksyttävä ehdot.');
                        break;
                }
                return;  // Keskeyttää, jos ehdot eivät ole hyväksytyt
            }

            // Lähettää rekisteröintitiedot palvelimelle
            fetch('http:/localhost:3000/api/v1/asiakas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),  // Lähettää tiedot JSON-muodossa
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();  // Parsii vastaus JSON-muodossa
                    } else {
                        throw new Error('Registration failed.');  // Heittää virheen, jos rekisteröinti epäonnistuu
                    }
                })
                .then(data => {
                    const token = data.token;  // Hakee JWT-tokenin palvelimen vastauksesta

                    if (token) {
                        localStorage.setItem('authToken', token);  // Tallentaa tokenin paikallisesti

                        let targetPage = '';  // Määrittää sivun, jonne siirrytään rekisteröinnin jälkeen
                        switch (selectedLanguage) {
                            case 'EN':
                                alert('Registration successful. Welcome!');
                                targetPage = '../../html/en/7Kayttaja_en.html';
                                break;
                            case 'CN':
                                alert('注册成功。欢迎！');
                                targetPage = '../../html/cn/7Kayttaja_cn.html';
                                break;
                            case 'ET':
                                alert('Registreerimine õnnestus. Tere tulemast!');
                                targetPage = '../../html/et/7Kayttaja_et.html';
                                break;
                            case 'SV':
                                alert('Registreringen lyckades. Välkommen!');
                                targetPage = '../../html/sv/7Kayttaja_sv.html';
                                break;
                            case 'FI':
                            default:
                                alert('Rekisteröinti onnistui. Tervetuloa!');
                                targetPage = '../../html/fi/7Kayttaja.html';
                                break;
                        }

                        window.location.href = targetPage;  // Uudelleenohjaus rekisteröinnin jälkeen
                    } else {
                        throw new Error('Registration token missing.');  // Heittää virheen, jos token puuttuu
                    }
                })
                .catch(error => {
                    console.error('Virhe rekisteröinnissä: ', error);
                    // Käsittelee virheen kielen perusteella
                    switch (selectedLanguage) {
                        case 'EN':
                            alert('An error occurred during registration. Please try again later.');
                            break;
                        case 'CN':
                            alert('注册时发生错误。请稍后再试。');
                            break;
                        case 'ET':
                            alert('Registreerimisel ilmnes viga. Proovige hiljem uuesti.');
                            break;
                        case 'SV':
                            alert('Ett fel uppstod vid registrering. Försök igen senare.');
                            break;
                        case 'FI':
                        default:
                            alert('Virhe rekisteröinnissä. Yritä myöhemmin uudelleen.');
                            break;
                    }
                });
        });
    }
});
