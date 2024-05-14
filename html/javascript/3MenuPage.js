'use strict';

/**
 * Luettelo kuvista, joita käytetään näyttöfunktioissa.
 */
const images = [
    '../css/kuvat/cakeMenu.jpg',
    '../css/kuvat/pastryMenu.jpg',
    '../css/kuvat/foodMenu.jpg',
    '../css/kuvat/pastryMenu2.jpg',
    '../css/kuvat/sweetMenu.jpg',
    '../css/kuvat/cakeMenu2.jpg',
    '../css/kuvat/drinkMenu.jpg',
    '../css/kuvat/foodMenu2.jpg',
    '../css/kuvat/sweetMenu2.jpg',
    '../css/kuvat/coffeeMenu.jpg',
];

/**
 * Tämänhetkinen kuvaindeksi kuvien listassa.
 */
let currentIndex = 0;

/**
 * Näyttää kuvan annetulla indeksillä.
 *
 * @param {number} index - Kuvaindeksi, joka halutaan näyttää.
 */
function showImage(index) {
    const image = document.querySelector('.food-image');
    image.src = images[index];
}

/**
 * Näyttää edellisen kuvan listassa.
 */
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

/**
 * Näyttää seuraavan kuvan listassa.
 */
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
