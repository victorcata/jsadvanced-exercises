/**
 * 1 - Imprimimos por consola el estado de cada tren en movimiento de manera individualizada... usando while.
 */
(function() {
    var activeTrains = 3,
        totalTrains = 12;

    var cont = 1;
    while (cont < totalTrains) {
        var msg = (cont <= activeTrains) ? "funcionando" : "parado";
        console.log("El tren " + cont + " está " + msg);
        cont++;
    }
});

/**
 * 2 - Imprimimos por consola el estado de cada tren en movimiento de manera individualizada... usando Do... While.
 */
(function() {
    var activeTrains = 3,
        totalTrains = 12;

    var cont = 1;
    do {
        var msg = (cont <= activeTrains) ? "funcionando" : "parado";
        console.log("El tren " + cont + " está " + msg);
        cont++;
    } while (cont <= totalTrains)
});

/**
 * 3 - Imprimimos por consola el estado de cada tren en movimiento de manera individualizada... usando for.
 */
(function() {
    var activeTrains = 3,
        totalTrains = 12;

    for (var i = 1; i <= totalTrains; i++) {
        var msg = (i <= activeTrains) ? "funcionando" : "parado";
        console.log("El tren " + i + " está " + msg);
    }
});

/**
 * 4 - Servicio nocturno en el tren 10. Nota: Frente al ejercicio anterior, en este caso queremos que siempre que hablemos
 *     del tren 10 se especifique que es nocturno. Independientemente de si esta parado o funcionando.
 */
(function() {
    var activeTrains = 3,
        totalTrains = 12;

    for (var i = 1; i <= totalTrains; i++) {
        var msg = (i <= activeTrains) ? "funcionando" : "parado";
        if (i == 10) msg += " - Tren Nocturno";
        console.log("El tren " + i + " está " + msg);
    }
});

/**
 * 5 - ¿Y si todos los trenes están en las vías funcionando o por el contrario si ninguno de los trenes esta funcionando?.
 */
(function() {
    var activeTrains = 3,
        totalTrains = 12;

    activeTrains = parseInt(prompt('Número de trenes activo?'));
    if (activeTrains === totalTrains) console.log('Atención: Todos los trenes están funcionando!');
    else if (activeTrains === 0) console.log('Atención: Todavia no hay trenes funcionando');
    else {
        for (var i = 1; i <= totalTrains; i++) {
            var msg = (i <= activeTrains) ? "funcionando" : "parado";
            if (i == 10) msg += " - Tren Nocturno";
            console.log("El tren " + i + " está " + msg);
        }
    }
});

/**
 * 6 - El servicio nocturno se queda un poco corto y necesitamos añadir un nuevo tren de refuerzo. El 12 será destinado a cubrir esta necesidad, 
 *     exactamente igual que el 10 anteriormente.
 */
(function() {
    var totalTrains = 12;

    var activeTrains = parseInt(prompt('Número de trenes activo?'));
    if (activeTrains === totalTrains) console.log('Atención: Todos los trenes están funcionando!');
    else if (activeTrains === 0) console.log('Atención: Todavia no hay trenes funcionando');
    else {
        for (var i = 1; i <= totalTrains; i++) {
            var msg = (i <= activeTrains) ? "funcionando" : "parado";
            if (i == 10 || i == 12) msg += " - Tren Nocturno";
            console.log("El tren " + i + " está " + msg);
        }
    }
});

/**
 * 7 - El departamento de Marketing ha decidido lanzar un nuevo servicio los sábados. El "tren fiestero" será un tren adaptado a un público más intrépido y 
 *     funcionará solo en los sábados. Este tren será el número 13. NOTA: EL TREN 13 SOLO FUNCIONA LOS SÁBADOS. Es necesario incluir el día de la semana en tu código
 */
(function() {
    var activeTrains = 3,
        totalTrains = 12;

    function trainsState() {
        var dayOfWeek = (new Date()).getDay();

        if (dayOfWeek === 6 && totalTrains < 13) totalTrains = 13;

        activeTrains = parseInt(prompt('Número de trenes activo?'));

        if (activeTrains === totalTrains) {
            console.log('Atención: Todos los trenes están funcionando!');
        }
        else if (activeTrains === 0) {
            console.log('Atención: Todavia no hay trenes funcionando');
        }
        else {
            for (var i = 1; i <= totalTrains; i++) {
                var msg = (i <= activeTrains) ? "funcionando" : "parado";
                if (i == 10 || i == 12) msg += " - Tren Nocturno";
                if (i == 13 && dayOfWeek === 6) msg += " - Tren Fiestero";
                console.log("El tren " + i + " está " + msg);
            }
        }
    }

    trainsState();
});