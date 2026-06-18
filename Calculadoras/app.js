// ================================================
// Tabs
// ================================================

document.querySelectorAll('.tab').forEach(tab => {

  tab.addEventListener('click', () => {

    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');

  });

});

// ================================================
// Promedio semestre
// ================================================

let contador = 1;
let materias = [];

function calcularPromedio(datos) {

  let sumaNotas = 0.0;
  let sumaCreditos = 0;

  datos.forEach(m => {

    sumaNotas += m.nota * m.creditos;
    sumaCreditos += m.creditos;

  });

  if (sumaCreditos === 0) return 0.0;
  return sumaNotas / sumaCreditos;

}

function obtenerRendimiento(promedio) {

  if (promedio >= 4.5) return "Excelente";
  if (promedio >= 3.7) return "Bueno";
  if (promedio >= 3.0) return "Regular";
  return "Insuficiente";

}

function agregarMateria() {

  const id = contador++;
  const nombre = "Materia " + id;
  materias.push({ id, nombre });

  const row = document.createElement('div');
  row.className = 'materia-row';
  row.dataset.id = id;
  row.innerHTML = `
    <div class="materia-nombre">${nombre}</div>
    <div class="campo-wrap">
      <span class="campo-label">Nota</span>
      <input type="number" class="campo-nota" placeholder="0.0 — 5.0" min="0" max="5" step="0.1" />
    </div>
    <div class="campo-wrap">
      <span class="campo-label">Créditos</span>
      <input type="number" class="campo-creditos" placeholder="ej: 3" min="1" />
    </div>
    <button class="btn-eliminar" onclick="eliminarMateria(${id})">−</button>
  `;

  document.getElementById('materias-list').appendChild(row);
  actualizarCantidad();

}

function eliminarMateria(id) {

  if (materias.length <= 1) return;

  materias = materias.filter(m => m.id !== id);

  const row = document.querySelector(`.materia-row[data-id="${id}"]`);
  if (row) row.remove();

  actualizarCantidad();

}

function actualizarCantidad() {

  document.getElementById('cant-display').textContent =
    document.querySelectorAll('.materia-row').length;

}

function ejecutarPromedio() {

  const rows = document.querySelectorAll('.materia-row');
  const datos = [];
  let totalCreditos = 0;

  for (const row of rows) {

    const nota     = parseFloat(row.querySelector('.campo-nota').value);
    const creditos = parseInt(row.querySelector('.campo-creditos').value);
    const nombre   = row.querySelector('.materia-nombre').textContent;

    if (isNaN(nota) || isNaN(creditos)) {
      document.getElementById('promedio-sub').textContent = 'Completa todos los campos';
      return;
    }

    if (nota < 0 || nota > 5) {
      document.getElementById('promedio-sub').textContent = 'La nota debe estar entre 0 y 5';
      return;
    }

    if (creditos <= 0) {
      document.getElementById('promedio-sub').textContent = 'Los créditos deben ser mayores a 0';
      return;
    }

    datos.push({ nombre, nota, creditos });
    totalCreditos += creditos;

  }

  const promedio    = calcularPromedio(datos);
  const rendimiento = obtenerRendimiento(promedio);
  const clase       = rendimiento.toLowerCase();

  const promedioEl = document.getElementById('promedio-display');
  promedioEl.textContent = promedio.toFixed(2);
  promedioEl.className   = 'hero-display ' + clase;

  document.getElementById('promedio-sub').textContent =
    `${rows.length} materias · ${totalCreditos} créditos totales`;

  document.getElementById('rendimiento-display').textContent  = rendimiento;
  document.getElementById('rendimiento-display').style.color  =
    clase === 'excelente' ? 'var(--green)' :
    clase === 'bueno'     ? 'var(--blue)'  :
    clase === 'regular'   ? 'var(--amber)' : 'var(--red)';

  document.getElementById('creditos-display').textContent = totalCreditos;

  const logPanel = document.getElementById('log-panel');
  const logList  = document.getElementById('log-list');
  logList.innerHTML = '';
  logPanel.style.display = 'block';

  datos.forEach(m => {

    const claseNota = obtenerRendimiento(m.nota).toLowerCase();
    const item = document.createElement('div');
    item.className = 'log-item';
    item.innerHTML = `
      <span class="log-nombre">${m.nombre}</span>
      <span class="log-detalle">${m.creditos} créditos</span>
      <span class="log-nota ${claseNota}">${m.nota.toFixed(1)}</span>
    `;
    logList.appendChild(item);

  });

}

