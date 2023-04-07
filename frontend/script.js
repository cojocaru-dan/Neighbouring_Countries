const populateSelection = () => {
  //select the dropdown menu and push a placeholder text into it
  const dropdown = document.querySelector(`#all`);
  const placeholder = document.createElement("option");
  placeholder.textContent = "Select a country from the list";
  dropdown.appendChild(placeholder);
  //creating an empty fargment
  let fragment = document.createDocumentFragment();
  //looping trough the countries
  countries.forEach((country) => {
    //create an option element and append it to the fragment
    let options = document.createElement(`option`);
    options.textContent = country.name.common;
    fragment.appendChild(options);
  });
  //append the fragment containing the option elements to the dropdown menu
  dropdown.appendChild(fragment);
};

const createAndAppendFragment = (country) => {
  //create an empty fragment and the elements we have to display
  let fragment = document.createDocumentFragment();
  let imageElement = document.createElement(`img`);
  imageElement.src = country.flags.png;
  let commonName = document.createElement(`h1`);
  commonName.textContent = country.name.common;
  let regionElement = document.createElement(`h2`);
  regionElement.textContent = country.region;
  let subregionElement = document.createElement(`h3`);
  subregionElement.textContent = country.subregion;
  let capitalElement = document.createElement(`h4`);
  capitalElement.textContent = country.capital;
  //append the html elements to the fragment
  fragment.appendChild(imageElement);
  fragment.appendChild(commonName);
  fragment.appendChild(regionElement);
  fragment.appendChild(subregionElement);
  fragment.appendChild(capitalElement);
  // console.log(document.querySelector(`#country`).hasChildNodes());
  //Checking if we already have a country displayed
  //If we do, we delete all the child nodes and append the new country fragment after
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

const showCountries = () => {
  //select the dropdown menu
  const dropdown = document.querySelector(`#all`);
  //add a change event listener to the dropdown menu(if the value changes, it'll fire)
  //addEventListener has an anonymous wich sets the selectedCountry variable to the country(objec) we selected
  //After that we call the createAndAppendFragment function to display the selected country
  dropdown.addEventListener("change", (event) => {
    selectedCountry = countries.find(
      (country) => country.name.common === event.target.value
    );
    console.log(selectedCountry);
    createAndAppendFragment(selectedCountry);
  });
  
}

let selectedCountry;

//loadEvent function contains all the function we want to run after our site has loaded
const loadEvent = () => {
  populateSelection();
  showCountries();
  
};


//Adding a load eventlistener to the window wich fires once the site is fully loaded.
window.addEventListener("load", loadEvent);