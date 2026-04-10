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

const renderTareas = () => {
    taskList.innerHTML = '';
    
    const tareasFiltradas = tareas.filter(t => {
        if (filtroActual === 'pendientes') return !t.completada;
        if (filtroActual === 'completadas') return t.completada;
        return true;
    });

    if (tareasFiltradas.length === 0) {
        taskList.innerHTML = `<li class="text-center py-10 text-gray-500 italic dark:text-gray-400">No hay tareas que mostrar.</li>`;
    } else {
        tareasFiltradas.forEach((tarea, index) => {
            const originalIndex = tareas.indexOf(tarea); 
            const li = document.createElement('li');
            const clasesFondo = tarea.completada 
                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                : 'bg-white border-gray-200 dark:bg-[#222222] dark:border-gray-700';
            
            li.className = `flex justify-between items-center p-3 rounded-lg border ${clasesFondo} mb-2 shadow-sm transition-all`;
            li.innerHTML = `
                <span class="${tarea.completada ? 'line-through text-gray-400 dark:text-gray-500' : 'text-[#1b2e1b] dark:text-white'} cursor-pointer flex-1" onclick="toggleTarea(${originalIndex})">
                    ${tarea.texto}
                </span>
                <button onclick="eliminarTarea(${originalIndex})" class="ml-4 text-red-500 hover:text-red-700 font-bold">✕</button>
            `;
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

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = taskInput.value.trim();
    if (texto === "") {
        mensajeAviso.classList.remove('hidden');
        setTimeout(() => mensajeAviso.classList.add('hidden'), 3000);
        return;
    }
    tareas.push({ texto: texto, completada: false });
    taskInput.value = '';
    guardarEnStorage();
    renderTareas();
});

window.toggleTarea = (index) => {
    tareas[index].completada = !tareas[index].completada;
    guardarEnStorage();
    renderTareas();
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

// Función para validar la contraseña
const validarPassword = (password) => {
    // Verificar que la contraseña tenga más de 8 caracteres
    const tieneMasDe8Caracteres = password.length > 8;
    
    // Verificar que contenga al menos un número usando expresión regular
    const tieneNumero = /\d/.test(password);
    
    // Retornar true solo si ambas condiciones se cumplen
    return tieneMasDe8Caracteres && tieneNumero;
};

// Ejemplo de uso
// console.log(validarPassword("abc123"));    // false (menos de 8 caracteres)
// console.log(validarPassword("password"));  // false (sin número)
// console.log(validarPassword("pass1234"));  // true (8+ caracteres y tiene número)