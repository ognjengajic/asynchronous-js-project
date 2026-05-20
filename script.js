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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText(`afterend`, msg);
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

/*
const getCountryData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(`Country not found! ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      renderCountry(data[0]);
      //const neighbour = data[0].borders?.[0];
      const neighbour = `gdfhjd`;

      if (!neighbour) return;

      //Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found! ${response.status}`);
      }

      response.json();
    })
    .then(data => renderCountry(data[0], `neighbour`))
    .catch(err => {
      console.error(`${err} 🤔🤔🤔`);
      renderError(`Something went wrong, ${err.message}. Try again! 🤔`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
*/
/*
const getJSON = function (url, errorMessage = `Something went wrong!`) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMessage} ${response.status}`);
    }

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    `Country not found!`,
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      //const neighbour = `gdfhjd`;

      if (!neighbour) throw new Error(`Neighbour not found!`);

      //Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        `Country not found!`,
      );
    })
    .then(data => renderCountry(data[0], `neighbour`))
    .catch(err => {
      console.error(`${err} 🤔🤔🤔`);
      renderError(`Something went wrong, ${err.message}. Try again! 🤔`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener(`click`, function () {
  getCountryData(`Serbia`);
});
*/
//getCountryData(`Australia`);

//Challange #1
/*
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
  )
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.countryName}, ${data.city}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found! ${response.status}`);
      }

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} ❌`));
};

/*
whereAmI(52.508, 13.381);
whereAmI(30.508, 12.381);
whereAmI(20.508, 20.381);
*/

//Building a Simple Promise
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log(`Lottery draw is happening`);

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve(`You win 👍`);
    } else {
      reject(new Error(`You lost your money 🤦‍♂️`));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
/*
wait(1)
  .then(() => {
    console.log(`I waited for 1 second`);
    return wait(1);
  })
  .then(() => {
    console.log(`I waited for 2 seconds`);
    return wait(1);
  })
  .then(() => {
    console.log(`I waited for 3 seconds`);
    return wait(1);
  })
  .then(() => {
    console.log(`I waited for 4 seconds`);
  });
/*
//Callback hell example
/*
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
/*
Promise.resolve(`abcde`).then(x => console.log(x));
Promise.reject(new Error(`There is a Problem!`)).catch(x => console.error(x));
*/
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
   
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      err => reject(err),
    );
    
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
*/
//console.log(`Code is not blocked`);

//getPosition().then(pos => console.log(pos));
/*
const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      );
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.countryName}, ${data.city}`);
      return fetch(`https://restcountries.com/v3.1/name/${data.countryName}`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Country not found! ${response.status}`);
      }

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} ❌`));
};

btn.addEventListener(`click`, whereAmI);
*/

//challange 2#
/*
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const imgContainer = document.querySelector(`.images`);

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement(`img`);
    img.src = imgPath;

    img.addEventListener(`load`, function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener(`error`, function () {
      reject(new Error(`Image not found`));
    });
  });
};

let currentImage;
createImage(`img/img-1.jpg`)
  .then(img => {
    currentImage = img;
    console.log(`Image 1 loaded`);
    return wait(2);
  })
  .then(() => {
    currentImage.style.display = `none`;
    return createImage(`img/img-2.jpg`);
  })
  .then(img => {
    currentImage = img;
    console.log(`Image 2 loaded`);
    return wait(2);
  })
  .then(img => {
    currentImage.style.display = `none`;
  })
  .catch(err => console.error(err));
*/

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
const whereAmI = async function () {
  //Geolocation
  const pos = await getPosition();
  const { latitude: lat, longitude: lng } = pos.coords;

  //reverse geocoding
  const resGeo = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
  );
  const dataGeo = await resGeo.json();
  console.log(dataGeo);

  //Country data
  //same as this
  //fetch(`https://restcountries.com/v3.1/name/${country}`).then(res=>console.log(res));

  const res = await fetch(
    `https://restcountries.com/v3.1/name/${dataGeo.countryName}`,
  );
  //console.log(res);

  const data = await res.json();
  console.log(data);
  renderCountry(data[0]);
};
whereAmI();
console.log(`First`);
