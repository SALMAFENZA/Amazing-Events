let $firstRow = document.getElementById(`firstRow`);
let $secondRow = document.getElementById(`secondRow`);
let $thirdRow = document.getElementById(`thirdRow`);
let eventosFuturos;
let eventosPasados;
fetch("https://mh-amazing.herokuapp.com/amazing")
  .then((data) => data.json())
  .then((data) => {
    let events2 = data.events;
    let fechaActual = data.date;
    eventosFuturos = events2.filter((objeto) => objeto.date > fechaActual);
    eventosPasados = events2.filter((objeto) => objeto.date < fechaActual);
    logicaTablaUno();
    getStats2(eventosFuturos, "estimate", $secondRow);
    getStats2(eventosPasados, "assistance", $thirdRow);
  })
  .catch((error) => console.log(error));

function tablaUno(contenedor, object1, object2, object3) {
  contenedor.innerHTML += `
      <tr>
      <td>${object1.name}</td>
      <td>${object2.name}</td>
      <td>${object3.name}</td>
      </tr>
    `;
}
function logicaTablaUno() {
  eventosPasados.map(
    (objeto) =>
      (objeto.porcentajeAsistencia =
        100 * (objeto.assistance / objeto.capacity))
  );
  let asistenciaOrdenada = [...eventosPasados].sort(
    (e1, e2) => e1.porcentajeAsistencia - e2.porcentajeAsistencia
  );
  let capacidadOrdenada = [...eventosPasados].sort(
    (e1, e2) => e1.capacity - e2.capacity
  );
  let menorAsistencia = asistenciaOrdenada[0];
  let mayorAsistencia = asistenciaOrdenada[asistenciaOrdenada.length - 1];
  let mayorCapacidad = capacidadOrdenada[capacidadOrdenada.length - 1];
  tablaUno($firstRow, menorAsistencia, mayorAsistencia, mayorCapacidad);
}

function getStats2(events, property, contenedor) {
  events.map((event) => {
    event.gain = event[property] * event.price;
  });
  let categories = new Set(events.map((event) => event.category));
  categories = [...categories];
  let stats = categories.map((cat) => {
    let filter = events.filter((event) => event.category === cat);
    return reduceStats(filter, property);
  });
  crearTablaDos(stats, contenedor);
}

function reduceStats(array, prop) {
  let initialStat = {
    category: "",
    gain: 0,
    capacity: 0,
    [prop]: 0,
  };
  let stats = array.reduce((element1, element2) => {
    return {
      category: element2.category,
      gain: element1.gain + element2.gain,
      capacity: element1.capacity + element2.capacity,
      [prop]: element1[prop] + element2[prop],
    };
  }, initialStat);
  stats.prom = ((100 * stats[prop]) / stats.capacity).toFixed(2);
  return stats;
}

function crearTablaDos(array, contenedor) {
  array.forEach((element) => {
    contenedor.innerHTML += `
        <tr>
            <td >${element.category}</td>
            <td >${element.gain}</td>
            <td >${element.prom}%</td>
        </tr>
      `;
  });
}
