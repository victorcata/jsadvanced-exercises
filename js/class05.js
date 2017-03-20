/*
1 - (Usando Constructores). Vamos a instalar un sistema acuapónico en una granja. Nuestro primer paso será definir el equipamiento. Necesitaremos al menos dos constructores. Uno para el tanque de los peces y otro para la cama (recipiente para vegetales).
  Características Tanque:
  capacidad: 40 Litros
  dimensiones: 51 cm x 25.5 de ancho x 30.5 de alto
  color: Gris Claro
  Nivel agua Máximo: 29 cm
  Características Cama:
  capacidad: 10 Litros
  dimensiones: 51 cm x 25.5 de ancho x 10 de alto
  color: Rojo
  Nivel agua Máximo: 5 cm
  Sustrato: Piedra volcánica
  Nota: No usar herencia
2 - El siguiente paso en nuestra fabrica será añadir los métodos y propiedades que nos permitan añadir y controlar el agua
  Características del sistema:
  Métodos para añadir y quitar agua, incluyendo los litros deseados.
  Comprobación del nivel agua para evitar desbordamientos.
  En caso de desbordamiento debe activarse el desagüe para eliminar el exceso de agua.
3 - Con el sistema ya instalado... y todo el entorno acuático funcionando. Es hora de incluir los métodos para controlar a nuestros peces y plantas.
  En el constructor de Camas:
  Añadir un nuevo método para agregar peces que permita definir nombre y clase
  Agregar un nuevo método para retirar peces (sin perderlos)
  En el constructor de Tanques:
  Añadir un nuevo método para agregar plantas que permita definir nombre y clase
  Agregar un nuevo método para retirar plantas (sin perderlas)
4 - Con todo el sistema en funcionamiento es hora de realizar mediciones para garantizar el correcto desarrollo. Necesitamos mejorar el método de agregar agua para poder incluir como parámetros opcionales las propiedades del agua.
  Propiedades del agua:
  Nitratos(NO3 mg/l)
  Nitritos (NO2 mg/l)
  Dureza Sales (GH)
  Carbonatos (KH)
  Ph (Ph)
  Cloro (CL2 mg/l)
  Ademas... queremos saber el estados de cada tanque y cama usando un método que nos facilite toda la información por consola. Incluyendo:
  Estado del agua incluyendo cantidad y parámetros
  total de peces y total por tipo (solo en tanques)
  total de hortalizas y total por tipo (solo en camas)
  Nota: For... in te resultará de gran utilidad.
  Ejemplo Cama
*/
/**
 * Tank constructor
 */
