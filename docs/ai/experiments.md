### Comparación entre programación tradicional e IA 

Durante esta práctica detallaremos la comparación entre el desarrollo de software basado en el conocimiento previo y la resolución mediante de la inteligencia artificial.
 
## Problemas lógicos 

En este bloque pondremos retos clásicos para medir la eficacia en la sintaxis básica.

   1.  Cadenas de texto.
    
        Planteé  estructurar un bucle `for`, el cual recorriera la cadena de atrás hacia delante para ir uniendo los caracteres. Me tomó alrededor de 8 minutos  para asegurarme de su funcionamiento.

        Solicité a la IA una solución optimizada, propuso encadenar `split`,`reverse`y `join`. Implementarlo al código tomó al rededor de 2 minutos.

        La IA ofrece soluciones sencillas las cuales se nos olvidan cuando pensamos en lógica pura.
    
    2. Gestión duplicada 

        Intenté resolverlo mediante el método `includes` para verificar la existencia de los elementos. Me tomó alrededor de 10 minutos.

        Por otro lado, la IA sugirió el uso de `set`, el cual elimina los duplicados de forma nativa. Implementarlo  tomó alrededor de 3 minutos.

        El código mejora al introducir la solución de la IA ya que utiliza estructuras de datos eficaces  y reducen la complejidad del algoritmo.

    3. Identificadores únicos

        Investigué cómo crear strings aleatorios para evitar colisiones entre sí; esta búsqueda me llevó alrededor de unos 20 minutos.

        Al preguntarle a  la IA una solución para este problema, sugirió utilizar la API moderna `crypto.randomUUID()`. Implementar esta respuesta me me llevó 5 minutos.

        La IA contiene APIs modernas lo que nos ayuda a disminuir nuestro tiempo de investigación en foros externos.
    
## Implementación al proyecto TaskFlow 

   1. Persistecia del modo oscuro

        Guardé la referencia en `localStore`, pero no conseguía evitar el parpadeo blanco que sucedía al recargar la página. Me tomó 25 minutos pero no logré arreglarlo.

        La IA indicó la necesidad de colocar un script dentro del `head` del HTML. La implementación al código fue de 2 minutos.

        La IA nos ayuda a comprender el orden de carga del navegador y no solo a generar el código, esto mejora la experiencia como usuario.

    2. Refinamiento de validaciones

        Apliqué una validación básica para los campos vacíos pero el código permite guardar tareas con espacios en blanco. Me tomó  8 minutos.

        La solución de la IA fue implementar el método `.trim()`.Implementarlo al código fue de 3 minutos y fue una corrección instantánea.

        La IA es perfecta detectando comportamientos inesperados por parte del usuario que nosotros no percibimos.

    3. Cálculo estadístico

        Desarrollé una lógica basada en contadores dentro de un bucle `forEach`, lo que me llevó 10 minutos.

        Por otro lado, la IA dio una solución declarativa usando `.filter().length`. Esta implementación duró 2 minutos.

        