const loadEvent = () => {

const addElement = function (tag, inner, index) {
    return `<${tag} class = ${index}>${inner}</${tag}>`;
  };

let dropdown = document.querySelector("#all");

let fragment = document.createDocumentFragment();


countries.forEach(country => {
    let options = document.createElement('option');
    // options.insertAdjacentHTML("beforeend", addElement(`${"option"}, ${country.name.common}, ${"selections"}`));
    options.textContent = country.name.common;
    fragment.appendChild(options);
});
dropdown.appendChild(fragment);

console.log(dropdown);


};

window.addEventListener("load", loadEvent);