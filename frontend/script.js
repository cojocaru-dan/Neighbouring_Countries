const populateSelection = () => {
  const dropdown = document.querySelector(`#all`);
  const placeholder = document.createElement("option");
  placeholder.textContent = "Select a country from the list";
  dropdown.appendChild(placeholder);
  let fragment = document.createDocumentFragment();
  countries.forEach((country) => {
    let options = document.createElement(`option`);
    options.textContent = country.name.common;
    fragment.appendChild(options);
  });
  dropdown.appendChild(fragment);
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
  console.log(document.querySelector(`#country`).hasChildNodes());
  if (document.querySelector(`#country`).hasChildNodes()) {
    const elementsToDelete = document.querySelectorAll("main > img, h1, h2, h3, h4");
    elementsToDelete.forEach((elem) => {
        elem.remove();
    })
    //delete all the elements
    //push fragment
  }
    //just push fragment
  document.querySelector(`#country`).appendChild(fragment);
};

let selectedCountry = countries[0];

const loadEvent = () => {
  populateSelection();

  const dropdown = document.querySelector(`#all`);
  dropdown.addEventListener("change", (event) => {
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
