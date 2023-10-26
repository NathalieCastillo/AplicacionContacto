const tablaContactos = {};

const objContacto = {
    id: '',
    nombre: '',
    apellido: '',
    telefono: '',
}

let editando = false;

const lista = document.querySelector('#lista');
const nombreInput = document.querySelector('#nombre');
const apellidoInput = document.querySelector('#apellido');
const telefonoInput = document.querySelector('#telefono');
const btnAgregar = document.querySelector('#btnAgregar');

lista.addEventListener('submit', validarLista);

function validarLista(e) {
    e.preventDefault();

    if (nombreInput.value === '' || apellidoInput.value === '' || telefonoInput === '') {
        alert('Todos estos campos son obligatorios');
        return;
    }

    if (editando) {
        editarContacto();
        editando = false;
    } else {
        objContacto.id = Date.now()
        objContacto.nombre = nombreInput.value;
        objContacto.apellido = apellidoInput.value;
        objContacto.telefono = telefonoInput.value;

        agregarContacto();
    }
}

function agregarContacto() {
    const id = objContacto.id;
    tablaContactos[id] = { ...objContacto };

    mostrarContactos();

    lista.reset();

    limpiarObjeto();
}

function limpiarObjeto() {
    objContacto.id = '';
    objContacto.nombre = '';
    objContacto.apellido = '';
    objContacto.telefono = '';
}

function mostrarContactos() {
    limpiarHTML();

    const divContactos = document.querySelector('.div-contactos');

    for (const id in tablaContactos) {
        const contacto = tablaContactos[id];
        const { nombre, apellido, telefono } = contacto;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${apellido} - Teléfono: ${telefono} - `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarContacto(contacto);

        editarBoton.textContent = 'Editar Contacto';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarContacto(id);
        eliminarBoton.textContent = 'Eliminar Contacto';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divContactos.appendChild(parrafo);
        divContactos.appendChild(hr);
    }
}

function cargarContacto(contacto) {
    const id = contacto.id;
    nombreInput.value = contacto.nombre;
    apellidoInput.value = contacto.apellido;
    telefonoInput.value = contacto.telefono;

    objContacto.id = id;

    lista.querySelector('button[type="submit"]').textContent = 'Actualizar Contacto';

    editando = true;
}

function editarContacto() {
    const id = objContacto.id;
    tablaContactos[id].nombre = nombreInput.value;
    tablaContactos[id].apellido = apellidoInput.value;
    tablaContactos[id].telefono = telefonoInput.value;

    limpiarHTML();
    mostrarContactos();

    lista.reset();

    lista.querySelector('button[type="submit"]').textContent = 'Agregar Contacto';

    editando = false;
}

function eliminarContacto(id) {
    if (id in tablaContactos) {
        delete tablaContactos[id];
    }

    limpiarHTML();
    mostrarContactos();
}

function limpiarHTML() {
    const divContactos = document.querySelector('.div-contactos');

    while (divContactos.firstChild) {
        divContactos.removeChild(divContactos.firstChild);
    }
}