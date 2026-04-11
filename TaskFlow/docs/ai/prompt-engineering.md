### Definición de Rol (Persona)

Prompt: "Actúa como un desarrollador senior. Revisa mi archivo index.html (o el que tengas principal) y dime qué 3 mejoras de accesibilidad o estructura le harías. Explícame el porqué de cada una."

Asignamos el rol de Senior a la IA, al darle el prompt nos va a dar un resultado más profesional y crítico. Busca estándares de la industria.

* Resultado:

"Buen archivo base; está ordenado y usa semántica básica (header, main, section, aside, footer).
Como mejora “senior”, haría estas 3 prioridades:

1.- Añadir label real al input de tarea (no solo placeholder)

Qué cambiaría: en el formulario, agregar "label for="task-input""Descripción de la tarea "label" (puede ser visible o sr-only).
Por qué: el placeholder no reemplaza una etiqueta accesible; lectores de pantalla y autocompletado funcionan mejor con label, y mejora usabilidad cuando el campo ya tiene texto.
2.- Corregir estructura/carga de scripts (evitar doble app.js + usar defer)

Qué cambiaría: ahora app.js está dos veces (head y final del body). Dejar una sola carga, idealmente en head con defer, por ejemplo:
"script src="comprobaciones/validaciones.js" defer""/script"
"script src="app.js" defer""/script"
Por qué: cargar app.js dos veces puede duplicar listeners/eventos y provocar comportamientos inconsistentes. Con defer mejoras orden de ejecución y rendimiento sin bloquear el render.

3.- Mejorar anuncios para tecnologías asistivas (role="alert" / aria-live)

