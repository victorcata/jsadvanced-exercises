/**
 * 1 - Crear una libreta de contactos para guardar nombre y numero de telefono usando LocalStorage
 *      Objetivos:
 *        Guardar Nombre y telefono
 *        Mostrar todos los contactos en el html
 *        Botón para borrar un contacto específico
 *        Botón para borrar todos los contactos
 *        Botón para recuperar el telefono de un contacto
 */


/**
 * 2 - Crea una libreta de contactos para guardar multiples datos.
 *      Objetivos:
 *        Guardar Nombre, telefono y email
 *        Mostrar todos los contactos en el html
 *        Botón para borrar un contacto específico
 *        Botón para borrar todos los contactos
 *        Botón para recuperar el telefono y email de un contacto
 */
var contactContainer = document.getElementsByClassName('contacts')[0],
    contactActionsHTML = '<button onclick="removeContact.call(this);">Eliminar</button><button onclick="showData.call(this);">Ver datos</button>',
    avatar = 'https://api.adorable.io/avatars/86/<email>.io.png';

function loadContacts() {
    contactContainer.innerHTML = '';
    for (var key in localStorage) {
        addContactToList(key);
    }
}

function addContactToList(name) {
    var contact = '<li>';
    contact += '<span>' + name + '</span>';
    contact += contactActionsHTML;
    contact += '</li>';
    contactContainer.innerHTML += contact;
}

function saveContact() {
    window.event.preventDefault();
    
    var name = document.getElementById('name').value,
        phone = document.getElementById('phone').value,
        email = document.getElementById('email').value;
    var data = JSON.stringify({ phone: phone, email: email});
    
    if (localStorage.getItem(name) !== null) {
        localStorage.removeItem(name);
        localStorage.setItem(name, data);
    } else {
        localStorage.setItem(name, data);
        addContactToList(name);
    }
}

function removeAllContacts() {
    localStorage.clear();
    contactContainer.innerHTML = '';   
}

function showData() {
    var name = this.parentElement.querySelector('span').innerText;
    var value = JSON.parse(localStorage.getItem(name));
    alert('Phone: ' + value.phone + ' Email: ' + value.email);
}

function removeContact() {
    var name = this.parentElement.querySelector('span').innerText;
    localStorage.removeItem(name);
    loadContacts();
}

document.getElementsByTagName('form')[0].addEventListener('submit', saveContact, false);
document.getElementById('clear').addEventListener('click', removeAllContacts, false);

loadContacts();