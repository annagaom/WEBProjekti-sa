'use strict';

/**
 * Gets the selected language from a dropdown.
 * @returns {string} The language code, defaulting to 'FI' if none is selected.
 */
function getSelectedLanguage() {
    const kieli = document.getElementById('kieli');
    return kieli && kieli.value ? kieli.value : 'FI';
}

/**
 * Logs the user out and redirects to the login page based on the selected language.
 */

function logOut() {
    localStorage.removeItem('authToken');

    const selectedLanguage = getSelectedLanguage();

    let logoutPage = '';
    switch (selectedLanguage) {
        case 'EN':
            logoutPage = '11Login_en.html';
            break;
        case 'CN':
            logoutPage = '11Login_cn.html';
            break;
        case 'ET':
            logoutPage = '11Login_et.html';
            break;
        case 'SV':
            logoutPage = '11Login_sv.html';
            break;
        case 'FI':
        default:
            logoutPage = '11Login.html';
            break;
    }
    window.location.href = logoutPage;
}

/**
 * Retrieves user information from a token and displays it in the HTML.
 */
document.addEventListener("DOMContentLoaded", async function () {
    const token = localStorage.getItem("authToken");
    const selectedLanguage = getSelectedLanguage();

    let userId;

    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        const parsedPayload = JSON.parse(payload);

        userId = parsedPayload.asiakas_id;

        const response = await fetch(`http://localhost:3000/api/v1/asiakas/info/${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Virhe käyttäjän tietojen hakemisessa.");
        }

        const userData = await response.json();
        const userName = userData.nimi || "";
        const userLastname = userData.sukunimi || "";
        const userUsername = userData.tunnus || "";
        const userEmail = userData.email || "";
        const userPhone = userData.puhelin || "";

        /* käännökset */

        // Translation for different languages
        const translations = {
            FI: {
                title: "Omat tiedot",
                name: "Nimi",
                lastname: "Sukunimi",
                username: "Tunnus",
                email: "Sähköposti",
                phone: "Puhelin",
                birthday: "Syntymäpäivä",
                discountGroup: "Alennusryhmä",
                foodAllergies: "Ruoka-allergiat",
                edit: "Muokkaa tietoja",
                logout: "Kirjaudu ulos",
            },
            EN: {
                title: "Personal Information",
                name: "Name",
                lastname: "Lastname",
                username: "Username",
                email: "Email",
                phone: "Phone",
                birthday: "Birthday",
                discountGroup: "Discount Group",
                foodAllergies: "Food Allergies",
                edit: "Edit Information",
                logout: "Log Out",
            },
            CN: {
                title: "个人信息",
                name: "名字",
                lastname: "姓",
                username: "用户名",
                email: "电子邮件",
                phone: "电话",
                birthday: "生日",
                discountGroup: "折扣组",
                foodAllergies: "食物过敏",
                edit: "编辑信息",
                logout: "登出",
            },
            ET: {
                title: "Isiklik teave",
                name: "Nimi",
                lastname: "Perekonnanimi",
                username: "Kasutajanimi",
                email: "E-post",
                phone: "Telefon",
                birthday: "Sünnipäev",
                discountGroup: "Soodustusgrupp",
                foodAllergies: "Toiduallergiad",
                edit: "Muuda teavet",
                logout: "Logi välja",
            },
            SV: {
                title: "Personlig information",
                name: "Namn",
                lastname: "Efternamn",
                username: "Användarnamn",
                email: "E-post",
                phone: "Telefon",
                birthday: "Födelsedag",
                discountGroup: "Rabattgrupp",
                foodAllergies: "Matallergier",
                edit: "Redigera information",
                logout: "Logga ut",
            },
        };

        // Get the discount group in the appropriate language
        const discountGroup = {
            "Opiskelija": {
                "FI": "Opiskelija",
                "EN": "Student",
                "CN": "学生",
                "ET": "Õpilane",
                "SV": "Student",
            },
            "Eläkeläinen": {
                "FI": "Eläkeläinen",
                "EN": "Retiree",
                "CN": "退休人员",
                "ET": "Pensionär",
                "SV": "Pensionär",
            },
        };

        // Get the corresponding page for editing user information based on the selected language
        const anotherPage = {
            FI: "../../html/fi/7KayttajaMuutos.html",
            EN: "../../html/en/7KayttajaMuutos_en.html",
            CN: "../../html/cn/7KayttajaMuutos_cn.html",
            ET: "../../html/et/7KayttajaMuutos_et.html",
            SV: "../../html/sv/7KayttajaMuutos_sv.html",
        };

        const t = translations[selectedLanguage];
        const editPage = anotherPage[selectedLanguage];
        const userDiscountGroup = userData.allennus_ryhma || "";
        const translatedDiscountGroup = discountGroup[userDiscountGroup]?.[selectedLanguage] || "";

        /* ruoka-allergiat */
        const allergies = getAllergiat();
        const allergiaText = allergies.join(", ");

        /* syntymäpäivä nätimmin */

        const formattedDate = userData.syntymapaiva ? new Date(userData.syntymapaiva) : null;
        const day = formattedDate ? formattedDate.getUTCDate().toString().padStart(2, '0') : '';
        const month = formattedDate ? (formattedDate.getUTCMonth() + 1).toString().padStart(2, '0') : '';
        const year = formattedDate ? formattedDate.getUTCFullYear() : '';

        const displayDate = formattedDate ? `${day}.${month}.${year}` : '';

        const omatTiedotSection = document.getElementById("omatiedot");

        omatTiedotSection.innerHTML = `
            <h1>${t.title}</h1><br>
            <p>${t.name}: ${userName}</p>
            <p>${t.lastname}: ${userLastname}</p>
            <p>${t.username}: ${userUsername}</p>
            <p>${t.email}: ${userEmail}</p>
            <p>${t.phone}: ${userPhone}</p>
            <p>${t.birthday}: ${displayDate}</p>
            <p>${t.discountGroup}: ${translatedDiscountGroup}</p>
            <label for="allergia">${t.foodAllergies}:</label><br>
            <li name="allergia" id="allergia"
            style="color: rgb(219, 146, 56); font-weight: bold; list-style: none;
            border: 1px solid black; border-radius: 5px; font-size: 14px;">
            ${allergiaText}
            </li><br>
            <button class="edit" type="button" onclick="window.location.href = '../../html/${editPage}'"><b>${t.edit}</b></button><br>
            <button class="logOut" type="button" onclick="logOut()"><b>${t.logout}</b></button>
        `;

    } catch (error) {
    }
});

/**
 * Gets the storage key for the user's allergy information based on their ID.
 * @returns {string} The storage key for the user's allergies.
 */
function getAllergiaStorageKey() {
    const token = localStorage.getItem('authToken');
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);

    const userID = parsedPayload.asiakas_id;
    return `userAllergia_${userID}`;
}

/**
 * Retrieves the list of allergies from local storage.
 * @returns {Array<string>} The list of stored allergies, or an empty array if none are found.
 */
function getAllergiat() {
    const storageKey = getAllergiaStorageKey();
    try {
        const storedAllergias = localStorage.getItem(storageKey);
        if (storedAllergias) {
            return JSON.parse(storedAllergias);
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

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
 */

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    const userRole = getUserRoleFromToken(token);
    const selectedLanguage = getSelectedLanguage();
    if (userRole === "vieras") {

        let redirectPage;
        switch (selectedLanguage) {
            case 'EN':
                redirectPage = '../../html/en/11Login_en.html';
                break;
            case 'CN':
                redirectPage = '../../html/cn/11login_cn.html';
                break;
            case 'ET':
                redirectPage = '../../html/et/11Login_et.html';
                break;
            case 'SV':
                redirectPage = '../../html/sv/11Login_sv.html';
                break;
            case 'FI':
            default:
                redirectPage = '../../html/fi/11Login.html';
                break;
        }

        window.location.href = redirectPage;
        return;
    }
});
