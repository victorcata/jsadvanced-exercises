/**
 * 1 - Crea un nuevo formulario que nos permita registrarnos en Firebase.
 *     Objetivos:
 *      Comprobar si ese mismo usuario ya esta registrado (Email como ID), para evitar multiples inscripciones.
 *      Incluiremos en la página los usuarios que se van sumando.
 * 2 - Partiendo del ejercicio anterior... realizaremos un nuevo formulario que nos permita registrarnos usando nuestra cuenta de Github.
 *     Objetivos Opcionales:
 *      Subir los datos proporcionados por Github a nuestra base de datos.
 *      Incluir parte de los datos como el avatar y el nombre del usuario en el html
 */
firebase.initializeApp(config);
var ref = firebase.database().ref();

document.getElementById('register').addEventListener('submit', registerUser);

function getUser(){
    var form = document.getElementById('register');
    return {
        email: form.email.value,
        name: form.name.value,
        lastname: form.lastname.value,
        password: form.password.value
    };
}

function registerUser(){
    window.event.preventDefault();
    var user = getUser();
    var usersRef = ref.child('users');

    var query = usersRef.orderByChild('email').equalTo(user.email).once('value', function(snapshot){
        if (snapshot.numChildren() > 0) {
            alert('Ya existe');
        } else {
            usersRef.push(user);
            document.getElementById('register').reset();
        }
    });

}

ref.on('child_added', function(snapshot){
    console.log(snapshot.val());
}, function(error){
    console.log('Error: ' + error);
});