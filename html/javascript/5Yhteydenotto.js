'use strict';

/**
 * Luo ja asettaa Leaflet-kartan alkuperäiseen näkymään.
 * 
 * @param {string} elementId - HTML-elementin ID, johon kartta luodaan.
 * @param {Array<number>} coordinates - Kartan aloituskoordinaatit [latitude, longitude].
 * @param {number} zoom - Kartan zoom-taso.
 * @returns {L.Map} Leaflet-karttaobjekti.
 */
const map = L.map('map').setView([60.1614905, 24.9318391], 16);

/**
 * Lisää OpenStreetMap-laattakerroksen karttaan.
 * 
 * @param {L.Map} map - Leaflet-kartta, johon laattakerros lisätään.
 * @param {string} tileUrl - URL-osoite laattakerrokselle.
 * @param {Object} options - Lisäasetukset, kuten attribuutio.
 */
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

/**
 * Luo Leaflet-ikoni, jota käytetään merkitsimessä.
 * 
 * @param {string} iconUrl - URL-osoite kuvamerkille.
 * @param {Array<number>} iconSize - Ikonin koko [leveys, korkeus].
 * @returns {L.Icon} Leaflet-ikoniobjekti.
 */
const newIcon = L.icon({
    iconUrl: '../css/kuvat/marker.png',
    iconSize: [50, 50],
});

/**
 * Lisää merkitsimen karttaan ja avaa ponnahdusikkunan.
 * 
 * @param {L.Map} map - Leaflet-kartta, johon merkitsijä lisätään.
 * @param {Array<number>} coordinates - Merkitsimen sijainti [latitude, longitude].
 * @param {L.Icon} icon - Ikoni, jota käytetään merkitsimessä.
 * @param {string} popupText - Teksti, joka näytetään ponnahdusikkunassa.
 */
const marker = L.marker([60.1614905, 24.9318391], { icon: newIcon })
    .addTo(map)
    .bindPopup('S&A Cafe')
    .openPopup();
