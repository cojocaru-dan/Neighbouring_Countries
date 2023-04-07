// Function to create html elements
const addElement = (tag, inner, id) => {
  return `<${tag} id=${id}> ${inner} </${tag}>`;
}

// Function to populate the dropdown list with the countries in the data.js
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

// Create fragment and div where the countries are displayed in the main section 
const displayMainSection = (country, oddElement) => {
  // Create elements for the countries: flag image, common name, region, subregion, capital
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

  // If a country is selected remove it to show the next one
  if (document.querySelector(`#country`).hasChildNodes()) {
    const elementsToDelete = document.querySelectorAll("main > img, h1, h2, h3, h4");
    elementsToDelete.forEach((elem) => {
        elem.remove();
    })
  };
  // Show the selected country in the main section 
  document.querySelector(`#country`).appendChild(fragment);

  // Show the largest population and area buttons when a country is selected
  document.querySelector(`#population`).removeAttribute("hidden");
  document.querySelector(`#area`).removeAttribute("hidden");

  // If country has a neighbour, selected country becomes that neighbour and displays it  
  selectedCountry = country;

  // Call the visisted countries function to populate the vistsed array
  visitedCountries(selectedCountry, oddElement);
  // Call the country from visited array function to get the index number of the country in the visited Array variable
  countryFromVisitedArray();
};

let selectedCountry = countries[0];

// Get the neighbour with the largest population
const largestPopulation = () =>{
  let largestPopulationCountry; 
  // Iterate through the borders key of selected country
  for (const border of selectedCountry.borders) {
    // Search and return the country object if it is a neighbour
    const neightbourCountry = countries.find((elem) => {
      return elem.cca3 === border;
    });

    if(!largestPopulationCountry){
      largestPopulationCountry = neightbourCountry;

    }else if(neightbourCountry.population > largestPopulationCountry.population){
      largestPopulationCountry = neightbourCountry;
    }
  }
  console.log("largestPop",largestPopulationCountry);
  return largestPopulationCountry;
}


const largestArea = () => {
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


let visitedArray = [];
let index = -1;

// Check the countries that have been selected and store them in an array
const visitedCountries = (elem, boolean) => {

  // Add the countries to the selected array only if selected or largest. Prev and next do not add new entries
  if(boolean){
    visitedArray.push(elem);
    index++;
  };

  // If selected array has at least 2 elements show the prev button
  if (index >= 1){
    document.querySelector(`#prev`).removeAttribute("hidden");
    document.querySelector("#prev").disabled = false;
  } else if (index === 0){
    document.querySelector("#prev").disabled = true;
  }

    // If index reached the last element deactivate the next button
  if (index < visitedArray.length - 1){
    document.querySelector(`#next`).removeAttribute("hidden");
    document.querySelector("#next").disabled = false;
  } else if (index === visitedArray.length - 1){
    document.querySelector("#next").disabled = true;
  }

  console.log("Index", index);
 
 return visitedArray;
};

// Get the index of the element in visited array 
const countryFromVisitedArray = () => {
  return visitedArray[index];
};

// Create the previous and next buttons
const showNextCountry = () => {

  let navigation = document.querySelector("#toolbar");
  // set to hidden by default 
  navigation.insertAdjacentHTML("beforeend", addElement("button", "Previous country", "prev"));
  navigation.insertAdjacentHTML("beforeend", addElement("button", "Next country", "next"));
  document.querySelector("#prev").setAttribute("hidden", "true");
  document.querySelector("#next").setAttribute("hidden", "true");
};


const loadEvent = () => {
  populateSelection();
  showNextCountry();

  const dropdown = document.querySelector(`#all`);
  dropdown.addEventListener("change", (event) => {
    selectedCountry = countries.find(
      (country) => country.name.common === event.target.value
    );
    displayMainSection(selectedCountry, true);
  });

  const largestPopButton = document.querySelector(`#population`);
  largestPopButton.addEventListener("click", (event) => {
    displayMainSection(largestPopulation(), true);
  })

  const largestAreaButton = document.querySelector(`#area`);
  largestAreaButton.addEventListener("click", (event) => {
    displayMainSection(largestArea(), true);
  });

  const prevButton = document.querySelector(`#prev`);
  prevButton.addEventListener("click", (event) => {
    if(index > 0){
      index--;
    }

    displayMainSection(countryFromVisitedArray(), false); 
  });

  const nextButton = document.querySelector(`#next`);
  nextButton.addEventListener("click", (event) => {

    if(index < visitedArray.length){
      index++;
    };

    displayMainSection(countryFromVisitedArray(), false); 
  });
};




// Previous and next buttons


//2nd Task
//Add eventlistener to the selec html element (onchange event => rule function wich returns the correct contry object. (data.find(elemen) => element.name.common === event.target.value)))
//List the properties of the country described by the task

window.addEventListener("load", loadEvent);