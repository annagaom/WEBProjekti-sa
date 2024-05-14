/**
 * Gets the selected language from a dropdown menu.
 * @returns {string} The selected language, defaults to 'FI' (Finnish).
 */
function getSelectedLanguage() {
  const kieli = document.getElementById('kieli');
  return kieli && kieli.value ? kieli.value : 'FI';
}

/*
* Changes the page URL based on the selected language.
* This event listener redirects to the appropriate page when the language changes.
*/
document.getElementById("kieli").addEventListener("change", function () {
  var selectedLanguage = this.value;
  if (selectedLanguage === 'FI') {
    window.location.href = '../fi/1Etusivu.html';
  } else if (selectedLanguage === 'EN') {
    window.location.href = '../en/1Etusivu_en.html';
  } else if (selectedLanguage === 'CN') {
    window.location.href = "../cn/1Etusivu_cn.html";
  }
  else if (selectedLanguage === 'ET') {
    window.location.href = "../et/1Etusivu_et.html";
  }
  else if (selectedLanguage === 'SV') {
    window.location.href = "../sv/1Etusivu_sv.html";
  }
});

/**
 * Ensures the user stays logged in by checking if an authorization token is present.
 * If the user is authenticated, redirects to the correct user page.
 * If not, redirects to the login page based on the selected language.
 */

document.addEventListener('DOMContentLoaded', function () {

  const links = document.querySelectorAll('a');
  /**
     * Endings for login page URLs.
     * @type {Array<string>}
     */
  const loginEndings = ['11Login.html', '11Login_en.html', '11Login_cn.html', '11Login_et.html', '11Login_sv.html'];

  links.forEach(link => {
    const isLoginLink = loginEndings.some(ending => link.href.endsWith(ending));

    if (isLoginLink) {
      link.addEventListener('click', function (event) {
        event.preventDefault();

        /**
         * The user's authentication token from localStorage.
         * @type {string|null}
         */
        const authToken = localStorage.getItem('authToken');

        let redirectPage;

        const selectedLanguage = getSelectedLanguage();

        if (authToken) {
          switch (selectedLanguage) {
            case 'EN':
              redirectPage = '../en/7Kayttaja_en.html';
              break;
            case 'CN':
              redirectPage = '../cn/7Kayttaja_cn.html';
              break;
            case 'ET':
              redirectPage = '../et/7Kayttaja_et.html';
              break;
            case 'SV':
              redirectPage = '../sv/7Kayttaja_sv.html';
              break;
            case 'FI':
            default:
              redirectPage = '../fi/7Kayttaja.html';
              break;
          }
        } else {
          switch (selectedLanguage) {
            case 'EN':
              redirectPage = '../en/11Login_en.html';
              break;
            case 'CN':
              redirectPage = '../cn/11Login_cn.html';
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
        }
        window.location.href = redirectPage;
      });
    }
  });

}
);

//TODO
const generateVierasUser = () => {
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  let vierasUser = '';

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    const randomChar = allowedChars[randomIndex];
    vierasUser += randomChar;
  }

  return vierasUser;
};

const addVierasUser = async () => {
  try {
    let userId = localStorage.getItem('authToken');

    if (!userId) {
      userId = generateVierasUser();
      localStorage.setItem('authToken', userId);
    }

    const response = await fetch('http:/localhost:3000/api/v1/asiakas/vieras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        etunimi: 'vierasUser',
        sukunimi: 'vieras',
        tunnus: 'vierasTunnus',
        salasana: '123',
        email: '',
        puhelin: '123',
        syntymapaiva: '1923-02-25',
        ehdot_hyvaksytty: '0',
        allennus_ryhma: '',
        userId: userId
      }),
    });

    if (!response.ok) {
      throw new Error('Virhe');
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  } catch (error) {
    return null;
  }
};

addVierasUser();

/**
 * Retrieves the user ID from a JWT token stored in localStorage.
 * @returns {number} The user ID extracted from the token.
 */
// get asiakas id from local storage
const getUserId = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    const parsedPayload = JSON.parse(payload);
    let userId = parsedPayload.asiakas_id;
    return userId;
  }
}

const userId = getUserId();

/**
 * Gets the ID of the last user in the system.
 * @returns {Promise<number>} A promise that resolves to the last user ID.
 */
