const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const mensajeAviso = document.getElementById('mensaje-aviso');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
let filtroActual = 'todas'; 

const guardarEnStorage = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

const actualizarStats = () => {
    document.getElementById('total-count').textContent = tareas.length;
    document.getElementById('completed-count').textContent = tareas.filter(t => t.completada).length;
};

/**
 * Renderiza las tareas en la lista según el filtro actual.
 */
const renderTareas = () => {
    taskList.textContent = '';
    
    const tareasFiltradas = tareas.filter(t => {
        if (filtroActual === 'pendientes') return !t.completada;
        if (filtroActual === 'completadas') return t.completada;
        return true;
    });

    if (tareasFiltradas.length === 0) {
        const liVacio = document.createElement('li');
        liVacio.className = 'text-center py-10 text-gray-500 italic dark:text-gray-400';
        liVacio.textContent = 'No hay tareas que mostrar.';
        taskList.appendChild(liVacio);
    } else {
        tareasFiltradas.forEach((tarea) => {
            const indiceTarea = tareas.indexOf(tarea); 
            const li = document.createElement('li');
            const clasesFondo = tarea.completada 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-white border-gray-200 dark:bg-[#222222] dark:border-gray-700';
            
            li.className = `flex justify-between items-center p-3 rounded-lg border ${clasesFondo} mb-2 shadow-sm transition-all`;
            const span = document.createElement('span');
            span.className = `${tarea.completada ? 'line-through text-gray-400 dark:text-gray-500' : 'text-[#1b2e1b] dark:text-white'} cursor-pointer flex-1`;
            span.textContent = tarea.texto;

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'delete-btn ml-4 text-red-500 hover:text-red-700 font-bold';
            btnEliminar.textContent = '✕';
            btnEliminar.type = 'button';

            li.appendChild(span);
            li.appendChild(btnEliminar);
            
            // Evento para togglear tarea
            span.addEventListener('click', () => toggleTaskCompletion(indiceTarea));
            
            // Evento para eliminar tarea
            btnEliminar.addEventListener('click', () => eliminarTarea(indiceTarea));
            
            taskList.appendChild(li);
        });
    }
    actualizarStats();
};

window.filtrarTareas = (filtro) => {
    filtroActual = filtro;
    renderTareas();
};

window.marcarTodas = () => {
    tareas.forEach(t => t.completada = true);
    guardarEnStorage();
    renderTareas();
};

window.borrarCompletadas = () => {
    tareas = tareas.filter(t => !t.completada);
    guardarEnStorage();
    renderTareas();
};

/**
 * Agrega una nueva tarea a la lista.
 * @param {string} textoTarea - El texto de la tarea a agregar.
 */
const agregarTarea = (textoTarea) => {
    const nuevaTarea = crearTarea(textoTarea);
    tareas.push(nuevaTarea);
    taskInput.value = '';
    guardarEnStorage();
    renderTareas();
};

const crearTarea = (textoTarea) => {
    return { texto: textoTarea, completada: false };
};

const esTextoTareaValido = (textoTarea) => {
    return validarTextoTarea(textoTarea);
};

const mostrarAvisoValidacion = () => {
    mensajeAviso.classList.remove('hidden');
    setTimeout(() => mensajeAviso.classList.add('hidden'), 3000);
};

const manejarEnvioFormularioTarea = (eventoSubmit) => {
    eventoSubmit.preventDefault();
    const textoTarea = taskInput.value.trim();

    if (!esTextoTareaValido(textoTarea)) {
        mostrarAvisoValidacion();
        return;
    }

    agregarTarea(textoTarea);
};

taskForm.addEventListener('submit', manejarEnvioFormularioTarea);

/**
 * Alterna el estado de completitud de una tarea en la lista.
 * @param {number} index - El índice de la tarea en el array de tareas.
 * @returns {void}
 */
window.toggleTaskCompletion = (index) => {
    try {
        tareas[index].completada = !tareas[index].completada;
        guardarEnStorage();
        renderTareas();
    } catch (error) {
        console.error('Error al guardar la tarea en localStorage:', error);
    }
};

window.eliminarTarea = (index) => {
    tareas.splice(index, 1);
    guardarEnStorage();
    renderTareas();
};

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const esOscuro = document.documentElement.classList.contains('dark');
    themeIcon.textContent = esOscuro ? '☀️' : '🌕';
    localStorage.setItem('theme', esOscuro ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
    themeIcon.textContent = '☀️';
}

renderTareas();