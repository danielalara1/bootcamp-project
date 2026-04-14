let tasks = []; 

const obtenerTodas = () => {
  return tasks;
};

const crearTarea = (titulo) => {
  const nuevaTarea = {
    id: Date.now().toString(), 
    titulo: titulo,
    completada: false
  };
  tasks.push(nuevaTarea);
  return nuevaTarea;
};

const eliminarTarea = (id) => {
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    throw new Error('NOT_FOUND'); 
  }
  tasks.splice(index, 1);
  return true;
};

module.exports = {
  obtenerTodas,
  crearTarea,
  eliminarTarea
};