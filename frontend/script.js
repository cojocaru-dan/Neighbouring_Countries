const populateSelection = () => {
  const dropDown = document.querySelector(`#all`);

  let fragment = document.createDocumentFragment();
  countries.forEach((country) => {
    let option = document.createElement(`option`);
    option.textContent = country.name.common;
    fragment.appendChild(option);
  });
  dropDown.appendChild(fragment);
};

const testFunction = () => {
  let fragment = document.createDocumentFragment();
  let imageElement = document.createElement(`img`);
  imageElement.src = selectedCountry.flags.png;
  let commonName = document.createElement(`h1`);
  commonName.textContent = selectedCountry.name.common;
  let regionElement = document.createElement(`h2`);
  regionElement.textContent = selectedCountry.region;
  let subregionElement = document.createElement(`h3`);
  subregionElement.textContent = selectedCountry.subregion;
  let capitalElement = document.createElement(`h4`);
  capitalElement.textContent = selectedCountry.capital;
  fragment.appendChild(imageElement);
  fragment.appendChild(commonName);
  fragment.appendChild(regionElement);
  fragment.appendChild(subregionElement);
  fragment.appendChild(capitalElement);
  if (document.querySelector(`#country`).firstChild) {
    //delete all the elements
    //push fragment
  } else {
    //just push fragment
    document.querySelector(`#country`).appendChild(fragment);
  }
};

let selectedCountry = countries[0];

const loadEvent = () => {
  populateSelection();

  const dropDown = document.querySelector(`#all`);
  dropDown.addEventListener("change", (event) => {
    selectedCountry = countries.find(
      (country) => country.name.common === event.target.value
    );
    testFunction();
  });
};

//2nd Task
//Add eventlistener to the selec html element (onchange event => rule function wich returns the correct contry object. (data.find(elemen) => element.name.common === event.target.value)))
//List the properties of the country described by the task

window.addEventListener("load", loadEvent);
