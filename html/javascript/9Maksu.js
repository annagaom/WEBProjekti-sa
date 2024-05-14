'use strict';

/**
 * Palauttaa valitun kielen ja asettaa alennuskoodien vahvistusviestit.
 */
const selectedLanguage = getSelectedLanguage();
let discountYes = '';
let discountNo = '';
switch (selectedLanguage) {
    case 'EN':
        discountYes = 'Discount code accepted! You get 15% discount.';
        discountNo = 'Invalid discount code.';
        break;
    case 'CN':
        discountYes = '折扣码已接受！您将获得 15% 的折扣。';
        discountNo = '无效的折扣码。';
        break;
    case 'ET':
        discountYes = 'Allahindluskood aktsepteeritud! Saate 15% allahindlust.';
        discountNo = 'Vigane allahindluskood.';
        break;
    case 'SV':
        discountYes = 'Rabattkoden accepterad! Du får 15% rabatt.';
        discountNo = 'Ogiltig rabattkod.';
        break;
    case 'FI':
    default:
        discountYes = 'Alennuskoodi hyväksytty! Saat 15% alennusta.';
        discountNo = 'Virheellinen alennuskoodi.';
        break;
}

/**
 * Käsittelee laskutusosoitteen näyttämisen ja piilottamisen checkboxin perusteella.
 */
const eriLaskutusCheckbox = document.getElementById('eri_laskutus');
const laskutusOsoiteDiv = document.getElementById('laskutus_osoite');

eriLaskutusCheckbox.addEventListener('change', () => {
    if (eriLaskutusCheckbox.checked) {
        laskutusOsoiteDiv.style.display = 'block';  // Näyttää laskutusosoitteen
    } else {
        laskutusOsoiteDiv.style.display = 'none';  // Piilottaa laskutusosoitteen
    }
});

/**
 * Käsittelee lomakkeen lähetyksen, kun DOM on ladattu.
 * Vahvistaa ja tyhjentää lomakkeen lähetyksen jälkeen.
 */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("maksutiedotForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Estää lomakkeen oletustoiminnan
        vahvistaJaTyhjenna();  // Kutsuu funktiota, joka vahvistaa ja tyhjentää lomakkeen
    });
});

/**
 * Käsittelee alennuskoodin soveltamisen.
 * 
 * Tämä funktio tarkistaa alennuskoodin ja antaa tuloksen, onko se hyväksytty.
 */
document.getElementById('applyDiscountButton').addEventListener('click', () => {
    const discountCode = document.getElementById('alennus').value.trim();

    let discountResult = discountNo;  // Oletusviesti, jos koodi ei ole hyväksytty

    // Tarkistaa, onko alennuskoodi kelvollinen
    if (discountCode === 'EnsiTilaus15' || discountCode === 'AlennusRyhma15') {
        discountResult = discountYes;
    }

    document.getElementById('discountResult').innerText = discountResult;  // Näyttää tuloksen
});
