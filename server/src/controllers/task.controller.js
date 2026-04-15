const taskService = require('../services/task.service');

const getTasks = (req, res) => {
    const tareas = taskService.obtenerTodas();
    res.json(tareas);
};

const postTask = (req, res) => {
    
    const nuevasTareas = req.body; 
    taskService.crearTarea(nuevasTareas);
    res.status(201).json({ mensaje: "Guardado" });
};

module.exports = { getTasks, postTask };