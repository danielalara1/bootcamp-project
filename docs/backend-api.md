### Documentación de la API TaskFlow

La API es la encargada de gestionar el ciclo de vida de las tareas. Ha sido desarrollada mediante Node.js y Express, siguiendo un patrón de arquitectura modular que separa rutas, servicios y controladores.

Para garantizar el buen funcionamiento entre frontend y servidor, se han implementado las siguientes configuraciones:

1. CORS: Una vez configurado permite que el cliente se comunique con el servidor sin bloqueos de seguridad.

2. JSON: Uso de `express.json()` para que el servidor pueda interpretar los datos enviados.

3. Persistencia: Los datos se mantienen mientras el proceso del servidor esté activo. 

GET, se ejecuta automáticamente al cargar la página; permite recuperar el listado completo de tareas actuales desde el servidor.

POST, se ejecuta cada vez que el usuario añade, elimina o marca una tarea; permite enviar la lista actualizada de tareas desde el cliente al servidor.