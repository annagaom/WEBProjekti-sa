'use strict';

/**
 * Gets the selected language from the "kieli" dropdown.
 * @returns {string} The selected language, defaults to 'FI' (Finnish).
 */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/**
 * Assigns language-specific texts to various error and success messages based on the selected language.
 * Initializes language-specific messages for product and category operations.
 */

let virhetuote = '';
let virhetuote2 = '';
let virhekategoria = '';
let kategorialisatty = '';
let kategoriajo = '';
let kategoriapoistettu = '';
let virhepoisto = '';
let tuote = '';
let tuote3 = '';
let tuote4 = '';
const selectedLanguage = getSelectedLanguage();
switch (selectedLanguage) {
    case 'EN':
        virhetuote = 'Error fetching product!';
        virhetuote2 = 'Error adding product!';
        virhekategoria = 'Error removing category!';
        kategorialisatty = 'Category added successfully!';
        kategoriajo = "Category already added";
        kategoriapoistettu = 'Category removed successfully!';
        virhepoisto = 'Error removing product!';
        tuote = 'Product added successfully!';
        tuote3 = 'Product update successful!';
        tuote4 = 'Product update failed!';
        break;
    case 'CN':
        virhetuote = '获取产品时出错！';
        virhetuote2 = '添加产品时出错！';
        virhekategoria = '删除类别时出错！';
        kategorialisatty = '类别已成功添加！';
        kategoriajo = "类别已添加";
        kategoriapoistettu = '类别已成功删除！';
        virhepoisto = '删除产品时出错！';
        tuote = '产品已成功添加！';
        tuote3 = '产品更新成功！';
        tuote4 = '产品更新失败！';
        break;
    case 'ET':
        virhetuote = 'Viga toote laadimisel!';
        virhetuote2 = 'Viga toote lisamisel!';
        virhekategoria = 'Viga kategooria eemaldamisel!';
        kategorialisatty = 'Kategooria lisatud edukalt!';
        kategoriajo = "Kategooria on juba lisatud";
        kategoriapoistettu = 'Kategooria eemaldatud edukalt!';
        virhepoisto = 'Viga toote eemaldamisel!';
        tuote = 'Toode lisatud edukalt!';
        tuote3 = 'Toote uuendamine õnnestus!';
        tuote4 = 'Toote uuendamine ebaõnnestus!';
        break;
    case 'SV':
        virhetuote = 'Fel vid hämtning av produkt!';
        virhetuote2 = 'Fel vid lägg till produkt!';
        virhekategoria = 'Fel vid borttagning av kategori!';
        kategorialisatty = 'Kategori tillagd framgångsrikt!';
        kategoriajo = "Kategori har redan lagts till";
        kategoriapoistettu = 'Kategori borttagen framgångsrikt!';
        virhepoisto = 'Fel vid borttagning av produkt!';
        tuote = 'Produkt tillagd framgångsrikt!';
        tuote3 = 'Produktuppdatering lyckades!';
        tuote4 = 'Produktuppdatering misslyckades!';
        break;
    case 'FI':
    default:
        virhetuote = 'Virhe tuotteen hakemisessa!';
        virhetuote2 = 'Virhe tuotteen lisäämisessä!';
        virhekategoria = 'Virhe kategorian poistamisessa!';
        kategorialisatty = 'Kategoria lisätty onnistuneesti!';
        kategoriajo = "Kategoria on jo lisätty";
        kategoriapoistettu = 'Kategoria poistettu onnistuneesti!';
        virhepoisto = 'Virhe tuotteen poistamisessa!';
        tuote = 'Tuote lisätty onnistuneesti!';
        tuote3 = 'Tuotteen päivittäminen onnistui!';
        tuote4 = 'Tuotteen päivittäminen epäonnistui!';
        break;
}

