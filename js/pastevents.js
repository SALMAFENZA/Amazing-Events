
let container = document.getElementById('container') // traemos al contenedor de las tarjetas
function printCard(tarjetas) {    //esta funcion imprimira tarjetas

    for (let evento of events) {   // aca guardamos en -evento- cada vez que se ejecuta una vuelta, un evento
        if (evento.date < currentDate) {
            tarjetas.innerHTML += ` 
    <div class="card d-flex align-self-center justify-content-center" style="width:18em; height:25em;">
    <img src="${evento.image}"class="card-img-top img-fluid" style="height:150px;" alt="${evento.name}">
    <div class="card-body">
        <h5 class="card-title d-flex align-self-center justify-content-center"> ${evento.name}</h5>
        <p class="card-text d-flex align-self-center justify-content-center">${evento.description}</p>
      </div>
      <div class="card-body d-flex justify-content-between">
        <P> ${evento.price}</P>
        <a href="./moredetails.html" class="card-link">More details</a>
      </div>
    </div>
    `}
    }
}
printCard(container) 