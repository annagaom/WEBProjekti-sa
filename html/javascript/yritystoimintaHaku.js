/**
 * Error message in different languages based on the selected language.
 * @type {string}
 */
let raporttivirhe = '';
switch (selectedLanguage) {
  case 'EN':
    raporttivirhe = 'Error fetching report';
    break;
  case 'CN':
    raporttivirhe = '报告检索错误';
    break;
  case 'ET':
    raporttivirhe = 'Viga aruande hankimisel';
    break;
  case 'SV':
    raporttivirhe = 'Fel vid hämtning av rapport';
    break;
  case 'FI':
  default:
    raporttivirhe = 'Virhe raportin hakemisessa';
    break;
}

/**
 * Event listener for when the DOM content is fully loaded.
 * Sets up an event handler for a button to fetch reports when clicked.
 */
window.addEventListener('DOMContentLoaded', () => {
  /**
   * Retrieves the button with the ID "haeRaport".
   * @type {HTMLElement}
   */
  const button = document.getElementById("haeRaport");

  if (button) {
    /**
    * Event listener for the "click" event on the "haeRaport" button.
    * Initiates fetching of reports and displays them.
    */
    button.addEventListener("click", async () => {
      /**
       * Retrieves the start and end date from respective input fields.
       */
      const startDateElement = document.getElementById("aloituspvm1");
      const endDateElement = document.getElementById("lopetuspvm1");

      const startDate = startDateElement.value;
      const endDate = endDateElement.value;

      /**
         * Fetches reports from the server based on start and end dates.
         * @returns {Promise<Response>} The HTTP response from the server.
         */

      try {
        const response = await fetch(`http://localhost:3000/api/v1/yritystoiminta/${startDate}/${endDate}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(raporttivirhe);
        }

        const raports = await response.json();

        /**
         * Gets the element to display the list of reports.
         * @type {HTMLElement}
         */
        const raportList = document.getElementById('raportList');

        // Clear the list before adding new reports
        raportList.innerHTML = "";
        await displayRaportit2(); // Display the table headers

        if (Array.isArray(raports)) {
          // Display each report in the list
          raports.forEach(async (r) => {
            await displayRaportit(r);
          });
        } else {
          await displayRaportit(raports);
        }

      } catch (error) {
        // Handle error in fetching reports
      };
    });

    /**
     * Displays a report in the table.
     * @param {Object} raport - The report to display.
     * @returns {Promise<void>} Resolves when the report is displayed.
     */
    const displayRaportit = async (raport) => {
      const tilaus_pvm = raport.tapahtu_pvm;
      const date = new Date(tilaus_pvm);
      const pvmIlmanAikaa = date.toISOString().split('T')[0]

      try {
        const raportList = document.getElementById('raportList');

        const tuoteElement = document.createElement('tr');
        tuoteElement.classList.add('raport-item');


        const pElement2 = document.createElement('td');
        pElement2.textContent = raport.tilaus_id;
        tuoteElement.appendChild(pElement2);

        const pElement3 = document.createElement('td');
        pElement3.textContent = raport.myynti_hinta + '€' + "  ";
        tuoteElement.appendChild(pElement3);

        const pElement4 = document.createElement('td');
        pElement4.textContent = raport.kustannus + '€';
        tuoteElement.appendChild(pElement4);

        const pElement5 = document.createElement('td');
        pElement5.textContent = raport.voitto + '€';
        tuoteElement.appendChild(pElement5);
        raportList.appendChild(tuoteElement);

        const pElement1 = document.createElement('td');
        pElement1.textContent = pvmIlmanAikaa;
        pElement1.style.minWidth = '100px';
        tuoteElement.appendChild(pElement1);
        raportList.appendChild(tuoteElement);

      } catch (error) {
        // Handle error when displaying the report
      }
      return;
    };
  }

  /**
     * Displays table headers for the report list in different languages.
     * @returns {Promise<void>} Resolves when the headers are displayed.
     */
  const displayRaportit2 = async (th) => {
    try {
      let tilausPvmTeksti = '';
      let tilausIdTeksti = '';
      let myynttiHintaTeksti = '';
      let kustannusTeksti = '';
      let voittoTeksti = '';

      switch (selectedLanguage) {
        case 'EN':
          tilausPvmTeksti = 'Order date';
          tilausIdTeksti = 'Order number';
          myynttiHintaTeksti = 'Sales price';
          kustannusTeksti = 'Cost';
          voittoTeksti = 'Profit';
          break;
        case 'CN':
          tilausPvmTeksti = '订单日期';
          tilausIdTeksti = '订单号';
          myynttiHintaTeksti = '销售价格';
          kustannusTeksti = '成本';
          voittoTeksti = '利润';
          break;
        case 'SE':
          tilausPvmTeksti = 'Orderdatum';
          tilausIdTeksti = 'Ordernummer';
          myynttiHintaTeksti = 'Försäljningspris';
          kustannusTeksti = 'Kostnad';
          voittoTeksti = 'Vinst';
          break;
        case 'FI':
        default:
          tilausPvmTeksti = 'Tilauspäivä';
          tilausIdTeksti = 'Tilausnumero';
          myynttiHintaTeksti = 'Myyntihinta';
          kustannusTeksti = 'Kustannus';
          voittoTeksti = 'Voitto';

          break;
      }

      const raportList = document.getElementById('raportList');

      const tuoteElement = document.createElement('tr');
      tuoteElement.classList.add('raport-item');

      const thElement1 = document.createElement('th');
      thElement1.textContent = tilausPvmTeksti;
      tuoteElement.appendChild(thElement1);

      const thElement2 = document.createElement('th');
      thElement2.textContent = tilausIdTeksti;
      tuoteElement.appendChild(thElement2);

      const thElement3 = document.createElement('th');
      thElement3.textContent = myynttiHintaTeksti;
      tuoteElement.appendChild(thElement3);

      const thElement4 = document.createElement('th');
      thElement4.textContent = kustannusTeksti;
      tuoteElement.appendChild(thElement4);

      const thElement5 = document.createElement('th');
      thElement5.textContent = voittoTeksti;
      tuoteElement.appendChild(thElement5);


      raportList.appendChild(tuoteElement);
    } catch (error) {
      // Handle error while setting up headers
    }
  }
});
