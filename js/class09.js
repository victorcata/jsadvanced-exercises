var app = app || {};

app.ajax = function(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(JSON.parse(xmlHttp.responseText));
        }
    }
    xmlHttp.open('GET', url, true);
    xmlHttp.send();
}

/**
 * 1 - Sacar en el html la respuesta de OMDB para la pelicula Hackers
 */
(function(){
    var movie = 'Hackers',
        url = 'http://www.omdbapi.com/?t=' + movie;
    
    /**
     * Print the output in the document
     */
    function showData(data) {
        document.body.innerHTML = '';
        for (var prop in data) {
            document.body.innerHTML += '<div><strong>' + prop + ': </strong><span>' + data[prop] + '</span></div>';
        }
    }
    
    app.ajax(url, showData);
});

/**
 * 2 - Sacar en el html el tiempo meteorológico de Madrid, Barcelona y Valencia. 
 *     Nota: http://openweathermap.org te será de gran ayuda, busca la solución al error 401
 */
(function(){
    var cities = ['Madrid', 'Barcelona', 'Valencia'],
        country = 'Spain',
        apiKey = '&APPID=<APIKEY>',
        url = 'http://api.openweathermap.org/data/2.5/weather?q=';
        
    document.body.innerHTML = '';
    cities.forEach(function(city){
       app.ajax(url + city + apiKey, showData);
    });
    
    /**
     * Print the output in the document
     */
    function showData(data) {
        document.body.innerHTML += '<h1>' + data.name + '</h1>';
        document.body.innerHTML += '<p>' + data.weather[0].description + '</p>';
    }
});

/**
 *  3 - Crea una web que nos permita ver los detalles almacenados en IMBD de una pelicula partiendo únicamente del título Recursos:
 */
(function(){
    var url = 'http://www.omdbapi.com/?t=';
    
    /**
     * Create the form
     */
    function createForm() {
        document.body.innerHTML = '<div><h1>Search a movie</h1><input type="text" id="search" placeholder="Movie name..."/><div id="output"></div></div>';
    }
    
    /**
     * Search de movie
     */
    function searchMovie(event) {
       if (event.keyCode !== 13) return;
        
       app.ajax(url + this.value, showData);
    }
    
    /**
     * Print the data in the document
     */
    function showData(data) {
        document.getElementById('output').innerHTML = '';
        for (var prop in data) {
            document.getElementById('output').innerHTML += '<div><strong>' + prop + ': </strong><span>' + data[prop] + '</span></div>';
        }
    }
    
    createForm();
    document.getElementById('search').addEventListener('keyup', searchMovie, false);
});