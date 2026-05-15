'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW REVERSE GEOCODING API URL:
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open(`GET`, ` https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener(`load`, function () {
    //console.log(this.responseText);
    const [dataCountry] = JSON.parse(this.responseText);
    console.log(dataCountry);

    const html = `
   <article class="country">
          <img class="country__img" src="${dataCountry.flags.png}" />
          <div class="country__data">
            <h3 class="country__name">${dataCountry.name.common}</h3>
            <h4 class="country__region">${dataCountry.region}</h4>
            <p class="country__row"><span>👫</span>${(+dataCountry.population / 1000000).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(dataCountry.languages)[0]}</p>
            <p class="country__row"><span>💰</span>${Object.values(dataCountry.currencies)[0].name}</p>
          </div>
        </article>
  `;

    countriesContainer.insertAdjacentHTML(`beforeend`, html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData(`Serbia`);
getCountryData(`Portugal`);
getCountryData(`USA`);