const getLastUserId = async () => {
  try {
    const response = await fetch('http:/localhost:3000/api/v1/asiakas', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe viimeisen käyttäjän hakemisessa');
    }
    const data = await response.json();
    const userId = data[data.length - 1].asiakas_id;
    return userId;
  } catch (error) {
    return 0;
  }
}

/**
 * Displays the number of items in the cart and the number of favorites for the current user.
 */
const disPlayIconNumerot = async () => {
  await paivitaOstoskorinNumero();
  await paivitaSuosikkiMaara();
}

/**
 * Updates the number of items in the user's cart.
 */
const paivitaOstoskorinNumero = async () => {
  const userId = getUserId();
  const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');

  const tuotteet = await getTuotteenMaaraByUserId(userId);
  const tuotteenLkm = tuotteet.reduce((sum, tuote) => sum + tuote.tuote_maara, 0);

  ostoskoriLkmElement.textContent = tuotteenLkm.toString();
};

/**
 * Updates the number of favorites for the user.
 */
const paivitaSuosikkiMaara = async () => {
  await getSuosikinMaaraByUserId(userId);
}

/**
 * Gets the number of favorite items for the user.
 * @param {number} userId - The ID of the current user.
 * @returns {Promise<number>} The number of favorite items.
 */
const getSuosikinMaaraByUserId = async (userId) => {
  try {
    const response = await fetch(`http:/localhost:3000/api/v1/suosikit/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Virhe suosikkien hakemisessa');
    }

    if (response.status === 404) {
      const suosikit = 0;
      const suosikkiLkmElement = document.getElementById('suosikki-lkm');
      suosikkiLkmElement.textContent = suosikit.toString();
      return 0;
    }

    const suosikit = await response.json();

    const suosikkiLkmElement = document.getElementById('suosikki-lkm');
    suosikkiLkmElement.textContent = suosikit.length.toString();

    return suosikit.length;

  } catch (error) {
    return 0;
  }
}

/**
 * Gets the list of items in the user's cart.
 * @param {number} userId - The ID of the current user.
 * @returns {Promise<Array<Object>>} A list of items in the user's cart.
 */
const getTuotteenMaaraByUserId = async (userId) => {

  try {
    const response = await fetch(`http:/localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      if (response.status === 404) {
        const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
        ostoskoriLkmElement.textContent = '0';
        return [];
      }
      throw new Error('Virhe ostoskorin hakemisessa');
    }

    const tuotteet = await response.json();
    const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
    ostoskoriLkmElement.textContent = tuotteet.length.toString();
    return tuotteet;
  } catch (error) {
    return 0;
  }
}

/**
 * Removes all items from the user's cart.
 * @param {number} userId - The ID of the current user.
 */
const removeOstoskoristaById = async (userId) => {
  try {
    const response = await fetch(`http:/localhost:3000/api/v1/ostoskori/${UserId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin poistamisessa');
    }

  } catch (error) {
  }
}

/**
 * Redirects to a confirmation page and clears the user's cart.
 * This function is typically called after a successful transaction.
 */
const tyhjennaOstoskori = async (userId) => {
  try {
    const response = await fetch(`http:/localhost:3000/api/v1/ostoskori/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Virhe ostoskorin tyhjentämisessä');
    }

    const ostoskoriLkmElement = document.getElementById('ostoskori-lkm');
    ostoskoriLkmElement.textContent = '0';

    return true;
  } catch (error) {
    return false;
  }
};

const vahvistaJaTyhjenna = async () => {
  const userId = getUserId();
  await tyhjennaOstoskori(userId);
  const kieli = getSelectedLanguage();
  let targetPage = '';
  switch (kieli) {
    case 'EN':
      targetPage = '../en/9Vahvistus_en.html';
      break;
    case 'CN':
      targetPage = '../cn/9Vahvistus_cn.html';
      break;
    case 'ET':
      targetPage = '../et/9Vahvistus_et.html';
      break;
    case 'SV':
      targetPage = '../sv/9Vahvistus_sv.html';
      break;
    case 'FI':
    default:
      targetPage = '../fi/9Vahvistus.html';
      break;
  }
  // Redirect to the confirmation page
  window.location.href = targetPage;
};

// Display cart item and favorite counts upon initialization
disPlayIconNumerot();
