'use strict';

/**
 * Toimituksen arvioitu aika sekunteina.
 * 
 * @type {number}
 */
const estimatedDeliveryTime = 3600;  // 1 tunti sekunteina

/**
 * Jäljellä oleva aika sekunteina.
 * 
 * @type {number}
 */
let timeRemaining = estimatedDeliveryTime;  // Alustetaan toimituksen arvioidulla ajalla

/**
 * Muotoilee ajan minuutteina ja sekunteina.
 *
 * @param {number} seconds - Aika sekunteina.
 * @returns {string} Muotoiltu aika "minuuttia sekuntia".
 */
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} s`;
}

/**
 * Päivittää ajastimen näytöllä joka sekunti.
 * Kun aika on loppunut, lopettaa ajastimen.
 */
function updateTimer() {
    const timerElement = document.getElementById('timer');  // Haetaan ajastimen HTML-elementti
    if (timeRemaining >= 0) {
        timerElement.textContent = formatTime(timeRemaining);  // Päivittää ajastimen tekstisisällön
        timeRemaining -= 1;  // Vähentää yhden sekunnin jäljellä olevasta ajasta
        setTimeout(updateTimer, 1000);  // Asettaa uuden päivityksen sekunnin kuluttua
    }
}

/**
 * Käynnistää ajastimen, kun sivu on ladattu.
 */
window.onload = updateTimer;  // Kun sivu latautuu, ajastin alkaa päivittyä
