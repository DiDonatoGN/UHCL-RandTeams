let jugadores = [];

function actualizarLista() {
  const lista = document.getElementById('listaJugadores');
  lista.innerHTML = '';
  jugadores.forEach((j, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${j}</span>
      <div>
        <button style="background:#28a745" onclick="renombrarJugador(${i})">✎</button>
        <button style="background:#dc3545" onclick="eliminarJugador(${i})">🗑</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function agregarJugador() {
  const input = document.getElementById('jugador');
  const nombre = input.value.trim();
  if (!nombre) return alert('Ingrese un nombre válido');
  jugadores.push(nombre);
  input.value = '';
  actualizarLista();
}

function renombrarJugador(i) {
  const nuevo = prompt('Nuevo nombre del jugador:', jugadores[i]);
  if (nuevo && nuevo.trim() !== '') {
    jugadores[i] = nuevo.trim();
    actualizarLista();
  }
}

function eliminarJugador(i) {
  jugadores.splice(i, 1);
  actualizarLista();
}

function generarEquipos() {
  const tamano = parseInt(document.getElementById('tamanoEquipo').value);
  if (isNaN(tamano) || tamano <= 0) return alert('Ingrese un tamaño de equipo válido');
  if (jugadores.length === 0) return alert('Agregue al menos un jugador');

  // Mezclar jugadores
  const mezcla = [...jugadores].sort(() => Math.random() - 0.5);
  const equiposDiv = document.getElementById('equipos');
  equiposDiv.innerHTML = '';
  const advertencia = document.getElementById('advertencia');
  advertencia.style.display = 'none';

  let equipos = [];
  for (let i = 0; i < mezcla.length; i += tamano) {
    equipos.push(mezcla.slice(i, i + tamano));
  }

  // Completar último equipo si no está completo
  const ultimo = equipos[equipos.length - 1];
  if (ultimo.length < tamano) {
    const faltan = tamano - ultimo.length;
    for (let j = 1; j <= faltan; j++) {
      ultimo.push(`Jugador faltante ${j}`);
    }
    advertencia.innerText = `⚠️ Faltan ${faltan} jugador(es) para completar el último equipo.`;
    advertencia.style.display = 'block';
  }

  // Mostrar equipos
  equipos.forEach((equipo, idx) => {
    const div = document.createElement('div');
    div.className = 'equipo';
    div.innerHTML = `<h3>Equipo ${idx + 1}</h3><ul>${equipo.map(j => `<li>${j}</li>`).join('')}</ul>`;
    equiposDiv.appendChild(div);
  });
}