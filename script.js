'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW REVERSE GEOCODING API URL:
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderCountry = function (dataCountry, className) {
  const html = `
   <article class="country ${className}">
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
};
/*
const getCountryAndNeighbour = function (country) {
  //AJAX CALL FOR FIRST COUNTRY
  const request = new XMLHttpRequest();
  request.open(`GET`, ` https://restcountries.com/v3.1/name/${country}`);
  request.send();
  request.addEventListener(`load`, function () {
    //console.log(this.responseText);
    const [dataCountry] = JSON.parse(this.responseText);
    console.log(dataCountry);
    //RENDER FIRST COUNTRY
    renderCountry(dataCountry);

    //GET NEIGHBOUR COUNTRY
    const neighbour = dataCountry.borders?.[0];
    if (!neighbour) return;

    //AJAX CALL FOR NEIGHBOUR COUNTRY
    const request2 = new XMLHttpRequest();
    request2.open(`GET`, ` https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();
    request2.addEventListener(`load`, function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, `neighbour`);
    });
  });
};

//getCountryAndNeighbour(`USA`);
getCountryAndNeighbour(`Serbia`);

//Callback hell example
setTimeout(() => {
  console.log(`1 SECOND`);
  setTimeout(() => {
    console.log(`2 SECOND`);
    setTimeout(() => {
      console.log(`3 SECOND`);
      setTimeout(() => {
        console.log(`4 SECOND`);
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

//old way
/*
const request = new XMLHttpRequest();
request.open(`GET`, ` https://restcountries.com/v3.1/name/${country}`);
request.send();
*/

//modern way (Promises)
/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};
*/
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

getCountryData(`Serbia`);
