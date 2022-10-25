let $busqueda = document.getElementById(`searchJs`);
let $checkbox = document.getElementById(`checkboxJs`);
let $tarjetas = document.getElementById(`containerImagesJs`);

let eventos;
let fechas;
let pasado;
fetch("https://mind-hub.up.railway.app/amazing")
  .then((data) => data.json())
  .then((data) => {
    fechas = data.date
    eventos = data.events;
    pasado = eventos.filter((event) => event.date < fechas);
    crearCheckbox(pasado, $checkbox);
    imprimirCards(pasado, $tarjetas);
    $busqueda.addEventListener("keyup", filtrarCats);
    $checkbox.addEventListener("change", filtrarCats);
  })
  .catch((error) => console.log(error));

function crearCheckbox(eventos, contenedor) {
  let fn = (e) => e.category; //esta linea proviene de un map
  let categorias = new Set(eventos.filter(fn).map(fn)); // el set devuelve un value con el orden que se le asigne
  categorias.forEach((category) => {
    contenedor.innerHTML += `<input class="form-check-input" value="${category}" type="checkbox" role="switch" id="${category}">
    <label class="form-check-label" for="${category}" >${category} </label>
  </input>
`;
  });
}

function crearCard(eventos) {
  let div = document.createElement("DIV"); 
  div.innerHTML += `
  <div class="card d-flex align-self-center justify-content-center border border-dark rounded-end" style="width:18em; height:25em;">
  <img src="${eventos.image}"class="card-img-top img-fluid" style="height:150px;" alt="${eventos.name}">
  <div class="card-body">
  <h5 class="card-title d-flex align-self-center justify-content-center"> ${eventos.name}</h5>
  <p class="card-text d-flex align-self-center justify-content-center">${eventos.description}</p>
    </div>
    <div class="card-body d-flex justify-content-between ">
      <P class="p-3 border border-dark rounded-pill d-flex align-self-center justify-content-center"> ${eventos.price}</P>
      <a href="./moredetails.html" class="p-2 card-link border border-dark rounded-pill d-flex align-self-center 
      justify-content-center">View more</a>
    </div>
  </div>
  `;
  return div;
}

function imprimirCards(eventos, contenedor) {
  contenedor.innerHTML = "";
  if (eventos.length > 0) {
    let fragment = document.createDocumentFragment(); //es algo que carga previa mente para mostrarlo en cualquier momento para reimprimir sin carga previa, trae un fragmento ya precargado, crea contenedores hijos
    eventos.forEach((eventos) => fragment.appendChild(crearCard(eventos)));
    contenedor.appendChild(fragment);
  } else {
    contenedor.innerHTML =
      "<h2> No hay categorias que coincidan con su busqueda, intente nuevamente </h2>";
  }
}
//con los tres puntos trae una copia de queryselectorall ,
function filtrarCats() {
  let checked = [...document.querySelectorAll('input[type="checkbox"]:checked')].map((ele) => ele.value);  let filtradosPorCats = pasado.filter((eventos) => checked.includes((eventos.category)) ||checked.length === 0); // i esta clickeado con el :checked me lo mapea(lo transfomra) y me trae lo vaores que coincidan y sean true, los valores que nos interesan son los values// nuestro checkbox, incluye nuestro recorrido por las categorias?
  let filtradosPorSearch = filtradosPorCats.filter((eventos) =>eventos.name.toLowerCase().includes($busqueda.value.toLowerCase()));
  imprimirCards(filtradosPorSearch, $tarjetas);}
