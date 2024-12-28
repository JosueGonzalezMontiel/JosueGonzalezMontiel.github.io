async function procesarImagen(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append('archivo', archivo);

    try {
        const response = await fetch('https://final-api-p6mw.onrender.com/enviardatos_cliente/', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const datosCliente = await response.json();
            llenarFormularioConDatos(datosCliente);
        } else {
            const error = await response.json();
            alert(`Error: ${error.detail}`);
        }
    } catch (error) {
        console.error('Error al procesar la imagen:', error);
        alert('Error al procesar la imagen. Por favor, inténtelo de nuevo.');
    }
}

function llenarFormularioConDatos(datos) {
    if (datos.nombre) document.getElementById('nombre').value = datos.nombre;
    if (datos.direccion) document.getElementById('dirección').value = datos.direccion;
    if (datos.colonia) document.getElementById('colonia').value = datos.colonia;
    if (datos.estado) document.getElementById('estado').value = datos.estado;
    if (datos.cp) document.getElementById('cp').value = datos.cp;
    if (datos.pais) document.getElementById('pais').value = datos.pais;
}



function obtenerClientes() {
    fetch('https://final-api-p6mw.onrender.com/clientes/')
        .then(response => response.json())
        .then(data => {
            const listaClientes = document.getElementById('listaClientes');
            listaClientes.innerHTML = '<option selected disabled>Seleccione un cliente</option>';
            data.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.numero;
                option.text = cliente.nombre;
                option.dataset.cliente = JSON.stringify(cliente);
                listaClientes.appendChild(option);
            });
        })
        .catch(error => {
            document.getElementById('listaClientes').innerHTML = '<option>Error al cargar clientes</option>';
        });
}

function llenarFormularioCliente() {
    const seleccionado = document.getElementById('listaClientes').selectedOptions[0];
    const cliente = JSON.parse(seleccionado.dataset.cliente);
    const formulario = document.getElementById('formularioCliente');
    formulario.innerHTML = '';
    Object.keys(cliente).forEach(key => {
        const label = document.createElement('label');
        label.textContent = key + ': ';
        label.classList.add('form-label');
        const input = document.createElement('input');
        input.type = 'text';
        input.name = key;
        input.value = cliente[key];
        input.classList.add('form-control');
        input.placeholder = `Ingrese ${key}`;
        formulario.appendChild(label);
        formulario.appendChild(input);
        formulario.appendChild(document.createElement('br'));
    });
}

