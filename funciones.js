function resetForm() {
  document.getElementById('formulario').reset();
  const email = document.getElementById('email');
  email.style.backgroundColor = '';
}

function validarCamposVacios(nombre, apellido, email, empresa, sueldo, mensaje) {
  if (nombre.length === 0 || apellido.length === 0 || email.length === 0 || empresa.length === 0 || sueldo.length === 0 || mensaje.length === 0) {
    mostrarError('Porfavor, completa todos los campos');
    return false;
  } else {
    ocultarError();
    return true;
  }
}


function validarEmail(email) { // Valido emails con un regex
  let verificacionEmail = /^[^\s@]+@(?:[^\s@]+\.)+(?:com|com\.ar)$/;
  if (verificacionEmail.test(email)) {
    let inputEmail = document.getElementById('email');
    inputEmail.style.backgroundColor = ''
    return true;
  } else {
    let inputEmail = document.getElementById('email');
    inputEmail.style.backgroundColor = 'rgb(254, 171, 171)';
    return false;
  }
}

function mostrarError(string) {
  let alerta = document.getElementById("datos-invalidos");
  alerta.textContent = string;
  alerta.style.display = 'block';
}

function ocultarError() {
  let alerta = document.getElementById("datos-invalidos");
  alerta.style.display = "none";
}

function validarText(nombre, apellido, empresa, mensaje) {
  const regexLetras = /^[a-zA-Z]+$/;
  const regexNumeros = /^\d+$/;

  if (nombre.trim() !== '' && apellido.trim() !== '' && empresa.trim() !== '' && mensaje.trim() !== '') {
    if (!regexLetras.test(nombre) || !regexLetras.test(apellido) || !regexLetras.test(empresa) || regexNumeros.test(mensaje)) {
      if (!regexLetras.test(nombre)) {
        mostrarError('El campo "Nombre" solo debe contener letras');
      }
      if (!regexLetras.test(apellido)) {
        mostrarError('El campo "Apellido" solo debe contener letras');
      }
      if (!regexLetras.test(empresa)) {
        mostrarError('El campo "Empresa" solo debe contener letras');
      }
      if (regexNumeros.test(mensaje)) {
        mostrarError('El campo "Mensaje" no debe contener solo numeros');
      }
      return false;
    } else {
      ocultarError();
      return true;
    }
  } else {
    mostrarError('Todos los campos son obligatorios');
    return false;
  }
}


function agregarPropuesta(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const email = document.getElementById('email').value;
  const empresa = document.getElementById('empresa').value;
  const sueldo = document.getElementById('sueldo').value;
  const mensaje = document.getElementById('mensaje').value;

  // Compruebo que los campos no esten vacios y no ingresen numeros en los inputs
  if(validarCamposVacios(nombre, apellido, email, empresa, sueldo, mensaje)){
    if(validarText(nombre, apellido, empresa, mensaje)){
      if(sueldo >= 50000){
        if (validarEmail(email)) {  // Compruebo que el email tenga un formato valido y el sueldo sea mayor a 60000
          const tabla = document.getElementById('tabla');
          const nuevaFila = tabla.insertRow(-1); // Inserto una nueva fila al final de la tabla
      
          const celdaNombre = nuevaFila.insertCell(0); // Inserto una nueva celda y le agrego contenido
          celdaNombre.textContent = nombre;
      
          const celdaApellido = nuevaFila.insertCell(1);
          celdaApellido.textContent = apellido;
      
          const celdaEmail = nuevaFila.insertCell(2);
          celdaEmail.textContent = email;
      
          const celdaEmpresa = nuevaFila.insertCell(3);
          celdaEmpresa.textContent = empresa;
      
          const celdaMensaje = nuevaFila.insertCell(4);
          celdaMensaje.textContent = mensaje;
      
          //Sueldo en pesos
          const celdaSueldo = nuevaFila.insertCell(5);
          celdaSueldo.textContent = parseFloat(sueldo) + 'ARG';
      
          //Sueldo en dolar blue
          const sueldoUSD = sueldo / 480;
          const celdaSueldoUSD = nuevaFila.insertCell(6);
          celdaSueldoUSD.textContent = sueldoUSD.toFixed(2) + 'USD';
      
          //Sueldo en euros
          const sueldoEUR = sueldo / 259;
          const celdaSueldoEUR = nuevaFila.insertCell(7);
          celdaSueldoEUR.textContent = sueldoEUR.toFixed(2) + 'EUR';
      
          //Sueldo en bitcoins
          const sueldoBTC = sueldo / 646600;
          const celdaSueldoBTC = nuevaFila.insertCell(8);
          celdaSueldoBTC.textContent = sueldoBTC.toFixed(5) + 'BTC';
      
          resetForm();
        }else if(!validarEmail(email)) {
          let emailInput = document.getElementById('email');
          emailInput.value = '';
        } 
      }else{
        resetForm();
      }
    }
  }
}

function ordenarTabla() {
  let ordenSeleccion = document.getElementById('ordenar');
  let cuerpoTabla = document.getElementById('cuerpoTabla');
  let filas = cuerpoTabla.getElementsByTagName('tr');

  // Convierto las filas en un array para poder utilizar el array sort
  let filasArray = Array.from(filas);

  // Elimino la opcion default asi no pueden volver a seleccionarla
  let optionDefault = ordenSeleccion.querySelector('option[value="default"]');
  if (optionDefault) {
    optionDefault.remove();
  }

  // capturo el valor del section
  let seleccion = ordenSeleccion.value;

  switch (seleccion) {
    case 'default':
      // Por defecto no realiza ningun cambio
      break;

    case 'nombre':
      filasArray.sort(function (a, b) {
        let nombreA = a.cells[0].textContent.toUpperCase();
        let nombreB = b.cells[0].textContent.toUpperCase();
        return nombreA.localeCompare(nombreB);
      });
      break;

    case 'apellido':
      filasArray.sort(function (a, b) {
        let apellidoA = a.cells[1].textContent.toUpperCase();
        let apellidoB = b.cells[1].textContent.toUpperCase();
        return apellidoA.localeCompare(apellidoB);
      });
      break;

    case 'empresa':
      filasArray.sort(function (a, b) {
        let empresaA = a.cells[3].textContent.toUpperCase();
        let empresaB = b.cells[3].textContent.toUpperCase();
        return empresaA.localeCompare(empresaB);
      });
      break;

    case 'sueldodesc':
      filasArray.sort(function (a, b) {
        let sueldoA = parseFloat(a.cells[5].textContent);
        let sueldoB = parseFloat(b.cells[5].textContent);
        return sueldoB - sueldoA;
      });
      break;

    case 'sueldoasc':
      filasArray.sort(function (a, b) {
        let sueldoA = parseFloat(a.cells[5].textContent);
        let sueldoB = parseFloat(b.cells[5].textContent);
        return sueldoA - sueldoB;
      });
      break;
  }

  // Elimino las filas que existen en la tabla
  while (cuerpoTabla.firstChild) {
    cuerpoTabla.removeChild(cuerpoTabla.firstChild);
  }

  // Agrego las filas nuevamente pero ordenadas
  filasArray.forEach(function (fila) {
    cuerpoTabla.appendChild(fila);
  });
}

