const taskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const priorityInput = document.getElementById('priority-input'); 
const searchInput = document.getElementById('search-input');
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
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    
    document.getElementById('total-count').textContent = total;
    document.getElementById('completed-count').textContent = completadas;

    const porcentaje = total === 0 ? 0 : Math.round((completadas / total) * 100);
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-percentage');
    
    if(progressBar && progressText) {
        progressBar.style.width = `${porcentaje}%`;
        progressText.textContent = porcentaje;
    }
};

const renderTareas = () => {
    taskList.textContent = '';
    
    const tareasFiltradas = tareas.filter(t => {
        const coincideBusqueda = t.texto.toLowerCase().includes(searchInput.value.toLowerCase());
        let coincideFiltro = true;
        if (filtroActual === 'pendientes') coincideFiltro = !t.completada;
        if (filtroActual === 'completadas') coincideFiltro = t.completada;
        return coincideBusqueda && coincideFiltro;
    });

    if (tareasFiltradas.length === 0) {
        const liVacio = document.createElement('li');
        liVacio.className = 'text-center py-10 text-gray-500 italic dark:text-gray-400';
        liVacio.textContent = 'No hay tareas que mostrar.';
        taskList.appendChild(liVacio);
    } else {
        tareasFiltradas.forEach((tarea) => {
            const indiceOriginal = tareas.indexOf(tarea); 
            const li = document.createElement('li');
            
            const borderPriority = {
                'alta': 'border-l-4 border-l-red-500',
                'media': 'border-l-4 border-l-yellow-500',
                'baja': 'border-l-4 border-l-green-500'
            };

            const clasesFondo = tarea.completada 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : `bg-white border-gray-200 dark:bg-[#222222] dark:border-gray-700 ${borderPriority[tarea.prioridad || 'baja']}`;
            
            li.className = `flex justify-between items-center p-3 rounded-lg border ${clasesFondo} mb-2 shadow-sm transition-all`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'flex flex-col flex-1 cursor-pointer';

            const span = document.createElement('span');
            span.className = `${tarea.completada ? 'line-through text-gray-400 dark:text-gray-500' : 'text-[#1b2e1b] dark:text-white'} font-medium`;
            span.textContent = tarea.texto;

            const smallFecha = document.createElement('small');
            smallFecha.className = 'text-[10px] opacity-50 dark:text-gray-400';
            smallFecha.textContent = `📅 ${tarea.fecha || 'Reciente'}`;

            contentDiv.appendChild(span);
            contentDiv.appendChild(smallFecha);

            const btnEditar = document.createElement('button');
            btnEditar.className = 'ml-2 text-blue-500 hover:text-blue-700 text-sm p-1';
            btnEditar.textContent = '✏️';

            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'delete-btn ml-4 text-red-500 hover:text-red-700 font-bold p-1';
            btnEliminar.textContent = '✕';

            li.appendChild(contentDiv);
            li.appendChild(btnEditar);
            li.appendChild(btnEliminar);
            
            contentDiv.addEventListener('click', () => toggleTaskCompletion(indiceOriginal));
            btnEliminar.addEventListener('click', () => eliminarTarea(indiceOriginal));
            
            btnEditar.addEventListener('click', (e) => {
                e.stopPropagation();
                const nuevoTexto = prompt('Edita tu tarea:', tarea.texto);
                if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
                    tareas[indiceOriginal].texto = nuevoTexto.trim();
                    guardarEnStorage();
                    renderTareas();
                }
            });
            
            taskList.appendChild(li);
        });
    }
    actualizarStats();
};

const agregarTarea = (textoTarea) => {
    const prioridad = priorityInput.value;
    const ahora = new Date();
    const fechaActual = ahora.toLocaleDateString() + " " + ahora.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const nuevaTarea = { 
        texto: textoTarea, 
        completada: false, 
        prioridad: prioridad,
        fecha: fechaActual 
    };
    
    tareas.push(nuevaTarea);
    taskInput.value = '';
    guardarEnStorage();
    renderTareas();
};

window.toggleTaskCompletion = (index) => {
    tareas[index].completada = !tareas[index].completada;
    guardarEnStorage();
    renderTareas();
};

window.eliminarTarea = (index) => {
    tareas.splice(index, 1);
    guardarEnStorage();
    renderTareas();
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

const esTextoTareaValido = (textoTarea) => {
    return typeof validarTextoTarea === 'function' ? validarTextoTarea(textoTarea) : textoTarea !== "";
};

const mostrarAvisoValidacion = () => {
    mensajeAviso.classList.remove('hidden');
    setTimeout(() => mensajeAviso.classList.add('hidden'), 3000);
};

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = taskInput.value.trim();
    if (!esTextoTareaValido(texto)) {
        mostrarAvisoValidacion();
        return;
    }
    agregarTarea(texto);
});

searchInput.addEventListener('input', renderTareas);

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