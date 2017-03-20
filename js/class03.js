/**
 * 8 - Hagamos una lista de pasajeros efectiva usando Arrays e imprimamos cada pasajero de la lista y su número de asiento (basado en el orden del índice). 
 *     Nota: El primer asiento del tren es el 1 y no el 0.
 */
(function() {
    var passengers = [],
        names = ['Victor', 'Jose', 'Antonio', 'Ramon', 'Juan', 'Lorena', 'Elena', 'Maria', 'Antonia', 'Marta'],
        lastNames = ['Catalina', 'Rodriguez', 'Fernandez', 'Gomez', 'Alcantara', 'Smith', 'Henderson', 'Manso', 'Ruiz', 'Frias'];

    /**
     * Returns a random name
     */
    function getName(){
        return names[Math.floor(Math.random() * names.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    }

    /**
     * Add passengers to the array 
     */
    function setPassengers(count) {
        for (var i = 0; i < count; i++) {
            passengers.push(getName());
        }
    }

    /**
    * Print the passengers and their seats in the console
    */
    function printPassengers() {
        console.group('Passenger seats');
        for (var i = 0; i < passengers.length; i++) {
            console.info('El pasajero %s tiene reservado el asiento %d', passengers[i], i + 1);
        }
        console.groupEnd();
    }

    setPassengers(6);
    printPassengers();
});

/**
 * 9 - Necesitamos una función para agregar y otra para borrar pasajeros de la lista. Nota: Pensemos que a la larga pueden existir más listas.
 */
(function() {
    var passengers = [],
        names = ['Victor', 'Jose', 'Antonio', 'Ramon', 'Juan', 'Lorena', 'Elena', 'Maria', 'Antonia', 'Marta'],
        lastNames = ['Catalina', 'Rodriguez', 'Fernandez', 'Gomez', 'Alcantara', 'Smith', 'Henderson', 'Manso', 'Ruiz', 'Frias'],
        numPassengers = 6;
    
    /**
     * Returns a random name
     * @return {string} Random name 
     */
    function getName(){
        return names[Math.floor(Math.random() * names.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    }
    
    /**
     * Add passengers to the array 
     * @param {number} count Number minimum of the passengers
     */
    (function setPassengers(count) {
        for (var i = 0; i < count; i++) {
            passengers.push(getName());
        }
    })(numPassengers);
    
    /**
    * Print the passengers and their seats in the console
    */
    function printPassengers() {
        console.group('Passenger seats');
        for (var i = 0; i < passengers.length; i++) {
            console.info('El pasajero %s tiene reservado el asiento %d', passengers[i], i + 1);
        }
        console.groupEnd();
    }
    
    /**
     * Add passengers to the array
     * @param {string} name Name of the passenger (optional)
     */
    function addPassenger(name){
        passengers.push(name || getName());
    }
    
    /**
     * Remove a passenger from the list
     */
    function removePassenger(name) {
        var index = passengers.indexOf(name);
        if (index > -1) {
            passengers.splice(index, 1);
        }
    }
    
    return {
        print: printPassengers,
        addPassenger: addPassenger,
        removePassenger: removePassenger
    }
});

/**
 * 10 - La compañía de trenes ha decidido que los viajeros podrán reservar el asiento asignado, pero quiere evitar que los pasajeros cambien de 
 *      asiento constantemente cuando se anula un o varios billetes.
 *      Nota: Al borrar en el ejercicio anterior las posiciones de los pasajeros cambiaban y los billetes quedaban desactualizados.
 */
(function() {
    var passengers = [],
        seatsAvailables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        names = ['Victor', 'Jose', 'Antonio', 'Ramon', 'Juan', 'Lorena', 'Elena', 'Maria', 'Antonia', 'Marta'],
        lastNames = ['Catalina', 'Rodriguez', 'Fernandez', 'Gomez', 'Alcantara', 'Smith', 'Henderson', 'Manso', 'Ruiz', 'Frias'],
        numPassengers = 6;
    
    /**
     * Returns a random name
     * @return {string} Random name 
     */
    function getName(){
        return names[Math.floor(Math.random() * names.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    }
    
    /**
     * Asign a seat to a passenger
     * @return {number} Seat number
     */
    function getRandomSeat(){
        var seat = seatsAvailables[Math.floor(Math.random() * seatsAvailables.length)];
        seatsAvailables.splice(seatsAvailables.indexOf(seat), 1);
        
        return seat;
    }
    
    /**
     * Add passengers to the array 
     * @param {number} count Number minimum of the passengers
     */
    (function setPassengers(count) {
        for (var i = 0; i < count; i++) {
            passengers.push({
                name: getName(),
                seat: getRandomSeat()
            });
        }
    })(numPassengers);
    
    /**
    * Print the passengers and their seats in the console
    */
    function printPassengers() {
        console.group('Passenger seats');
        for (var i = 0; i < passengers.length; i++) {
            console.info('El pasajero %s tiene reservado el asiento %d', passengers[i].name, passengers[i].seat);
        }
        console.groupEnd();
    }
    
    /**
     * Add passengers to the array
     * @param {string} name Name of the passenger
     * @param {string} seat Seat number
     */
    function addPassenger(name, seat){
        var index = seatsAvailables.indexOf(seat);
        if (index === -1) {
            console.warn('El asiento está reservado');
            return;
        }
        
        seatsAvailables.splice(index, 1);
        
        passengers.push({
            name: name || getName(),
            seat: seat || getRandomSeat()
        });
    }
    
    /**
     * Remove a passenger from the list
     * @param {string} name Name of the passenger to eliminate from the array
     */
    function removePassenger(name) {
        if (name === undefined) {
            console.info('Por favor indica un nombre de pasajero');
            return;
        }
        
        var found = false,
            count = 0;
            
        do {
            found = passengers[count].name === name;
            count++;
        } while(!found || count - 1 > passengers.length);
        
        if (!found) {
            console.warn('Ese pasajeron no está en la lista');
            return;
        }
        
        seatsAvailables.push(passengers[count - 1].seat);
        passengers.splice(count - 1, 1);
    }
    
    /**
     * Shows the available seats
     */
    function showAvailableSeats(){
        return seatsAvailables.join('-');
    }
    
    return {
        print: printPassengers,
        addPassenger: addPassenger,
        removePassenger: removePassenger,
        showSeat: showAvailableSeats
    };
});