function Tank () {
    var _features = {
        capacity: 40,
        dimensions: {
            depth: 51,
            width: 25.5,
            hight: 30.5
        },
        color: 'lightgrey',
        maxLevel: 29,
        parameters: {
            nitratos: {
                value: null,
                desc: 'Nitratos (NO3)',
                unit: 'mg/l'
            },
            nitritos: {
                value: null,
                desc: 'Nitritos (NO2)',
                unit: 'mg/l'
            },
            dureza: {
                value: null,
                desc: 'Dureza de sales (GH)',
                unit: 'ºd'
            },
            carbonatos: {
                value: null,
                desc: 'Carbonatos (KH)',
                unit: 'ºd'
            },
            ph: {
                value: null,
                desc: 'Ph (PH):',
                unit: ''
            },
            clor: {
                value: null,
                desc: 'Cloro (CL2)',
                unit: 'mg/l'
            }
        }
    },
    _water = 0,
    _plant = [],
    _quarentine = [];

    /**
     * Check if needs to drain
     */
    function _checkOverflow() {
        if (_water > _features.capacity) _drain();
    }

    /**
     * Drains the water
     */
    function _drain() {
        var toDrain = _water - _features.capacity;
        console.log('Draining ' + toDrain + 'l ...');
    }

    /**
     * Set the parameters of the water
     */
    function _setParams(params) {
        for (var prop in params) {
            _features.parameters[prop].value = params[prop] || null;
        }
    }

    /**
    * Adds water to the tank
    */
    this.addWater = function(liter, params) {
        _water += liter;
        _checkOverflow();
        _setParams(params);
    }

    /**
     * Draws water from the tanks
     */
    this.drawWater = function(liter) {
        _water -= liter;
        if (_water < 0) _water = 0;
    }

    /**
     * Add a new plant to the tank
     * @param {string} name Name of the plant
     * @param {string} type Type of the plant
     */
    this.addPlant = function(name, type) {
        _plant.push({
            name: name,
            type: type
        });
    }

    /**
     * Remove a plant from the tank
     * @param {string} name Name of the plant to remove
     */
    this.removePlant = function(name) {
        var index = _plant.findIndex(function(item){
           return item.name === name;
        });

        if (index === -1) {
            console.log('Fish not found!');
        } else {
            var plantOut = _plant.splice(index, 1);
            _quarentine.push(plantOut);
        }
    }

    /**
     * Returns the status of the tank
     */
    this.getStatus = function() {
        console.log('================================');
        console.log('Estado del Agua (Tanque principal)');
        console.log('================================');
        console.log('Agua disponible: %d/%dl', _water, _features.capacity);
        for (var i in _features.parameters) {
            if (_features.parameters[i].value !== null) {
                console.log('%s: %d %s', _features.parameters[i].desc, _features.parameters[i].value, _features.parameters[i].unit);
            }
        }
        console.log('================================');
        console.log('Estado de las Plantas');
        console.log('================================');
        console.log('Total de hortalizas %d', _plant.length);
    }
}

/**
 * Bed constructor
 */
function Bed () {
    var _features = {
            capacity: 10,
            dimensions: {
                depth: 51,
                width: 25.5,
                hight: 30.5
            },
            color: 'red',
            maxLevel: '5',
            substratum: 'volcanic stone',
            parameters: {
                nitratos: {
                    value: null,
                    desc: 'Nitratos (NO3)',
                    unit: 'mg/l'
                },
                nitritos: {
                    value: null,
                    desc: 'Nitritos (NO2)',
                    unit: 'mg/l'
                },
                dureza: {
                    value: null,
                    desc: 'Dureza de sales (GH)',
                    unit: 'ºd'
                },
                carbonatos: {
                    value: null,
                    desc: 'Carbonatos (KH)',
                    unit: 'ºd'
                },
                ph: {
                    value: null,
                    desc: 'Ph (PH):',
                    unit: ''
                },
                clor: {
                    value: null,
                    desc: 'Cloro (CL2)',
                    unit: 'mg/l'
                }
            }
        },
    _fish = [],
    _quarentine = [];

    /**
     * Add a new fish to the bed
     * @param {string} name Name of the fish
     * @param {string} type Type of the fish
     */
    this.addFish = function(name, type) {
        _fish.push({
            name: name,
            type: type
        });
    }

    /**
     * Remove a fish from the bed
     * @param {string} name Name of the fish to remove
     */
    this.removeFish = function(name) {
        var index = _fish.findIndex(function(item){
           return item.name === name;
        });

        if (index === -1) {
            console.log('Fish not found!');
        } else {
            var fishOut = _fish.splice(index, 1);
            _quarentine.push(fishOut);
        }
    }

    /**
     * Returns the status of the tank
     */
    this.getStatus = function() {
        console.log('================================');
        console.log('Estado del Agua (Tanque principal)');
        console.log('================================');
        console.log('Agua disponible: %d/%dl', _water, _features.capacity);
        for (var i in _features.parameters) {
            console.log('%s: %d %s', _features.parameters[i].desc, _features.parameters[i].value, _features.parameters[i].unit);
        }
        console.log('================================');
        console.log('Estado de las Peces');
        console.log('================================');
        console.log('Total de agua fria %d', _fish.length);
        console.log('Total en cuarentena %d', _quarentine.length);
    }
}

var tanque = new Tank(),
    bed = new Bed();

tanque.addWater(30, { nitratos: 20, nitritos: 10 });