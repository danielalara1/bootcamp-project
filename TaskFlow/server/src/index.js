const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  const inicio = performance.now();
  res.on('finish', () => { 
    const duracion = performance.now() - inicio;
    console.log(`[${req.method}] ${req.originalUrl} - Estado: ${res.statusCode} (${duracion.toFixed(2)}ms)`);
  });
  next();
});

app.use('/api/v1/tasks', taskRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack); 
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(port, () => {
  console.log(`Servidor TaskFlow ejecutándose en http://localhost:${port}`);
});