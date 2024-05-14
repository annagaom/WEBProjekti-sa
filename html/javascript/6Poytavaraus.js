'use strict';

/**
 * Hakee valitun kielen ja palauttaa sen.
 *
 * @returns {string} Valittu kieli. Oletusarvoisesti 'FI'.
 */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/**
 * Modaalin käsittely lomaketta varten.
 * Tämä osio asettaa tapahtumakuuntelijat modaalin avaamiselle, sulkemiselle ja sulkemiselle klikkauksella modaalin ulkopuolella.
 */
const modal = document.getElementById("myModal");
const openModalButton = document.getElementById("open-modal");
const closeModalButton = document.getElementById("close-modal");

/**
 * Avaa modaalin.
 */
openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.add("open");
});

/**
 * Sulkee modaalin.
 */
closeModalButton.addEventListener("click", () => {
    modal.classList.remove("open");
});

/**
 * Sulkee modaalin, jos käyttäjä klikkaa sen ulkopuolella.
 */
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("open");
    }
});

/**
 * Sähköpostin lähetys asetukset.
 * Tämä alustaa EmailJS:ää käytettäväksi lomakkeen lähettämiseen sähköpostilla.
 */
(function () {
    emailjs.init({
        publicKey: "mGRHyPrtmHQmZuMpt",
    });
})();

/**
 * Lähettää lomakkeen sähköpostitse EmailJS:n avulla.
 *
 * @returns {boolean} Väärä, jotta lomake ei aiheuta sivun uudelleenlatausta.
 */
function sendEmail() {
    const selectedLanguage = getSelectedLanguage();

    // Määritetään, mihin sivulle siirrytään onnistuneen lähetyksen jälkeen
    let targetPage = '';
    switch (selectedLanguage) {
        case 'EN':
            targetPage = '../en/6Poytavaraus_en.html';
            break;
        case 'CN':
            targetPage = '../cn/6Poytavaraus_cn.html';
            break;
        case 'ET':
            targetPage = '../et/6Poytavaraus_et.html';
            break;
        case 'SV':
            targetPage = '../sv/6Poytavaraus_sv.html';
            break;
        case 'FI':
        default:
            targetPage = '../fi/6Poytavaraus.html';
            break;
    }

    // Lähetetään lomake EmailJS:n avulla
    emailjs
        .sendForm("service_r413uj9", "template_gxtq4ji", "#bookingForm")
        .then(
            function (response) {
                // Käsitellään onnistunut vastaus valitun kielen perusteella
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Form submitted successfully!");
                        break;
                    case 'CN':
                        alert("表格已成功提交！");
                        break;
                    case 'ET':
                        alert("Vorm on edukalt saadetud!");
                        break;
                    case 'SV':
                        alert("Formuläret har skickats framgångsrikt!");
                        break;
                    case 'FI':
                    default:
                        alert("Lomake lähetetty onnistuneesti!");
                        break;
                }
                // Ohjaa valittuun sivuun onnistumisen jälkeen
                window.location.href = targetPage;
            },
            function (error) {
                // Käsitellään virhe valitun kielen perusteella
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Failed to send the form. Please try again later.");
                        break;
                    case 'CN':
                        alert("提交表格失败。请稍后再试。");
                        break;
                    case 'ET':
                        alert("Vormi saatmine ebaõnnestus. Palun proovi hiljem uuesti.");
                        break;
                    case 'SV':
                        alert("Misslyckades med att skicka formuläret. Försök igen senare.");
                        break;
                    case 'FI':
                    default:
                        alert("Lomakkeen lähetys epäonnistui. Yritä uudelleen myöhemmin.");
                        break;
                }
            }
        );

    return false;  // Estää lomakkeen oletustehon, kuten sivun uudelleenlatauksen
}