/**
 * Sets up event listeners for opening and closing a modal to add new users.
 */

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("userModal");
    const openModalButton = document.getElementById("openModal");
    const closeModalButton = document.getElementById("closeModal");
    const selectedLanguage = getSelectedLanguage();

    if (openModalButton) {
        openModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.showModal();
        });
    }

    if (closeModalButton && modal) {
        closeModalButton.addEventListener('click', function (event) {
            event.preventDefault();
            modal.close();
        });
    }

    /**
     * Sets up the form submission event for adding a new user.
     * Checks required fields and alerts if any are missing.
     * Sends a POST request to add a new user and redirects on success.
     */
    const userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const requiredFields = ["etunimi", "sukunimi", "tunnus", "salasana", "email", "puhelin"];
            const missingFields = requiredFields.filter(field => !document.getElementById(field)?.value);

            if (missingFields.length > 0) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert(`Missing fields: ${missingFields.join(", ")}`);
                        break;
                    case 'CN':
                        alert(`缺失的字段: ${missingFields.join(", ")}`);
                        break;
                    case 'ET':
                        alert(`Puuduvad väljad: ${missingFields.join(", ")}`);
                        break;
                    case 'SV':
                        alert(`Saknade fält: ${missingFields.join(", ")}`);
                        break;
                    case 'FI':
                    default:
                        alert(`Puuttuvat kentät: ${missingFields.join(", ")}`);
                        break;
                }
                return;
            }

            const data = {
                etunimi: document.getElementById('etunimi') ? document.getElementById('etunimi').value : '',
                sukunimi: document.getElementById('sukunimi') ? document.getElementById('sukunimi').value : '',
                tunnus: document.getElementById('tunnus') ? document.getElementById('tunnus').value : '',
                salasana: document.getElementById('salasana') ? document.getElementById('salasana').value : '',
                email: document.getElementById('email') ? document.getElementById('email').value : '',
                puhelin: document.getElementById('puhelin') ? parseInt(document.getElementById('puhelin').value, 10) : null,
                syntymapaiva: document.getElementById('syntymapaiva') && document.getElementById('syntymapaiva').value.trim() ? document.getElementById('syntymapaiva').value : null,
                rooli: document.getElementById("rooli") ? document.getElementById("rooli").value : "user",
                ehdot_hyvaksytty: document.getElementById('ehdot_hyvaksytty') && document.getElementById('ehdot_hyvaksytty').checked ? 1 : 0,
                allennus_ryhma: document.getElementById('alennus') ? document.getElementById('alennus').value : null,
            };

            try {
                const response = await fetch("http://localhost:3000/api/v1/asiakas", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {

                    let targetPage = '';
                    switch (selectedLanguage) {
                        case 'EN':
                            targetPage = '../../html/en/10Paakayttaja_en.html';
                            alert("User added successfully.");
                            break;
                        case 'CN':
                            targetPage = '../../html/cn/10Paakayttaja_cn.html';
                            alert("用户已成功添加。");
                            break;
                        case 'ET':
                            targetPage = '../../html/et/10Paakayttaja_et.html';
                            alert("Kasutaja on edukalt lisatud.");
                            break;
                        case 'SV':
                            targetPage = '../../html/sv/10Paakayttaja_sv.html';
                            alert("Användare har lagts till framgångsrikt.");
                            break;
                        case 'FI':
                        default:
                            targetPage = '../../html/fi/10Paakayttaja.html';
                            alert("Käyttäjä lisätty onnistuneesti.");
                            break;
                    }

                    window.location.href = targetPage;
                } else {
                    switch (selectedLanguage) {
                        case 'EN':
                            alert("Failed to add user. Please try again.");
                            break;
                        case 'CN':
                            alert("添加用户失败。请再试一次。");
                            break;
                        case 'ET':
                            alert("Kasutaja lisamine ebaõnnestus. Proovi uuesti.");
                            break;
                        case 'SV':
                            alert("Misslyckades med att lägga till användare. Försök igen.");
                            break;
                        case 'FI':
                        default:
                            alert("Käyttäjän lisääminen epäonnistui.");
                            break;
                    }
                }
            } catch (error) {
                switch (selectedLanguage) {
                    case 'EN':
                        alert("An error occurred while adding the user.");
                        break;
                    case 'CN':
                        alert("添加用户时发生错误。");
                        break;
                    case 'ET':
                        alert("Kasutaja lisamisel tekkis viga.");
                        break;
                    case 'SV':
                        alert("Ett fel uppstod när användaren lades till.");
                        break;
                    case 'FI':
                    default:
                        alert("Virhe käyttäjän lisäämisessä.");
                        break;
                }
            }
        });
    }
});

