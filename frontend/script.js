const populateSelection = () => {
  const dropdown = document.querySelector(`#all`);

  let fragment = document.createDocumentFragment();
  countries.forEach((country) => {
    let options = document.createElement(`options`);
    options.textContent = country.name.common;
    fragment.appendChild(options);
  });
  dropdown.appendChild(fragment);
};

const loadEvent = () => {
  populateSelection();


  const dropdown = document.querySelector(`#all`);
  dropdown.addEventListener('onchange', (selection) => {console.log(selection.target.textContent)})
};


//2nd Task
//Add eventlistener to the selec html element (onchange event => rule function wich returns the correct contry object. (data.find(elemen) => element.name.common === event.target.value)))
//List the properties of the country described by the task

window.addEventListener("load", loadEvent);
