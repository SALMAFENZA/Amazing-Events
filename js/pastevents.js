let $busqueda = document.getElementById(`searchJs`);
let $checkbox = document.getElementById(`checkboxJs`);
let $tarjetas = document.getElementById(`containerImagesJs`);

let fechas
let past
let events;
fetch("https:amazing-events.herokuapp.com/api/events")
  .then((data) => data.json())
  .then((res) => {
    events = res.events;
    fechas = data.currentDate;
    past = events.filter((events) => events.date < fechas)
    crearCheckbox(events, $checkbox);
    imprimirCards(events, $tarjetas);
    $busqueda.addEventListener("keyup", filtrarCats);
    $checkbox.addEventListener("change", filtrarCats);
  })
  .catch((error) => console.log(error));

function crearCheckbox(events, contenedor) {
  let fn = (e) => e.category;
  let categorias = new Set(events.filter(fn).map(fn));
  //console.log(categorias)
  categorias.forEach((category) => {
    contenedor.innerHTML += `
<input class="form-check-input" value="${category}" type="checkbox" role="switch" id="${category}">
    <label class="form-check-label" for="${category}" >${category} </label>
</input>
`;
  });
}

function crearCard(events, contenedor) {
  let div = document.createElement("DIV");
  contenedor.innerHTML += `
  <div class="card d-flex align-self-center justify-content-center border border-dark rounded-end" style="width:18em; height:25em;">
  <img src="${events.image}"class="card-img-top img-fluid" style="height:150px;" alt="${events.name}">
  <div class="card-body">
  <p class="card-text d-flex align-self-center justify-content-center">${events.category}</p>
      <h5 class="card-title d-flex align-self-center justify-content-center"> ${events.name}</h5>
      <p class="p-1 border border-dark rounded-pill d-flex align-self-center justify-content-center fs-6"> ${events.date}</p>
      <p class="card-text d-flex align-self-center justify-content-center">${events.description}</p>
    </div>
    <div class="card-body d-flex justify-content-between ">
      <P class="p-3 border border-dark rounded-pill d-flex align-self-center justify-content-center"> ${events.price}</P>
      <a href="./moredetails.html" class="p-2 card-link border border-dark rounded-pill d-flex align-self-center 
      justify-content-center">View more</a>
    </div>
  </div>
  `;
  return div;
}

function imprimirCards(events, contenedor) {
  contenedor.innerHTML = "";
  if (events.length > 0) {
    let fragment = document.createDocumentFragment();
    events.forEach((events) =>
      fragment.appendChild(crearCard(events, $tarjetas))
    );
    contenedor.appendChild(fragment);
  } else {
    contenedor.innerHTML =
      '<h2 class=" d-flex align-self-end justify-content-center border border-dark rounded-end me-3"> No hay categorias que coincidan con su busqueda, intente nuevamente </h2>';
  }
}

function filtrarCats() {
  let checked = [
    ...document.querySelectorAll('input[type="checkbox"]:checked'),
  ].map((ele) => ele.value);
  let filtradosPorCats = events.filter(
    (events) => checked.includes(events.category) || checked.lenght === 0
  );
  let filtradosPorSearch = filtradosPorCats.filter((events) =>
    events.name.toLowerCase().includes($busqueda.value.toLowerCase())
  );
  imprimirCards(filtradosPorSearch, $tarjetas);
}
