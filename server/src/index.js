const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(` Petición: ${req.method} en ${req.url}`);
    if (req.method === 'POST') {
        console.log(" Cuerpo recibido:", JSON.stringify(req.body));
    }
    next();
});

app.use('/api/v1/tasks', taskRoutes);

app.listen(3000, () => {
    console.log("Servidor funcionando en el puerto 3000");
});