/**
 * Decodes a Base64-encoded string.
 * @param {string} str - The Base64-encoded string to decode.
 * @returns {string} The decoded string.
 */

function base64Decode(str) {
    return atob(str.replace(/-/g, '+').replace(/_/g, '/'));
}

/**
 * Gets the user role from a JWT token.
 * @param {string} token - The JWT token.
 * @returns {string} The user role extracted from the token.
 */
function getUserRoleFromToken(token) {
    const parts = token.split('.');
    const payload = base64Decode(parts[1]);
    const payloadObject = JSON.parse(payload);
    return payloadObject.role;
}
/**
 * Checks the user role and redirects to the appropriate page based on their role.
 * If the user is not an admin, shows a custom modal and redirects to the homepage.
 */

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    const selectedLanguage = getSelectedLanguage();
    if (!token) {

        let redirectPage;
        switch (selectedLanguage) {
            case 'EN':
                redirectPage = '../en/11Login_en.html';
                break;
            case 'CN':
                redirectPage = '../cn/11login_cn.html';
                break;
            case 'ET':
                redirectPage = '../et/11Login_et.html';
                break;
            case 'SV':
                redirectPage = '../sv/11Login_sv.html';
                break;
            case 'FI':
            default:
                redirectPage = '../fi/11Login.html';
                break;
        }

        window.location.href = redirectPage;
        return;
    }

    const userRole = getUserRoleFromToken(token);

    if (userRole !== "admin") {
        /**
         * Shows a custom modal if the user is not an admin.
         * Redirects to the homepage on modal close.
         */
        function showCustomModal() {
            const modal = document.getElementById('customModal');
            const overlay = document.getElementById('backgroundOverlay');

            modal.style.display = 'block';
            overlay.style.display = 'block';

            const closeBtn = modal.querySelector('.close');
            closeBtn.addEventListener('click', function () {

                let redirectPage;
                switch (selectedLanguage) {
                    case 'EN':
                        redirectPage = '../en/1Etusivu_en.html';
                        break;
                    case 'CN':
                        redirectPage = '../cn/1Etusivu_cn.html';
                        break;
                    case 'ET':
                        redirectPage = '../et/1Etusivu_et.html';
                        break;
                    case 'SV':
                        redirectPage = '../sv/1Etusivu_sv.html';
                        break;
                    case 'FI':
                    default:
                        redirectPage = '../fi/1Etusivu.html';
                        break;
                }

                window.location.href = redirectPage;
            });
        }
        showCustomModal();
    }
});

/**
 * Fetches feedback based on selected start and end dates.
 * Displays feedback in a table on the page.
 */

window.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById("haePalaute");

    if (button) {
        button.addEventListener("click", async () => {

            const startDateElement = document.getElementById("aloituspvm");
            const endDateElement = document.getElementById("lopetuspvm");

            const startDate = startDateElement.value;
            const endDate = endDateElement.value;

            try {
                const response = await fetch(`http://localhost:3000/api/v1/palaute/${startDate}/${endDate}`, {
                    method: "GET",
                });

                if (response.ok) {
                    const palaute = await response.json();
                    const palauteTbody = document.getElementById("palaute");

                    palauteTbody.innerHTML = "";

                    palaute.forEach((p) => {
                        const row = document.createElement("tr");
                        row.innerHTML = `<td>${p.nimi}:</td><td>"${p.teksti}"</td>`;
                        palauteTbody.appendChild(row);
                    });

                }
            } catch (error) {
            }
        });
    }
});


