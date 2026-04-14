const taskService = require('../services/task.service');

const getTasks = (req, res) => {
  const tasks = taskService.obtenerTodas();
  res.json(tasks);
};

const createTask = (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
    return res.status(400).json({ error: "El título debe tener al menos 3 caracteres." });
  }

  const nuevaTarea = taskService.crearTarea(titulo);
  res.status(201).json(nuevaTarea);
};

const deleteTask = (req, res) => {
  try {
    const { id } = req.params;
    taskService.eliminarTarea(id);
    res.status(204).send(); 
  } catch (error) {
    if (error.message === 'NOT_FOUND') {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.status(500).json({ error: "Error interno" });
  }
};

module.exports = {
  getTasks,
  createTask,
  deleteTask
};