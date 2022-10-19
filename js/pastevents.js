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
containerSearch.addEventListener("keyup", (evento) => {
  let datitaDelUsuario = evento.target.value;
  let filtrado = events.filter((element) =>
    element.category.toLowerCase().includes(datitaDelUsuario.toLowerCase())
  );
  containerImages.innerHTML = "";
  imprimir(containerImages, filtrado);
});