/**
 * Fetches and updates the subtype options for a specific type of product.
 */
const handleNewValue = async () => {
    const alatyyppi = getSelectedAlaTyyppi();
    await updateSubtypes(alatyyppi);
};
/**
 * Gets the selected subtype from a dropdown and returns it.
 * @returns {string} The selected subtype.
 */

const updateSelectedAlatyyppi = () => {
    const selectedAlatyyppi = document.getElementById('cakeType').value;
    cakeList.innerHTML = '';
    return selectedAlatyyppi;
}

/**
 * Initializes event listeners to fetch and display products when the subtype is changed.
 */
document.addEventListener('DOMContentLoaded', () => {
    const cakeType = document.getElementById('cakeType');
    if (cakeType) {
        cakeType.addEventListener('change', async () => {
            await fetchAndDisplayTuotteet();
        });
    }
});

const getSelectedAlaTyyppi = async () => {
    const selectedAlatyyppi = await updateSelectedAlatyyppi('cakeType').value;
    return selectedAlatyyppi;
};
/**
 * Fetches a list of type IDs based on the selected subtype.
 * @returns {Promise<Array<number>>} A list of type IDs or an empty array on error.
 */

const getTyyppiIdLista = async () => {
    try {
        const selectedAlatyyppi = await updateSelectedAlatyyppi();

        let url;
        if (selectedAlatyyppi === 'kakut') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakut';
        } else if (selectedAlatyyppi === 'suolaista') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/suolaista';
        } else if (selectedAlatyyppi === 'makeaa') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/makeaa';
        } else if (selectedAlatyyppi === 'lammintaruokaa') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/lammintaruokaa';
        } else if (selectedAlatyyppi === 'juotavaa') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/juotavaa';

        } else if (selectedAlatyyppi === 'cakes') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/cakes';
        } else if (selectedAlatyyppi === 'savory') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/savory';
        } else if (selectedAlatyyppi === 'sweet') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/sweet';
        } else if (selectedAlatyyppi === 'hotmeals') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/hotmeals';
        } else if (selectedAlatyyppi === 'drinks') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/drinks';

        } else if (selectedAlatyyppi === 'tårtor') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/tårtor';
        } else if (selectedAlatyyppi === 'saltet') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/saltet';
        } else if (selectedAlatyyppi === 'sött') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/sött';
        } else if (selectedAlatyyppi === 'varmarätter') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/varmarätter';
        } else if (selectedAlatyyppi === 'drycker') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/drycker';

        } else if (selectedAlatyyppi === 'koogid') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/koogid';
        } else if (selectedAlatyyppi === 'soolane') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/soolane';
        } else if (selectedAlatyyppi === 'magus') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/magus';
        } else if (selectedAlatyyppi === 'kuumtoit') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kuumtoit';
        } else if (selectedAlatyyppi === 'joogid') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/joogid';

        } else if (selectedAlatyyppi === 'kakutcn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/kakutcn';
        } else if (selectedAlatyyppi === 'suolaistacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/suolaistacn';
        } else if (selectedAlatyyppi === 'makeaacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/makeaacn';
        } else if (selectedAlatyyppi === 'lammintaruokaacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/lammintaruokaacn';
        } else if (selectedAlatyyppi === 'juotavaacn') {
            url = 'http://localhost:3000/api/v1/tyyppi/paatyyppi/juotavaacn';
        }

        const response = await fetch(url, {
            method: 'GET',
        });

        const tyyppiList = await response.json();

        if (Array.isArray(tyyppiList)) {
            const tyyppiIdList = tyyppiList.map((tyyppi) => tyyppi.tyyppi_id);
            return tyyppiIdList;

        } else if (tyyppiList.tyyppi_id) {
            return tyyppiList.tyyppi_id;
        }
    } catch (error) {
        return [];
    }
};

