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

const testFunction = (country) => {
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
  document.querySelector(`#population`).removeAttribute("hidden");
  document.querySelector(`#area`).removeAttribute("hidden");
    //just push fragment
  document.querySelector(`#country`).appendChild(fragment);
  selectedCountry = country;
};

let selectedCountry = countries[0];

const largestPopulation = () =>{
  let largestPopulationCountry; 
  for (const border of selectedCountry.borders) {
    const neightbourCountry = countries.find((elem) => {
      return elem.cca3 === border;
    });
    console.log("neightbour",neightbourCountry);
    console.log("largestPop",neightbourCountry.population);
    if(!largestPopulationCountry){
      largestPopulationCountry = neightbourCountry;
    }else if(neightbourCountry.population > largestPopulationCountry.population){
      largestPopulationCountry = neightbourCountry;
    }
  }
  console.log("largestPop",largestPopulationCountry);
  return largestPopulationCountry;
}

const largestArea = () =>{
  let largestAreaCountry; 
  for (const border of selectedCountry.borders) {
    const neightbourCountry = countries.find((elem) => {
      return elem.cca3 === border;
    });
    console.log("neightbour",neightbourCountry);
    console.log("largestArea",neightbourCountry.area);
    if(!largestAreaCountry){
      largestAreaCountry = neightbourCountry;
    }else if(neightbourCountry.area > largestAreaCountry.area){
      largestAreaCountry = neightbourCountry;
    }
  }
  console.log("largestArea",largestAreaCountry);
  
  return largestAreaCountry;
}

const loadEvent = () => {
  populateSelection();

  const dropdown = document.querySelector(`#all`);
  dropdown.addEventListener("change", (event) => {
    selectedCountry = countries.find(
      (country) => country.name.common === event.target.value
    );
    testFunction(selectedCountry);
  });

  const largestPopButton = document.querySelector(`#population`);
  largestPopButton.addEventListener("click", (event) => {
    testFunction(largestPopulation());
  })

  const largestAreaButton = document.querySelector(`#area`);
  largestAreaButton.addEventListener("click", (event) => {
    testFunction(largestArea());
  })

};

//2nd Task
//Add eventlistener to the selec html element (onchange event => rule function wich returns the correct contry object. (data.find(elemen) => element.name.common === event.target.value)))
//List the properties of the country described by the task

window.addEventListener("load", loadEvent);