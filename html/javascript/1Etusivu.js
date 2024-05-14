'use strict';

/**
 * Hakee valitun kielen dropdownista.
 *
 * @returns {string} Valittu kieli. Oletus on 'FI'.
 */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/**
 * Dokumentti on ladattu.
 * Asettaa tapahtumakuuntelijat dropdown-menulle ja palaute-dialogille.
 */
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const menuDropdown = document.getElementById("menuDropdown");

    /**
     * Dropdown-menun käsittelijä.
     * Näyttää tai piilottaa valikon, kun käyttäjä napsauttaa menuButtonia.
     */
    menuButton.addEventListener("click", function () {
        if (menuDropdown.style.display === "block") {
            menuDropdown.style.display = "none";
        } else {
            menuDropdown.style.display = "block";
        }
    });

    const feedbackLink = document.getElementById("openModal");
    const modal = document.getElementById("feedbackModal");
    const closeButton = document.getElementById("closeModal");

    /**
     * Avaa palautemodalin, kun käyttäjä napsauttaa linkkiä.
     */
    feedbackLink.addEventListener('click', function (event) {
        event.preventDefault();
        modal.showModal();
    });

    /**
     * Sulkee palautemodalin.
     */
    closeButton.addEventListener('click', function () {
        modal.close();
    });

    const feedbackForm = document.getElementById("feedbackForm");

    /**
     * Lähettää palautetta backendille.
     *
     * @param {Event} e - Lomakkeen lähetyksen tapahtuma.
     */
    feedbackForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(feedbackForm);
        const selectedLanguage = getSelectedLanguage();

        const feedbackData = {
            nimi: formData.get("name"),
            email: formData.get("email"),
            title: formData.get("feedbackType"),
            teksti: formData.get("message"),
            pvm: new Date().toISOString().split("T")[0],
        };

        try {
            const response = await fetch("http:/localhost:3000/api/v1/palaute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(feedbackData),
            });

            if (response.ok) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert("Thank you for your feedback!");
                        break;
                    case 'CN':
                        alert("感谢您的反馈！");
                        break;
                    case 'ET':
                        alert("Täname teie tagasiside eest!");
                        break;
                    case 'SV':
                        alert("Tack för din feedback!");
                        break;
                    case 'FI':
                    default:
                        alert("Kiitos palautteestasi!");
                        break;
                }
                modal.close();
            } else {
                handleError(selectedLanguage);
            }
        } catch (error) {
            handleError(selectedLanguage);
        }
    });

    /**
     * Käsittelee virheitä palautteen lähetyksessä.
     *
     * @param {string} language - Valittu kieli.
     */
    function handleError(language) {
        switch (language) {
            case 'EN':
                alert("Failed to submit feedback. Please try again.");
                break;
            case 'CN':
                alert("提交反馈失败。请再试一次。");
                break;
            case 'ET':
                alert("Tagasiside esitamine ebaõnnestus. Proovi uuesti.");
                break;
            case 'SV':
                alert("Misslyckades med att skicka feedback. Försök igen.");
                break;
            case 'FI':
            default:
                alert("Palautteen lähettäminen epäonnistui. Yritä uudelleen.");
                break;
        }
    }
});

/**
 * Kuvasarjan käsittelijät.
 */
const images = [
    '../css/kuvat/weddingCake.jpg',
    '../css/kuvat/chocolateCake.jpg',
    '../css/kuvat/weddingCake2.jpg'
];
let currentIndex = 0;

/**
 * Näyttää kuvan indeksin perusteella.
 *
 * @param {number} index - Kuvaindeksi.
 */
function showImage(index) {
    const image = document.querySelector('.imageFront');
    image.src = images[index];
}

/**
 * Näyttää edellisen kuvan.
 */
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

/**
 * Näyttää seuraavan kuvan.
 */
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}
