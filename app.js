const formulario = document.getElementById('add-task-form');
const input = document.getElementById('task-input');
const lista = document.getElementById('task-list');
const buscador = document.getElementById('search-input');

function cargarTareas() {
    const datosGuardados = localStorage.getItem('mis-tareas');
    if (datosGuardados) {
        const tareas = JSON.parse(datosGuardados);
        tareas.forEach(tarea => crearElementoTarea(tarea.texto, tarea.completada));
    }
    actualizarEstadisticas();
}

function guardarEnLocalStorage() {
    const tareasParaGuardar = [];
    document.querySelectorAll('.task-item').forEach(li => {
        tareasParaGuardar.push({
            texto: li.querySelector('.task-text').innerText,
            completada: li.querySelector('input').checked
        });
    });
    localStorage.setItem('mis-tareas', JSON.stringify(tareasParaGuardar));
}

function crearElementoTarea(texto, completada = false) {
    const nuevaTarea = document.createElement('li');
    nuevaTarea.className = 'task-item';
    
    nuevaTarea.innerHTML = `
        <div class="task-info">
            <input type="checkbox" ${completada ? 'checked' : ''} onchange="actualizarEstadisticas(); guardarEnLocalStorage()">
            <span class="task-text" onclick="editarTarea(this)">${texto}</span>
        </div>
        <button class="delete-btn" onclick="eliminarTarea(this)">Eliminar</button>
    `;

    lista.appendChild(nuevaTarea);
}

function editarTarea(elemento) {
    const nuevoTexto = prompt("Edita tu tarea:", elemento.innerText);
    if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        elemento.innerText = nuevoTexto.trim();
        guardarEnLocalStorage();
    }
}

function filtrarTareas(filtro) {
    const tareas = document.querySelectorAll('.task-item');
    tareas.forEach(tarea => {
        const estaCompletada = tarea.querySelector('input').checked;
        if (filtro === 'todas') tarea.style.display = 'flex';
        else if (filtro === 'pendientes') tarea.style.display = estaCompletada ? 'none' : 'flex';
        else if (filtro === 'completadas') tarea.style.display = estaCompletada ? 'flex' : 'none';
    });
}

buscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    document.querySelectorAll('.task-item').forEach(tarea => {
        const contenido = tarea.querySelector('.task-text').innerText.toLowerCase();
        tarea.style.display = contenido.includes(texto) ? 'flex' : 'none';
    });
});

function marcarTodas() {
    document.querySelectorAll('.task-item input').forEach(check => {
        check.checked = true;
    });
    actualizarEstadisticas();
    guardarEnLocalStorage();
}

function borrarCompletadas() {
    document.querySelectorAll('.task-item').forEach(tarea => {
        if (tarea.querySelector('input').checked) {
            tarea.remove();
        }
    });
    actualizarEstadisticas();
    guardarEnLocalStorage();
}

function actualizarEstadisticas() {
    const totalContador = document.getElementById('total-count');
    const completadasContador = document.getElementById('completed-count');
    const numeroTotal = lista.querySelectorAll('.task-item').length;
    const numeroCompletadas = lista.querySelectorAll('input[type="checkbox"]:checked').length;

    if (totalContador) totalContador.innerText = numeroTotal;
    if (completadasContador) completadasContador.innerText = numeroCompletadas;
}

function eliminarTarea(boton) {
    const tarea = boton.closest('.task-item');
    tarea.classList.add('tarea-eliminando');
    setTimeout(() => {
        tarea.remove();
        actualizarEstadisticas();
        guardarEnLocalStorage();
    }, 400);
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const texto = input.value.trim();
    if (texto === "") return;
    crearElementoTarea(texto);
    input.value = ""; 
    actualizarEstadisticas();
    guardarEnLocalStorage();
});

cargarTareas();


const btnOscuro = document.getElementById('theme-toggle');
const icono = document.getElementById('theme-icon');

if (localStorage.getItem('modo-oscuro') === 'true') {
    document.documentElement.classList.add('dark');
    if(icono) icono.innerText = '☀️';
}

if (btnOscuro) {
    btnOscuro.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        
        const esOscuro = document.documentElement.classList.contains('dark');
        
        localStorage.setItem('modo-oscuro', esOscuro);
        
        icono.innerText = esOscuro ? '☀️' : '🌙';
    });
}