let $busqueda = document.getElementById(`searchJs`);
let $checkbox = document.getElementById(`checkboxJs`);
let $tarjetas = document.getElementById(`containerImagesJs`);
let events2;
fetch("https:amazing-events.herokuapp.com/api/events")
  .then((data) => data.json())
  .then((res) => {
    events2 = res.events;
    crearCheckbox(events2, $checkbox);
    imprimirCards(events2, $tarjetas);
    $busqueda.addEventListener("keyup", filtrarCats);
    $checkbox.addEventListener("change", filtrarCats);
  })
  .catch((error) => console.log(error));

function crearCheckbox(events2, contenedor) {
  let fn = (e) => e.category; //esta linea proviene de un map
  let categorias = new Set(events2.filter(fn).map(fn)); // el set devuelve un value con el orden que se le asigne
  categorias.forEach((category) => {
    contenedor.innerHTML += `<input class="form-check-input" value="${category}" type="checkbox" role="switch" id="${category}">
    <label class="form-check-label" for="${category}" >${category} </label>
  </input>
`;
  });
}

function crearCard(events2) {
  let div = document.createElement("DIV");
  div.innerHTML += `
  <div class="card d-flex align-self-center justify-content-center border border-dark rounded-end" style="width:18em; height:25em;">
  <img src="${events2.image}"class="card-img-top img-fluid" style="height:150px;" alt="${events2.name}">
  <div class="card-body">
  <h5 class="card-title d-flex align-self-center justify-content-center"> ${events2.name}</h5>
  <p class="p-1 border border-dark rounded-pill d-flex align-self-center justify-content-center fs-6"> ${events2.date}</p>
  <p class="card-text d-flex align-self-center justify-content-center">${events2.description}</p>
    </div>
    <div class="card-body d-flex justify-content-between ">
      <P class="p-3 border border-dark rounded-pill d-flex align-self-center justify-content-center"> ${events2.price}</P>
      <a href="./moredetails.html" class="p-2 card-link border border-dark rounded-pill d-flex align-self-center 
      justify-content-center">View more</a>
    </div>
  </div>
  `;
  return div;
}

function imprimirCards(events2, contenedor) {
  contenedor.innerHTML = "";
  if (events2.length > 0) {
    let fragment = document.createDocumentFragment();
    events2.forEach((events2) => fragment.appendChild(crearCard(events2)));
    contenedor.appendChild(fragment);
  } else {
    contenedor.innerHTML =
      "<h2> No hay categorias que coincidan con su busqueda, intente nuevamente </h2>";
  }
}

function filtrarCats() {
  let checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((ele) => ele.value); // i esta clickeado con el :checked me lo mapea(lo transfomra) y me trae lo vaores que coincidan y sean true
  let filtradosPorCats = events2.filter(
    (events2) => checked.includes(events2.category)
  );
  let filtradosPorSearch = filtradosPorCats.filter((events2) =>
    events2.name.toLowerCase().includes($busqueda.value.toLowerCase())
  );
  imprimirCards(filtradosPorSearch, $tarjetas);
  if(checked.length === 0){
    imprimirCards(events2, $tarjetas)
  }
}
