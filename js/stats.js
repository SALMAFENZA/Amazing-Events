let $stats = document.getElementById(`tablaJs`);
let eventosFuturos;
let eventosPasados; 
fetch("https://mind-hub.up.railway.app/amazing")
  .then((data) => data.json())
  .then((data) => {
    let events2 = data.events;
    let fechaActual = data.date;

eventosFuturos = events2.filter((objeto) => objeto.data > fechaActual);
eventosPasados = events2.filter((objeto) => objeto.data < fechaActual);
logicaTablaUno();
logicaTablaDos();
  })
  .catch((error) => console.log(error));

  function imprimirtabla1(_events2, contenedor) {
    contenedor.innerHTML +=
    `
        <thead class="table-dark">
          <tr>
            <th colspan="3">Events Statics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="semibold">
              Events with the highest percentage of attendance
            </td>
            <td class="semibold">
              Events with the lowest percentage of attendance
            </td>
            <td class="semibold">Events with larger capacity</td>
          </tr>
          <tr>
            <td>${obj1.name}</td>
            <td>${obj2.name}</td>
            <td>${obj3.name}</td>
          </tr>
        </tbody> 
        `
      }
function logicaPrimerTabla(){
  eventosPasados.map((objeto) =>  {
objeto.portcentajeAsistencia = 100 * ( objeto.assistance / objeto.capacity);
});
let asistenciaOrdenada = [...eventosPasados].sort ((e1,e2 ) => e1.porcentajeAsistencia - e2.porcentajeAsistencia);
let CapacidadOrdenada = [...eventosPasados].sort ((e1,e2 ) => e1.capacity - e2.capacity);

let menorAsistencia = asistenciaOrdenada[0];
let mayorAsistencia = asistenciaOrdenada[asistenciaOrdenada.length-1]
let mayorCapacidad = CapacidadOrdenada[CapacidadOrdenada.length-1];
imprimirtabla1($tablas, menorAsistencia, mayorAsistencia, mayorCapacidad);}