Qué cambiaría:
En #mensaje-aviso, usar role="alert" o aria-live="assertive" para errores de validación.
En estadísticas (#total-count, #completed-count) envolver en una región con aria-live="polite" para que los cambios se anuncien.
Por qué: hoy el contenido visual cambia, pero un lector de pantalla puede no enterarse automáticamente. Con regiones vivas, el feedback de errores y progreso también es accesible.
Si quieres, te preparo el index.html ya corregido con estas 3 mejoras aplicadas."





### Few-shot prompting

prompt: "Quiero que documentes mis funciones de JavaScript siguiendo este estilo exacto: Ejemplo: [Nombre de la función] -> [Qué hace en una frase]->[Parámetros].
Ahora, hazlo para la función de agregar tareas de mi app.js."

Al darle un ejemplo, la IA entinde la estructura y estilo que espero, evitando que escriba párrafos innecesrios y grantiza que sea uniforme en todo el proyecto.

* Resultado: 

"`agregarTarea` -> Agrega una nueva tarea pendiente a la lista, limpia el input y actualiza la interfaz/almacenamiento. -> `texto` (`string`): contenido de la tarea que se va a registrar."





### Razonamiento paso a paso

prompt:"Explícame paso a paso cómo funciona la lógica de filtrado de tareas en mi código. No me des solo el código, ve por partes analizando la lógica primero para asegurar que no se me escapa nada."

Con este prompt obliga a la IA a explicar su proceso. Al procesar por etapas, evita errores y sirve para entender el flujo de los datos.

-- Resultado :

"Perfecto. Vamos por partes, siguiendo la lógica real que tienes hoy en app.js para que no se te escape nada.

1.- Estado base que controla el filtro
Tu app usa esta variable global:

filtroActual = 'todas'
Eso significa que, al arrancar, el sistema asume que debe mostrar todas las tareas.

Además, tienes:

tareas: array principal con objetos tipo { texto, completada }
El filtro no crea otro estado permanente; se aplica “al vuelo” cada vez que renderizas.

2.- Punto de entrada del filtrado (acción del usuario)
Cuando haces click en botones como “Todas”, “Pendientes” o “Completadas”, en tu HTML llamas:

filtrarTareas('todas')
filtrarTareas('pendientes')
filtrarTareas('completadas')
Esa función hace dos cosas, en este orden:

Actualiza filtroActual con el valor recibido.
Llama a renderTareas() para redibujar la lista.
Clave: el filtro no modifica tareas, solo cambia qué parte se muestra.

3.- Dónde ocurre el filtrado de verdad
Dentro de renderTareas(), defines:

const tareasFiltradas = tareas.filter(...)
Ese .filter(...) evalúa cada tarea con esta lógica:

Si filtroActual === 'pendientes' → devuelve !t.completada
Si filtroActual === 'completadas' → devuelve t.completada
En cualquier otro caso ('todas') → devuelve true
Resultado: tareasFiltradas contiene solo lo que toca mostrar según el estado actual.

4.- Qué pasa después de filtrar
Con tareasFiltradas ya calculado:

Si está vacío, muestras “No hay tareas que mostrar.”
Si tiene elementos, recorres ese array y pintas cada <li>.
Importante: aquí se separan dos cosas:

Datos reales: tareas
Vista filtrada: tareasFiltradas
Esta separación está bien planteada.

5.- Relación con acciones posteriores (toggle/eliminar)
Aunque visualmente estás viendo una lista filtrada, al hacer toggle o eliminar necesitas impactar el array original tareas.

Por eso en tu render haces:

const indiceTarea = tareas.indexOf(tarea)
Así recuperas el índice en el array principal y luego llamas a funciones de actualización/eliminación con ese índice.

La idea es correcta: operar sobre la fuente real (tareas) aunque estés mostrando una sublista.

6.- Cómo se mantiene consistente al cambiar datos
Cada acción que cambia tareas (agregar, toggle, eliminar, borrarCompletadas, marcarTodas) termina llamando a renderTareas().

Eso provoca que el filtro se reaplique siempre con el filtroActual activo.
Ejemplo mental:

Estás en “Pendientes”
Completas una tarea
Se vuelve a renderizar
Esa tarea desaparece de la vista (porque ya no cumple !completada)
Esto es exactamente el comportamiento esperado en filtros dinámicos.

7.- Matices para que no se te pase nada (muy importante)
El filtro depende de strings literales ('todas', 'pendientes', 'completadas').
Si pasas otro valor, cae al return true y mostrará todo.
No hay persistencia de filtroActual en localStorage; al recargar, vuelve a 'todas'.
En tu código hay un detalle aparte del filtrado: en el render se llama toggleTarea(...) pero la función definida globalmente es toggleTaskCompletion(...). Eso puede romper interacción aunque el filtro esté bien diseñado."





### Restricciones claras en la respuesta

prompt:"Refactoriza la función de renderizado de tareas, pero NO utilices innerHTML por motivos de seguridad. Utiliza únicamente document.createElement y textContent para construir la lista."

Las restricciones disminuyen el número de soluciones que nos da la IA. Al prohibir cosas específicas a la IA obligamos a seguir nuestras prácticas de seguridad y utilizar solo las herramientas que el usuario le pida.

* Resultado:

"La IA refactorizó renderTareas en app.js eliminando cualquier rastro de innerHTML.

 Ahora usa document.createElement('li') y asigna el texto con .textContent.

Al no usar strings de HTML, la IA aprovechó para enlazar los eventos (click) directamente a los nodos recién creados, lo que hace que el código sea más sólido. También detectó de nuevo el error de nombres en las funciones y lo corrigió."





### Generar código

prompt: "Genera una función en JavaScript llamada obtenerFechaFormateada que devuelva la fecha actual en formato 'DD/MM/YYYY'. Asegúrate de que los días y meses menores a 10 tengan un cero delante."

Da la tarea directa, al ser específico con el formato de salida y la condición de los ceros iniciales. Finalmente nos entrega un código bien hecho y completo, listo para usarlo.

* Resultado:

"
```function obtenerFechaFormateada() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();

    return `${dia}/${mes}/${anio}`;
}
```
"





### Refactorización para legibilidad

prompt: "Revisa la función de añadir tareas y refactorízala para que sea más legible. Cambia los nombres de las variables a unos más descriptivos y separa la lógica de validación de la lógica de creación."

Al pedir específicamente que separe la lógica, obligamos a aplicar la responsabilidad única, haciendo el código más fácil de mantener.

* Resultado: 

"Refactor completado en `TaskFlow/app.js` con foco en legibilidad y separación de responsabilidades.

Cambios aplicados:
- Renombré variables para que sean más descriptivas:
  - `texto` -> `textoTarea`
  - `e` -> `eventoSubmit`
- Separé la lógica en funciones claras:
  - `crearTarea(textoTarea)`: solo construye el objeto tarea.
  - `esTextoTareaValido(textoTarea)`: encapsula la validación.
  - `mostrarAvisoValidacion()`: centraliza el aviso visual.
  - `manejarEnvioFormularioTarea(eventoSubmit)`: orquesta flujo de submit.
- `agregarTarea(textoTarea)` ahora se enfoca en:
  1.- crear tarea, 2.- agregar al estado, 3.- persistir, 4.- renderizar.

Resultado: el flujo de “añadir tarea” quedó más fácil de leer, probar y mantener, sin cambiar el comportamiento funcional."





### Documentación automática del proyecto

prompt:"Actúa como un redactor técnico. Lee mis archivos app.js y index.html y genera una breve documentación que explique cómo se comunican el HTML y el JavaScript en este proyecto."

Al enviar este prompt, la IA organizará nuestra información para que cualquier persona pueda entender nuestro proyecto, gracias a su gran capacidad de síntesis.

* Resultado: 

"
  Comunicación entre HTML y JavaScript en TaskFlow

  Carga del script

El documento enlaza `app.js` en el `head` y otra vez antes de `/body`. El navegador ejecuta el archivo dos veces si ambas etiquetas están activas, lo que puede duplicar listeners y comportamiento raro; en la práctica conviene **una sola** inclusión (por ejemplo solo al final del `body`).

También se carga `comprobaciones/validaciones.js` antes de `app.js`, para que exista `validarTextoTarea` cuando `app.js` valide el texto de la tarea.

### Cómo el HTML expone “puntos de enganche” al JS

  1.- **`id` en el DOM**  
    Al cargar la página, `app.js` obtiene nodos con `document.getElementById`: formulario (`add-task-form`), campo de texto (`task-input`), lista (`task-list`), aviso de validación (`mensaje-aviso`), botón y texto del tema (`theme-toggle`, `theme-icon`). Esos identificadores son el contrato entre el marcado y el script.

  2.- **Atributos `onclick` en el HTML**  
    Los botones de filtros y acciones masivas llaman funciones globales: `filtrarTareas(...)`, `marcarTodas()`, `borrarCompletadas()`. En `app.js` esas funciones se asignan a `window` para que el HTML inline las encuentre.

  3.- **Listeners añadidos solo desde JS**  
     - Envío del formulario: `taskForm.addEventListener('submit', ...)`.  
    - Tema: `themeToggle.addEventListener('click', ...)`.  
    - Cada fila de tarea se construye en `renderTareas()` con `createElement`; sobre el texto y el botón ✕ se registran `click` para completar o eliminar.

  Cómo el JS modifica lo que ve el usuario

  - **Lista de tareas**: vacía `task-list` y vuelve a llenarla con `<li>` generados en código (clases Tailwind incluidas).  
  - **Estadísticas**: escribe en `total-count` y `completed-count` con `textContent`.  
  - **Validación**: quita o pone la clase `hidden` en `mensaje-aviso` para mostrar u ocultar el aviso.  
  - **Tema oscuro**: alterna la clase `dark` en `document.documentElement` y actualiza `theme-icon`; al iniciar, lee `localStorage` y aplica el mismo criterio.

  Datos fuera del HTML

  Las tareas y la preferencia de tema se guardan en `localStorage`. El HTML no contiene las tareas; el JS las lee al arrancar, las mantiene en memoria y vuelve a pintar la lista con `renderTareas()` al final del archivo y tras cada cambio relevante.
".





### Detección de errores

prompt:"Actúa como un experto en QA (Control de Calidad). Analiza mi función de eliminar tareas y dime si hay algún escenario donde podría fallar o causar un error en la consola."

A partir de este prompt la IA intentará romper el código ya que tiene el rol de "Tester" o "QA". Con este prompt activamos un  análisis de casos borde que ignoramos al programar, permitiendo  que la IA encuentre estos fallos. 

* Resultado: 
"

  Análisis QA: `eliminarTarea` y su uso

  Código relevante

  La eliminación se hace en `eliminarTarea` y el índice viene de `renderTareas`, al enlazar el botón ✕:

  ```38:62:c:\Users\mejia\Desktop\bootcamp-project\TaskFlow\app.js
          tareasFiltradas.forEach((tarea) => {
              const indiceTarea = tareas.indexOf(tarea); 
              // ...
              btnEliminar.addEventListener('click', () => eliminarTarea(indiceTarea));
  ```

  ```141:145:c:\Users\mejia\Desktop\bootcamp-project\TaskFlow\app.js
  window.eliminarTarea = (index) => {
      tareas.splice(index, 1);
      guardarEnStorage();
      renderTareas();
  };
  ```
   Errores posibles en consola

  1.- **`TypeError: tareas.splice is not a function`**  
     Si `localStorage` tiene JSON válido pero **no es un array** (por ejemplo un objeto o un string), la línea 8 deja `tareas` como ese valor (`JSON.parse(...) || []` solo cae a `[]` cuando el resultado es *falsy*, no cuando es un objeto). Cualquier operación que use `splice` fallará, incluida la eliminación.

  2.- **`QuotaExceededError` (o similar) en `localStorage.setItem`**  
     `guardarEnStorage()` no está envuelto en `try/catch`. Si el almacenamiento está lleno o bloqueado, el error **no se captura** en `eliminarTarea` y **sí puede aparecer en consola** (y la UI puede quedar desincronizada respecto a lo que se intentó guardar).

   Comportamiento incorrecto **sin** error en consola

  3.- **Índice `-1`**  
     Si por algún desfase `tareas.indexOf(tarea)` devolviera `-1`, en JavaScript `splice(-1, 1)` **elimina el último elemento**, no “ninguno”. No suele haber excepción, pero **se borraría la tarea equivocada**. En el flujo normal (lista coherente y un solo `app.js`) es poco probable; sería más plausible con datos corruptos, otra pestaña modificando `localStorage` entre render y clic, o lógica futura que reasigne `tareas` sin volver a renderizar.

  4.- **Doble carga de `app.js`**  
     En `index.html` el script aparece en `<head>` y otra vez antes de `</body>`. Eso puede registrar **dos veces** el mismo `click` en el mismo botón: un solo clic podría ejecutar **dos** `eliminarTarea` seguidos con el **mismo** índice cerrado en el closure, borrando **dos** filas. Suele ser bug de producto, no un `TypeError` obvio.

  5.- **`splice` con índice fuera de rango**  
     Índices mayores que `length - 1` no suelen lanzar error; simplemente no quitan nada. El riesgo aquí es más bien **índice desactualizado** (p. ej. lista antigua frente a otro origen de verdad), con síntomas raros pero no necesariamente una excepción clara.

   Comparación con completar tarea

  `toggleTaskCompletion` usa `try/catch` y ante fallo escribe en consola con `console.error`. **`eliminarTarea` no tiene protección análoga**, así que cualquier fallo en `splice` o en `guardarEnStorage` **sube directo** a la consola (o corta la ejecución sin mensaje controlado por tu código).
"





### Explicación simplificada

prompt: "Explícame cómo funciona el localStorage en mi proyecto pero usa una analogía. Imagina que no sé nada de programación y explícamelo como si fuera un objeto de la vida cotidiana."

Con este prompt la IA nos explica conceptos de forma más genérica para que podamos entender, mediante relaciones con objetos o acciondes de la vida cotidiana.

* Resultado: 
"
  `localStorage` en tu proyecto, con una analogía

  Imagina el **navegador** como tu **casa** y **`localStorage`** como un **cajón con etiquetas** que está **siempre en la misma habitación** (el mismo sitio web o archivo que abres en tu ordenador).

  Qué hace ese cajón

  - Cada cosa que guardas tiene **una etiqueta** (en tu código son nombres como `tareas` y `theme`) y **un contenido** (el texto o la lista que quieres recordar).
  - El cajón **no es infinito**: tiene un tamaño razonable; si lo llenas muchísimo, a veces “no cabe más” (en programación eso puede dar error al guardar).
  - Lo que metes ahí **sigue ahí aunque cierres la pestaña o apagues el ordenador** y vuelvas otro día, **siempre que sigas entrando a la misma “casa”** (misma página en el mismo origen: por ejemplo, si abres el `index.html` desde la misma carpeta o la misma URL).

  No es como la memoria de un pez: es más bien un **bloc de notas adhesivas** que el navegador deja pegado **solo en esa página/sitio**, para la próxima vez que entres.

  Cómo lo usa TaskFlow (sin jerga)

  1.- **Lista de tareas (`tareas`)**  
     Cuando añades, completas o borras tareas, la app **vuelca la lista actual** en una nota etiquetada “tareas”. Al abrir de nuevo la página, **lee esa nota** y **reconstruye la lista** como la dejaste. Es como anotar en el cajón *“hoy tengo que hacer esto y esto”* y al día siguiente abrir el cajón y **copiar la lista al tablero** de la cocina.

  2.- **Tema claro u oscuro (`theme`)**  
     Cuando cambias el modo de color, guarda algo tipo *“prefiero oscuro”* o *“prefiero claro”*. La próxima vez que entras, **mira esa nota primero** y **pone la casa con la luz que te gusta**. Es como dejar el interruptor en la posición que elegiste la última vez.

  Límites de la analogía (por si acaso)

  - Ese cajón es **solo de tu navegador en ese equipo** (y para ese sitio/archivo): **no** es una nube compartida; otro ordenador o otro navegador **no** ve automáticamente lo mismo.
  - Si **borras los datos del sitio** o usas modo privado de forma que no guarde nada, es como **vaciar el cajón**: la lista y el tema pueden **volver al estado inicial**.

  En una frase: **`localStorage` en tu proyecto es el cajón donde TaskFlow apunta la lista de tareas y tu preferencia de tema para que, al volver, todo siga como lo dejaste.**
" 





### Análisis entre archivos 

prompt: "Analiza mis archivos index.html, app.js y style.css en conjunto. Dime si hay clases de CSS o IDs en el HTML que no se están utilizando para nada en el JavaScript o que no tengan estilos en el CSS."

La capacidad de la IA permite manejar un contexto amplio, haciendo que pueda cruzar información entre archivos. Esto permite limpiar nuestro proyecto, detectando código muerto que nos costaría encontrar.

* Resultado: 

"
  Contexto importante

  `index.html` **no enlaza** `style.css` (no hay `<link rel="stylesheet" href="style.css">` en el proyecto). La página se estiliza con **Tailwind por CDN**. Por tanto, **todo lo definido en `style.css` no afecta a esta pantalla** salvo que añadas ese enlace.

  IDs en el HTML y uso en JavaScript


  | ID | ¿Lo usa `app.js`? |
  |----|-------------------|
  | `theme-toggle` | Sí |
  | `theme-icon` | Sí |
  | `mensaje-aviso` | Sí |
  | `add-task-form` | Sí |
  | `task-input` | Sí |
  | `task-list` | Sí |
  | `total-count` | Sí (`getElementById` en `actualizarStats`) |
  | `completed-count` | Sí |
  | **`add-task-section`** | **No** |
  | **`extras-section`** | **No** |
  | **`list-section`** | **No** |

  Esos tres IDs solo sirven como anclaje semántico o para futuros tests/CSS; el script no los referencia.

  Clases en el HTML y JavaScript

  En el HTML, todas las clases son **utilidades de Tailwind**. `app.js` **no selecciona ninguna** con `querySelector`/`.classList` sobre el HTML estático: solo usa **IDs** y, en tareas generadas, asigna cadenas de clases (incluye `delete-btn` en botones creados en JS).

  Conclusión: las clases del HTML estático **no se “usan” en JS para lógica**; solo definen apariencia vía Tailwind. Eso es habitual y no es un error.

  Relación con `style.css`

  Aquí hay que separar dos cosas:

  1.- **Clases/IDs del HTML que no tienen reglas en `style.css`**  
     Casi todas: el HTML usa **Tailwind**, no selectores de tu archivo. No significa que no tengan estilo (lo tienen por el CDN de Tailwind).

  2.- **Reglas en `style.css` que no encajan con el HTML/JS actuales** (si enlazaras el archivo):

     - **`#add-btn`**: en el HTML el botón es *submit* sin ese `id` → la regla no aplica a nada.
    - **`.contenedor`**: no aparece en `index.html`.
    - **`.form-group`**: no aparece en `index.html`.
    - **`.task-item`**: los `<li>` los crea `app.js` con clases Tailwind, no con `task-item`.
    - **`.task-info`**: no se usa en HTML ni en JS.
    - **`.stats`**: el `<aside>` no tiene la clase `stats`.
    -  **`.tarea-eliminando`**: no se añade en ningún sitio del JS → animación sin uso.
    - **`main` / `aside` / `header` / `input[type="text"]`**: sí existen en el DOM; esas reglas **sí** podrían aplicar si cargas `style.css`, pero **chocarían** con Tailwind (mismo `body`, inputs, etc.).

  3.- **`.delete-btn`**: está en **`app.js`** (botón ✕ generado), no en el HTML inicial. Si enlazas `style.css`, el bloque `.delete-btn:hover` **sí tendría un elemento al que aplicarse**; ahora mismo, al no cargar el CSS, no hace efecto.
"