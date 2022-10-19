let containerSearch = document.getElementById("searchJs");
let container = document.getElementById("container"); // traemos al contenedor de las tarjetas
let categoriasDelCheckbox = document.getElementById("checkbox");

function imprimir(container, array) {
  array.forEach((evento) => {
    // Primer paso, recorrer un array a seleccion.
    container.innerHTML += ` 
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

imprimir(container, events);
containerSearch.addEventListener("keyup", (evento) => {
  //el evento te captura el modo de objeto el elemento
  let datitaDelUsuario = evento.target.value;
  let filtrado = events.filter((element) =>
    element.name.toLowerCase().includes(datitaDelUsuario.toLowerCase())
  );
  container.innerHTML = "";
  imprimir(container, filtrado);
});

let nombresDeCategorias = events.map((events) => events.category);
let categoriasFinales = new Set(nombresDeCategorias);
let mostrarLasCategs = Array.from(categoriasFinales);

function imprimirDos(array) {
  categoriasDelCheckbox.innerHTML += `  
   <div class = "form-check text-dark">
     <label class="form-check-label text-dark">${array}<input type= "checkbox" class="form-check-input" value="${array}"></label>
   </div> `;
}
let categoria = [];
mostrarLasCategs.forEach((elemento) => imprimirDos(elemento));
categoriasDelCheckbox.addEventListener("change", (evento) => {
  container.innerHTML = "";
  if (evento.target.checked) {
    categoria = events.filter((element) =>
      element.category.toLowerCase().includes(evento.target.value.toLowerCase())
    );
    console.log(evento.target.value);
    printCards(categoria, contenedor)}
    if (listCheck.length === 0){
        printCards(events,contenedor)}})