/**
 * Fetches products based on a list of type IDs and displays them.
 */
const fetchAndDisplayTuotteet = async () => {
    const IdResult = await getTyyppiIdLista();

    if (!Array.isArray(IdResult)) {
        const tyyppiId = IdResult;

        await fetchAndDisplayByTyyppiId(tyyppiId);
    } else {
        for (const tyyppiId of IdResult) {
            await fetchAndDisplayByTyyppiId(tyyppiId);
        }
    }
}

/**
 * Fetches and displays products based on the given type ID.
 * @param {number} tyyppiId - The type ID to fetch products for.
 */
const fetchAndDisplayByTyyppiId = async (tyyppiId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/tuote/tyyppi_id/${tyyppiId}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(virhetuote);
        }

        const tuotteet = await response.json();

        if (Array.isArray(tuotteet)) {
            tuotteet.forEach((tuote) => {
                displaySingleTuote(tuote);
            });
        } else {
            displaySingleTuote(tuotteet);
        }
    } catch (error) {
    }
};

/**
 * Displays a single product in the product list.
 * @param {Object} tuote - The product to display.
 */
const displaySingleTuote = async (tuote) => {
    const selectedLanguage = getSelectedLanguage();
    let hintaTeksti = '';
    let maaraTeksti = '';
    let button = '';
    let button2 = '';
    switch (selectedLanguage) {
        case 'EN':
            hintaTeksti = 'Price: ';
            maaraTeksti = 'Amount: ';
            button = 'Edit';
            button2 = 'Add special diets';
            break;
        case 'CN':
            hintaTeksti = '价格: ';
            maaraTeksti = '数量: ';
            button = '编辑';
            button2 = '添加特殊饮食';
            break;
        case 'ET':
            hintaTeksti = 'Hind: ';
            maaraTeksti = 'Kogus: ';
            button = 'Muuda';
            button2 = 'Lisa eridieete';
            break;
        case 'SV':
            hintaTeksti = 'Pris: ';
            maaraTeksti = 'Mängd: ';
            button = 'Redigera';
            button2 = 'Lägg till specialkost';
            break;
        case 'FI':
        default:
            hintaTeksti = 'Hinta: ';
            maaraTeksti = 'Määrä: ';
            button = 'Muokkaa';
            button2 = 'Lisää erityisruokavalioita';
            break;
    }

    const cakeList = document.getElementById('cakeList');

    const tuoteElement = document.createElement('div');
    tuoteElement.classList.add('cake-item');

    // Lisää kuvakehys
    const imgElement = document.createElement('img');
    imgElement.src = `../../uploads/${tuote.tuote_kuva}`;
    tuoteElement.appendChild(imgElement);

    // Lisää tuotteen nimi
    const h3Element = document.createElement('h3');
    h3Element.textContent = tuote.tuote_nimi;
    tuoteElement.appendChild(h3Element);

    const pElement = document.createElement('p');
    pElement.textContent = tuote.tuote_kuvaus;
    tuoteElement.appendChild(pElement);

    const pElement2 = document.createElement('p');

    const kategoriaIdResult = await getKategoriaIdByTuoteId(tuote.tuote_id);
    const existingKategoriat = kategoriaIdResult.map((id) => parseInt(id, 10));

    if (kategoriaIdResult.length > 0) {
        const kategoriaNimet = await Promise.all(
            kategoriaIdResult.map(async (kategoria) => {
                try {
                    return await getKategoriaById(kategoria);
                } catch (error) {
                    return null;
                }
            })
        );

        const validKategoriaNimet = kategoriaNimet.filter(Boolean);
        pElement2.textContent = validKategoriaNimet.join(', ');
    } else {
        pElement2.textContent = "-";
    }

    tuoteElement.appendChild(pElement2);

    // Lisää hinta
    const pElement3 = document.createElement('p');
    const hintaElement = document.createElement('span');
    hintaElement.textContent = hintaTeksti + tuote.tuote_hinta + '€';

    pElement3.appendChild(hintaElement);
    tuoteElement.appendChild(pElement3);

    const buttonElement = document.createElement("button");
    buttonElement.textContent = button;
    buttonElement.style.backgroundColor = 'rgb(192, 160, 122)';

    tuoteElement.appendChild(buttonElement);

    buttonElement.addEventListener("click", () => openUpdateModal(tuote, buttonElement));

    const buttonElement2 = document.createElement('button');
    buttonElement2.textContent = button2;
    buttonElement2.classList.add('category-button');

    buttonElement2.addEventListener('click', () => openKategoriatModal(tuote.tuote_id, existingKategoriat, pElement2));

    tuoteElement.appendChild(buttonElement2);

    cakeList.appendChild(tuoteElement);
};

