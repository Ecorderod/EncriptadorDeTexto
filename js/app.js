// Declaro variables y const globales
let cadenaUsuario = "";
const inputTextareaUsuario = document.querySelector(".texto__usuario");
const mostrarCadena = document.querySelector(".texto__desencriptado");

// Este evento redimensiona la altura del textarea derecho de acuerdo al tamaño del texto
window.addEventListener('resize', () => {
  autoAjustarAlturaTextarea(mostrarCadena);
});

// Función principal de inicio de la lógica del encriptador de texto
function iniciarAplicacion() {
  
  // Asigna eventos a los elementos DOM cuando el contenido está completamente cargado
  document.addEventListener('DOMContentLoaded', () => {
    inputTextareaUsuario.focus(); // Coloca el foco en el textarea al cargar la página
    inputTextareaUsuario.addEventListener('input', validarCadena); // Valida la cadena en tiempo real
  });

  // Evento para el botón "Encriptar"
  document.getElementById("btn-encriptar").addEventListener("click", function() {
    cadenaUsuario = inputTextareaUsuario.value; // Captura el valor ingresado por el usuario
    mostrarElementos(encriptarTexto(cadenaUsuario)); // Muestra el texto encriptado
  });

  // Evento para el botón "Desencriptar"
  document.getElementById("btn-desencriptar").addEventListener("click", function() {
    cadenaUsuario = inputTextareaUsuario.value; // Captura el valor ingresado por el usuario
    mostrarElementos(desencriptarTexto(cadenaUsuario)); // Muestra el texto desencriptado
  });

  // Evento para el botón "Copiar"
const btnCopiar = document.getElementById("btn-copiar");
btnCopiar.addEventListener("click", async () => {
    try {
        mostrarCadena.select();
        await navigator.clipboard.writeText(mostrarCadena.value);

        // Añade la clase "copiado"
        btnCopiar.querySelector('.texto__boton__copiar').textContent = 'Texto a sido copiado';
        btnCopiar.classList.add('copiado');
        btnCopiar.disabled = true;

        // Restaura el estado original después de 1.0 segundos
        setTimeout(() => {
            btnCopiar.querySelector('.texto__boton__copiar').textContent = 'Copiar';
            btnCopiar.classList.remove('copiado');
            btnCopiar.disabled = false;
        }, 1000);
    } catch (error) {
        console.error(error);
    }
});
}

// Valida en tiempo real letras minúsculas, sin acentos y algunos caracteres permitidos en el textarea del usuario
function validarCadena(e) {
  const textarea = e.target;
  textarea.value = textarea.value.toLowerCase().replace(/[^a-zñ\s.,¡!¿?]/g, ''); // Solo permite ciertos caracteres
}

// Función para encriptar el texto
const encriptarTexto = (cadena) => {
  const reemplazos = { e: "enter", i: "imes", a: "ai", o: "ober", u: "ufat" };
  return [...cadena].map((letra) => reemplazos[letra] || letra).join(""); // Reemplaza letras según las reglas de encriptación
};

// Función para desencriptar el texto
const desencriptarTexto = (cadena) => {
  const reemplazos = { enter: "e", imes: "i", ai: "a", ober: "o", ufat: "u" };
  return Object.keys(reemplazos).reduce(
    (acc, key) => acc.replaceAll(key, reemplazos[key]),
    cadena
  ); // Reemplaza patrones encriptados por las letras originales
};

// Función para visualizar los elementos en pantalla dependiendo de las funciones encriptar o desencriptar
const mostrarElementos = (cadena) => {
  const panelPrimario = document.querySelector(".seccion__derecha");
  const panelSecundario = document.querySelector(".seccion__desencriptado");
  const contenedorTexto = document.querySelector(".contenedor__textos__derecha");

  if (cadena.trim() === "") {
      inputTextareaUsuario.value = "";
      panelSecundario.style.display = "none";
      panelPrimario.setAttribute("style", "display: flex");

      // Añadir la clase que activa el cambio de color
      contenedorTexto.classList.add("resaltar");

      // Remover la clase después de un tiempo (ej. 1 segundo)
      setTimeout(() => {
          contenedorTexto.classList.remove("resaltar");
      }, 1000);

  } else {
      console.log(cadena);
      panelPrimario.setAttribute("style", "display: none");
      panelSecundario.style.display = "flex";
      mostrarCadena.value = cadena.trim().replace(/\s+/g, ' ');
      inputTextareaUsuario.value = "";
      autoAjustarAlturaTextarea(mostrarCadena);
  }
}


// Función que ajusta el tamaño del textarea derecho de acuerdo a su contenido
function autoAjustarAlturaTextarea(textarea) {
  textarea.style.height = 'auto'; // Resetea la altura
  textarea.style.height = textarea.scrollHeight + 'px'; // Ajusta la altura al contenido
}

// Iniciar la aplicación
iniciarAplicacion();