function enviarDatosCliente(event) {
    event.preventDefault();
    const formulario = document.getElementById('formularioCliente');
    const datos = {};
    new FormData(formulario).forEach((value, key) => { datos[key] = value; });
    console.log('Datos enviados:', datos);
    fetch('https://final-api-p6mw.onrender.com/agregar_cliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Cliente enviado exitosamente');
    })
    .catch(error => {
        console.error('Error al enviar los datos del cliente:', error);
        alert('Error al enviar los datos del cliente');
    });
}
function actualizarDatosCliente() {
    const formulario = document.getElementById('formularioCliente');
    const datos = {};
    new FormData(formulario).forEach((value, key) => { datos[key] = value; });
    const nombre = datos['nombre']; // Asume que 'numero' es un identificador único
    fetch(`https://final-api-p6mw.onrender.com/clientes/${nombre}`, {method: 'PUT',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al actualizar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Datos actualizados correctamente';
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
}
function eliminarCliente() {
    const formulario = document.getElementById('formularioCliente');
    const datos = {};
    new FormData(formulario).forEach((value, key) => { datos[key] = value; });
    const numero = datos['numero']; // Asume que 'numero' es un identificador único
    fetch(`https://final-api-p6mw.onrender.com/clientes/${numero}`, {method: 'DELETE',
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al eliminar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Cliente eliminado correctamente';
            obtenerClientes(); // Actualizar lista de clientes
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
}
// Funciones para Autos (deben ser implementadas de manera similar a las de clientes)
function obtenerAutos() {
    fetch('https://final-api-p6mw.onrender.com/auto1/')
        .then(response => response.json())
        .then(data => {
            const listaAutos = document.getElementById('listaAutos');
            listaAutos.innerHTML = '<option selected disabled>Seleccione un auto</option>';
            data.forEach(auto => {
                const option = document.createElement('option');
                option.value = auto.referencia; // Asume que 'referencia' es un identificador único
                option.text = `${auto.auto} - ${auto.modelo}`; // Muestra marca y modelo
                option.dataset.auto = JSON.stringify(auto);
                listaAutos.appendChild(option);
            });
        })  
        .catch(error => {
            document.getElementById('listaAutos').innerHTML = '<option>Error al cargar autos</option>';
        });
}

function llenarFormularioAuto() {
    const seleccionado = document.getElementById('listaAutos').selectedOptions[0];
    const auto = JSON.parse(seleccionado.dataset.auto);
    const formulario = document.getElementById('formularioAuto');
    formulario.innerHTML = ''; // Limpiar formulario anterior

    Object.keys(auto).forEach(key => {
        const label = document.createElement('label');
        label.textContent = key + ': ';
        label.classList.add('form-label');
        const input = document.createElement('input');
        input.type = 'text';
        input.name = key;
        input.value = auto[key];
        input.classList.add('form-control');
        input.placeholder = `Ingrese ${key}`;

        // Añadir elementos al formulario
        formulario.appendChild(label);
        formulario.appendChild(input);
        formulario.appendChild(document.createElement('br'));
    });
}


function enviarDatosAuto() {
    const formulario = document.getElementById('formularioAuto');
    const datos = {};
    new FormData(formulario).forEach((value, key) => { datos[key] = value; });
    fetch('https://final-api-p6mw.onrender.com/auto', {method: 'POST',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al enviar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Datos de auto enviados correctamente';
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
}

function actualizarDatosAuto() {
    const formulario = document.getElementById('formularioAuto');
    const datos = {};
    new FormData(formulario).forEach((value, key) => { datos[key] = value; });
    const referencia = datos['referencia']; // Asume que 'referencia' es un identificador único
    fetch(`https://final-api-p6mw.onrender.com/auto/${referencia}`, {method: 'PUT',
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al actualizar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Datos de auto actualizados correctamente';
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
}

function eliminarAuto() {
    const seleccionado = document.getElementById('listaAutos').selectedOptions[0];
    const referencia = JSON.parse(seleccionado.dataset.auto).referencia; // Asume que 'referencia' es un identificador único
    fetch(`https://final-api-p6mw.onrender.com/auto/${referencia}`, {method: 'DELETE',
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al eliminar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Auto eliminado correctamente';
            obtenerAutos(); // Actualizar lista de autos
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
}





function obtenerFacturas() {
    fetch('https://final-api-p6mw.onrender.com/factura/')
        .then(response => response.json())
        .then(data => {
            const listaFacturas = document.getElementById('listaFacturas');
            listaFacturas.innerHTML = '<option selected disabled>Seleccione una factura</option>';
            data.forEach(factura => {
                const option = document.createElement('option');
                option.value = factura.id_factura;
                option.text = factura.auto + ' - ' + factura.fecha;
                option.dataset.factura = JSON.stringify(factura);
                listaFacturas.appendChild(option);
            });
        })
        .catch(error => {
            document.getElementById('listaFacturas').innerHTML = '<option>Error al cargar facturas</option>';
        });
}

function llenarFormularioFactura() {
    const seleccionado = document.getElementById('listaFacturas').selectedOptions[0];
    if (seleccionado && seleccionado.dataset.factura) {
        const factura = JSON.parse(seleccionado.dataset.factura);
        Object.keys(factura).forEach(key => {
            if (document.getElementById(key)) {
                document.getElementById(key).value = factura[key] || '';
            }
        });
    } else {
        // Opcionalmente limpia todos los campos si no hay factura seleccionada
        document.getElementById('formularioFactura').reset();
    }
}

function enviarDatosFactura() {
    const formulario = document.getElementById('formularioFactura');
    const datos = {};
    new FormData(formulario).forEach((value, key) => { datos[key] = value; });
    fetch('https://final-api-p6mw.onrender.com/factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al enviar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Datos de factura enviados correctamente';
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
}

function generarFactura() {
    const formulario = document.getElementById('formularioFactura');
    const datos = {};
    new FormData(formulario).forEach((value, key) => { datos[key] = value; });

    fetch('https://final-api-p6mw.onrender.com/generar_factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) throw new Error('Fallo al generar la factura');
        return response.blob();
    })
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'factura_generada.docx';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.getElementById('resultado').innerHTML = 'Factura generada exitosamente. Descarga iniciada.';
    })
    .catch(error => {
        document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
    });
}

function actualizarDatosFactura() {
    const formulario = document.getElementById('formularioFactura');
    const datos = Object.fromEntries(new FormData(formulario));

    new FormData(formulario).forEach((value, key) => { datos[key] = value; });
    const factura_id = datos['id_factura'];
    fetch(`https://final-api-p6mw.onrender.com/factura/${factura_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(formulario)))
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al actualizar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Datos de factura actualizados correctamente';
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
}

function eliminarFactura() {
    const seleccionado = document.getElementById('listaFacturas').selectedOptions[0];
    const factura_id = JSON.parse(seleccionado.dataset.factura).id_factura;
    fetch(`https://final-api-p6mw.onrender.com/factura/${factura_id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            if (!response.ok) throw new Error('Fallo al eliminar datos');
            return response.json();
        })
        .then(result => {
            document.getElementById('resultado').innerHTML = 'Factura eliminada correctamente';
            obtenerFacturas(); // Refresh invoice list
        })
        .catch(error => {
            document.getElementById('resultado').innerHTML = 'Error: ' + error.message;
        });
    

}