/**
 * Gets the category IDs associated with a given product.
 * @param {number} tuoteId - The product ID.
 * @returns {Promise<Array<number>>} A list of category IDs.
 */
const getKategoriaIdByTuoteId = async (tuoteId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/kategoria_tuote/tuote/${tuoteId}`);

        if (response.status === 404) {
            return [];
        }

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        if (Array.isArray(data)) {
            return data.map(item => item.kategoria_id);
        } else {
            return [data.kategoria_id];
        }
    } catch (error) {
        return [];
    }
};

const getKategoriaById = async (kategoriaId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/kategoria/${kategoriaId}`);
        if (!response.ok) {
            return '';
        }

        const data = await response.json();
        return data.kategoria_nimi;
    } catch (error) {
        return '';
    }
};

const getKategoriatuoteIdByTuoteAndKategoria = async (tuoteId, kategoriaId) => {
    try {
        const response = await fetch(
            `http://localhost:3000/api/v1/kategoria_tuote/${tuoteId}/${kategoriaId}`,
            { method: 'GET' }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};


const addKategoriaToTuote = async (tuoteId, kategoriaId) => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/kategoria_tuote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tuote_id: tuoteId,
                kategoria_id: kategoriaId,
            }),
        });

        if (!response.ok) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

const deleteKategoriaFromTuote = async (kategoriatuote_id) => {

    try {
        const response = await fetch(`http://localhost:3000/api/v1/kategoria_tuote/${kategoriatuote_id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(virhepoisto);
        }

        return true;
    } catch (error) {
        return false;
    }
};


const resetKategoriatCheckboxes = () => {
    const kategoriat = document.querySelectorAll('#tuote_kategoriat input[type="checkbox"]');
    kategoriat.forEach((checkbox) => {
        checkbox.checked = false;
    });
};

/**
 * Opens the modal for updating and deleting a category.
 * @param {Object} tuote - The category to update and delete.
 */
const openKategoriatModal = (tuoteId, existingKategoriat, updateKategoriaElement) => {
    const kategoriatModal = document.getElementById('kategoriatModal');
    kategoriatModal.showModal();

    const addKategoriat = document.getElementById('addKategoriat');
    const closeKategoriat = document.getElementById('closeKategoriat');

    closeKategoriat?.addEventListener('click', () => {
        kategoriatModal.close();
        resetKategoriatCheckboxes();
    });

    addKategoriat?.addEventListener('click', async () => {
        const kategoriat = document.querySelectorAll('#tuote_kategoriat input[type="checkbox"]');
        let newKategoriat = [];
        let errors = false;

        for (const checkbox of kategoriat) {
            if (checkbox.checked) {
                const kategoriaId = parseInt(checkbox.value, 10);

                if (existingKategoriat.includes(kategoriaId)) {
                    alert(kategoriajo);
                } else {
                    alert(kategorialisatty);
                    kategoriatModal.close();
                    resetKategoriatCheckboxes();
                    const success = await addKategoriaToTuote(tuoteId, kategoriaId);
                    if (success) {
                        newKategoriat.push(checkbox.labels[0].textContent);
                    } else {
                        errors = true;
                    }
                }
            }
        }

        if (!errors) {
            if (newKategoriat.length > 0) {
                if (updateKategoriaElement) {
                    const currentKategoriat = updateKategoriaElement.textContent.split(', ').filter(Boolean);
                    const updatedKategoriat = [...currentKategoriat, ...newKategoriat].filter(
                        (value, index, self) => self.indexOf(value) === index
                    );
                    updateKategoriaElement.textContent = updatedKategoriat.join(', ');
                }

                kategoriatModal.close();
                resetKategoriatCheckboxes();
            }
        }
    });

    deleteKategoriat?.addEventListener('click', async () => {
        const kategoriat = document.querySelectorAll('#tuote_kategoriat2 input[type="checkbox"]');
        let errors = false;

        for (const checkbox of kategoriat) {
            if (checkbox.checked) {
                const kategoriaId = parseInt(checkbox.value, 10);

                const kategoriatuoteData = await getKategoriatuoteIdByTuoteAndKategoria(tuoteId, kategoriaId);

                if (!kategoriatuoteData || !kategoriatuoteData.kategoriatuote_id) {
                    alert(virhekategoria);
                    errors = true;
                }

                const kategoriatuoteId = kategoriatuoteData.kategoriatuote_id;

                const success = await deleteKategoriaFromTuote(kategoriatuoteId);

                if (!success) {
                    errors = true;
                }
            }
        }
        if (!errors) {
            alert(kategoriapoistettu);
            kategoriatModal.close();
            resetKategoriatCheckboxes();
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const cakeSearch = document.getElementById('cakeSearch');
    if (cakeSearch) {
        cakeSearch.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }
});

const filterProducts = (searchTerm) => {
    const cakeItems = document.querySelectorAll('.cake-item');

    cakeItems.forEach((item) => {
        const productName = item.querySelector('h3').textContent.toLowerCase();
        const productDescription = item.querySelector('p').textContent.toLowerCase();

        if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
};

/* uusi tuote */

document.addEventListener('DOMContentLoaded', () => {
    const tuoteModal = document.getElementById('tuoteModal');
    const newProductButton = document.getElementById('newProductButton');
    const saveButton = document.getElementById('saveButton');
    const closeButton = document.getElementById('closeButton');

    newProductButton?.addEventListener('click', () => {
        tuoteModal?.showModal();
    });

    closeButton?.addEventListener('click', () => {
        tuoteModal?.close();
    });

    saveButton?.addEventListener('click', async () => {
        const tuoteForm = document.getElementById('tuoteForm');
        if (tuoteForm) {
            const formData = new FormData(tuoteForm);

            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            try {
                const response = await fetch('http://localhost:3000/api/v1/tuote', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    alert(virhetuote2)
                } else {
                    alert(tuote);
                    tuoteModal?.close();
                }
            } catch (error) {
            }
        }
    });
});

/**
 * Opens the modal for updating a product.
 * @param {Object} tuote - The product to update.
 */
const openUpdateModal = (tuote, buttonElement) => {
    const updateTuoteModal = document.getElementById("updateTuoteModal");
    const updateForm = document.getElementById("updateTuoteForm");

    const closeUpdateButton = document.getElementById("closeUpdateButton");
    closeUpdateButton?.addEventListener("click", () => {
        updateTuoteModal.close();
    });

    updateTuoteModal.showModal();

    const updateButton = document.getElementById("updateButton");
    updateButton?.addEventListener("click", async () => {
        const formData = new FormData(updateForm);
        const tuoteId = tuote.tuote_id;

        try {
            const response = await fetch(`http://localhost:3000/api/v1/tuote/${tuoteId}`, {
                method: "PUT",
                body: formData,
            });

            if (response.ok) {
                alert(tuote3);
                updateTuoteModal.close();
            } else {
                alert(tuote4);
            }
        } catch (error) {
        }
    });
};

