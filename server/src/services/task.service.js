
let tareas = []; 

const obtenerTodas = () => {
    return tareas;
};

const crearTarea = (datosRecibidos) => {

    if (Array.isArray(datosRecibidos)) {
        tareas = datosRecibidos;
    } else {

        tareas.push(datosRecibidos);
    }
    console.log(" Memoria del servidor actualizada:", tareas.length, "tareas guardadas.");
    return tareas;
};

module.exports = { obtenerTodas, crearTarea };