document.getElementById('btn-agregar').addEventListener('click', agregarMateria);
document.getElementById('btn-calcular-promedio').addEventListener('click', ejecutarPromedio);

agregarMateria();

// ================================================
// Nota para pasar
// ================================================

function calcularNota(nota1, nota2, notaDeseada) {

  if (nota1 >= 0 && nota1 <= 5 &&
      nota2 >= 0 && nota2 <= 5 &&
      notaDeseada >= 0 && notaDeseada <= 5) {

    return -(((nota1 * 0.3) + (nota2 * 0.3) - notaDeseada) / 0.4);

  }

  return 0.0;

}

function ejecutarNota() {

  const corte1  = parseFloat(document.getElementById('corte1').value);
  const corte2  = parseFloat(document.getElementById('corte2').value);
  const deseada = parseFloat(document.getElementById('deseada').value);

  if (isNaN(corte1) || isNaN(corte2) || isNaN(deseada)) {
    document.getElementById('nota-sub').textContent = 'Ingresa todos los valores';
    return;
  }

  const nota3    = calcularNota(corte1, corte2, deseada);
  const imposible = nota3 > 5.0 || nota3 === 0.0;

  document.getElementById('stat-corte1').textContent  = corte1.toFixed(1);
  document.getElementById('stat-corte2').textContent  = corte2.toFixed(1);
  document.getElementById('stat-deseada').textContent = deseada.toFixed(1);

  const notaEl = document.getElementById('nota-display');
  const subEl  = document.getElementById('nota-sub');

  notaEl.textContent = nota3.toFixed(2);
  notaEl.className   = 'hero-display ' + (imposible ? 'imposible' : 'posible');

  if (imposible) {

    subEl.textContent = `No es posible obtener ${deseada.toFixed(1)} — necesitarías un ${nota3.toFixed(2)}`;
    subEl.className   = 'hero-sub imposible';

  } else {

    subEl.textContent = `Es posible ✓ — Saca ${nota3.toFixed(2)} en el tercer corte`;
    subEl.className   = 'hero-sub posible';

  }

  const panel    = document.getElementById('resultado-panel');
  const desglose = document.getElementById('desglose');
  panel.style.display = 'block';

  desglose.innerHTML = `
    <div class="desglose-row">
      <span class="desglose-label">Corte 1 × 30%</span>
      <span class="desglose-val">${(corte1 * 0.3).toFixed(3)}</span>
    </div>
    <div class="desglose-row">
      <span class="desglose-label">Corte 2 × 30%</span>
      <span class="desglose-val">${(corte2 * 0.3).toFixed(3)}</span>
    </div>
    <div class="desglose-row">
      <span class="desglose-label">Acumulado (cortes 1 y 2)</span>
      <span class="desglose-val">${((corte1 * 0.3) + (corte2 * 0.3)).toFixed(3)}</span>
    </div>
    <div class="desglose-row">
      <span class="desglose-label">Faltante para llegar a ${deseada.toFixed(1)}</span>
      <span class="desglose-val">${(deseada - ((corte1 * 0.3) + (corte2 * 0.3))).toFixed(3)}</span>
    </div>
    <div class="desglose-row destacado">
      <span class="desglose-label">Nota necesaria en corte 3 (40%)</span>
      <span class="desglose-val">${nota3.toFixed(2)}</span>
    </div>
  `;

}

document.getElementById('btn-calcular-nota').addEventListener('click', ejecutarNota);

['corte1', 'corte2', 'deseada'].forEach(id => {

  document.getElementById(id).addEventListener('input', () => {

    const c1 = document.getElementById('corte1').value;
    const c2 = document.getElementById('corte2').value;
    const d  = document.getElementById('deseada').value;

    if (c1 && c2 && d) ejecutarNota();

  });

});