let moreDetails = document.getElementById("cardsImpresasJs");
let eventos;
let id;
fetch("https://mh-amazing.herokuapp.com/amazing")
.then (id = location.search.slice(8))
  .then(data => data.json())
  .then(data => {
    dates = data.currentDate;
    eventos = data.events;
    imprimirId(id, moreDetails, eventos)})
  .catch( error => console.log(error));

function asistenciaImpresa(i, container) {
  container.innerHTML += 
  `
  <div class=" row ">
    <div class="col-md-6 p-5  ">
    <img src="${i.image}" class="img-fluid rounded-end w-100% mx-5" alt="{$i.name}">
  </div>
  <div class="col-md-4">
  <div class="card-body ">
    <h5 class="card-title d-flex align-content-center justify-content-center border border-dark rounded-pill">${i.name}</h5>
    <p class="card-text d-flex align-content-center justify-content-center ">Date: ${i.date}</p>
    <p class="card-text d-flex align-content-center justify-content-center">Category: ${i.category}</p>
    <p class="card text border-0 d-flex align-content-center justify-content-center">Place:${i.place}</p>
    <p class="card-text d-flex align-content-center justify-content-center">Capacity:${i.capacity}</p>
    <p class="card-text d-flex align-content-center justify-content-center">Assistance:${i.assistance}</p>
    <p class="card-text d-flex align-content-center justify-content-center">Price:>U$D${i.price}</p>     
  </div>
  </div>
  `
  ;}

function estimadoImpreso(i, container) {
      container.innerHTML +=
      `
  <div class=" row ">
  <div class="col-md-6 p-5  ">
    <img src="${i.image}" class="img-fluid rounded-end w-100% mx-5" alt="i.name"></div>
  <div class="col-md-4">
    <div class="card-body ">
  <h5 class="card-title d-flex align-content-center justify-content-center border border-dark rounded-pill">${i.name}</h5>
      <p class="card-text">Date: ${i.date}</p>
      <p class="card-text">Description:${i.description} </p>
      <P class="card-text">Category:${i.category}</P>
      <p class="card text border-0">Place: ${i.place} </p>
      <p class="card-text">Capacity:${i.capacity}</p>
      <p class="card-text">Estimate:${i.estimate}</p>
      <p class="card-text">Price:>U$D${i.price}</p>     
      </div>
      </div>
      `;}

      function imprimirId(id, contenedor, array){
        array.filter( evento => {
        if(evento.id==id && evento.assistance){
          asistenciaImpresa(evento, contenedor)
        } 
      
        if(evento.id==id && evento.estimate){
          estimadoImpreso(evento,contenedor)
        } 
      })}  
    