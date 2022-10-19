let containerSearch = document.getElementById("searchJs");
let containerImages = document.getElementById("containerImages");
let categoriasDelCheckbox = document.getElementById("checkbox");

function imprimir(containerImages, array) {
  array.forEach((evento) => {
    containerImages.innerHTML += ` 
    <div class="card d-flex align-self-center justify-content-center border border-dark rounded-end" style="width:18em; height:25em;">
    <img src="${evento.image}"class="card-img-top img-fluid" style="height:150px;" alt="${evento.name}">
    <div class="card-body">
    <p class="card-text d-flex align-self-center justify-content-center">${evento.category}</p>
        <h5 class="card-title d-flex align-self-center justify-content-center"> ${evento.name}</h5>
        <p class="card-text d-flex align-self-center justify-content-center">${evento.description}</p>
      </div>
      <div class="card-body d-flex justify-content-between ">
        <P class="p-3 border border-dark rounded-pill d-flex align-self-center justify-content-center"> ${evento.price}</P>
        <a href="./moredetails.html" class="p-2 card-link border border-dark rounded-pill d-flex align-self-center justify-content-center">View more</a>
      </div>
    </div>
    `;
  });
}

imprimir(containerImages, events);

let checks = Array.from(document.querySelectorAll(".checksito"))
checks.forEach(check => check.addEventListener("click", filterCheck))

function filterCheck(){
  let checkboxChecked = checks.filter(check => check.checked).map(checkCategory => checkCategory.value)
  if (checkboxChecked.length > 0 ){
      let filteredCheckBox = events.filter(event => checkboxChecked.includes(event.category))
      return filteredCheckBox
  }
  return events
}

imprimir(containerImages, filterCheck())

containerSearch.addEventListener("keyup", (evento) => {
  let datitaDelUsuario = evento.target.value;
  let datitacheck = filterCheck();
  let filtrado = datitacheck.filter((element) =>
    element.category.toLowerCase().includes(datitaDelUsuario.toLowerCase())
  );
  containerImages.innerHTML = "";
  imprimir(containerImages, filtrado);
});

let nombresDeCategorias = events.map((events) => events.category);
let categoriasFinales = Array.from ( new Set([...nombresDeCategorias]))

categoriasFinales.forEach(imprimirDos)


function imprimirDos(category) {
  categoriasDelCheckbox.innerHTML +=
  `  
   <div class = "form-check text-dark">
     <label class="checksito form-check-label text-dark">${category}<input type= "checkbox" class="form-check-input" value="${category}"></label>
   </div> `;
}

// let category = [];
// categoriasFinales.forEach((elemento) => imprimirDos(elemento));
// categoriasDelCheckbox.addEventListener("change", (evento) => {
//   container.innerHTML = "";
//   if (evento.target.checked) {
//     mostrarLasCategs = events.filter((element) =>
//       element.mostrarLasCategs.toLowerCase().includes(evento.target.value.toLowerCase())
//     );
//   //console.log(evento.target.value);
//     printCards(mostrarLasCategs, contenedor)}
//     if (listCheck.length === 0){
//         printCards(events,contenedor)}})

