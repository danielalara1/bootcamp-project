/**
 * Valida el texto de una tarea según los criterios establecidos.
 * 
 * @param {string} texto - El texto de la tarea a validar.
 * @returns {Object} Objeto con el resultado de la validación.
 * @property {boolean} exito - Indica si la validación fue exitosa.
 * @property {string} mensaje - Mensaje de error o éxito.
 */
function validarTextoTarea(texto) {
    // Verificar que no sea solo espacios en blanco
    if (!texto || texto.trim().length === 0) {
        return {
            exito: false,
            mensaje: "El texto no puede estar vacío o contener solo espacios en blanco."
        };
    }

    // Verificar que tenga más de 3 letras
    const soloLetras = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, "");
    if (soloLetras.length <= 3) {
        return {
            exito: false,
            mensaje: "El texto debe contener más de 3 letras."
        };
    }

    // Verificar que no tenga símbolos raros (solo permite letras, números, espacios y signos básicos)
    const simbolosRaros = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s.,;:-_¿?¡!()]/;
    if (simbolosRaros.test(texto)) {
        return {
            exito: false,
            mensaje: "El texto contiene símbolos no permitidos."
        };
    }

    return {
        exito: true,
        mensaje: "Validación exitosa."
    };
}

module.exports = { validarTextoTarea };