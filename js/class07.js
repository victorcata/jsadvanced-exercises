/**
 * 1 - Reorganizar la lista de profesores de Fictizia por nombre y apellidos (alfabético)
 */
(function(){
    var nodesArray = Array.prototype.slice.call(document.querySelectorAll('#teachersList > li'));

    var sorted = nodesArray.sort(function sort(a, b) {
        return a.querySelector('.teacherPhoto img').alt.localeCompare(b.querySelector('.teacherPhoto img').alt);
    });

    var container = document.getElementById('teachersList');
    container.innerHTML ='';
    sorted.forEach(function(item){
        container.appendChild(item);
    });
});

/**
 * 2 - Saca una lista de los cursos disponibles en Fictizia en las 4 areas de formación y conviertelo en Markdown. Características:
 *     Cada Bloque de cursos debe estar identificado por el título correspondiente.
 *     Cada curso debe contener el enlace al mismo y especificar el número de horas entre parentesis.
 */
(function(){
    console.log('# Cursos de Fictizia');
    var areas = document.getElementById('areas').children;
    Array.prototype.forEach.call(areas, function(area){
        var title = areas[0].getElementsByTagName('h2')[0].innerText.trim(),
            courses = area.querySelectorAll('li');
        console.log('## Cursos de %s', title);
        console.log('** Total de cursos: %d**', courses.length);
        Array.prototype.forEach.call(courses, function(item) {
            var name = item.getElementsByTagName('strong')[0].innerText.trim(),
                hours = item.getElementsByClassName('contextualInfo')[0].innerText.trim().replace (/[^\d.]/g, ''),
                link = item.getElementsByTagName('a')[0].href;
            console.log('- [%s (%s horas)](%s)', name, hours, link);
        });
    });
});

/**
 * 3 - Hagamos la web del Metro más divertida.
 *     Saca el estado actual de todas las líneas del metro de Madrid por consola.
 */
(function(){
    Array.prototype.forEach.call(document.getElementsByClassName('bloquet'), function(line){
        var state = line.getElementsByClassName('circulacion')[0];
        if (state !== undefined) {
            console.log(state.innerText);
        }
    });
});

/**
 * 4 - Diseña un script que sustituya todas las imágenes de las entradas de Tecnología del Mundo Today por imágenes dummy de gatitos.
 */
(function(){
    Array.prototype.forEach.call(document.querySelectorAll('[class^="entry-thumb"]'), function(thumb){
        thumb.src = 'http://placekitten.com/g/' + thumb.width + '/' + thumb.height;
    });
});

/**
 * 5 - Diseña un script que agrupe todos los titulares, sus autores y categorias dentro de Genbeta:dev y luego vacíe el html
 *     para cargar una lista hecha por nosotros con la información previamente recolectada.
 */
(function(){
    var container = document.createElement('div');
    Array.prototype.forEach.call(document.getElementsByClassName('article'), function(article){
        var category = article.getElementsByClassName('article-category')[0];
        if (category !== undefined){
            container.appendChild(category.cloneNode(true));
        }
        var title = article.getElementsByTagName('h2')[0];
        if (title !== undefined){
            container.appendChild(title.cloneNode(true));
        }
        var author = article.getElementsByClassName('article-author-link')[0];
        if (author !== undefined) {
            container.appendChild(author.cloneNode(true));
        }
        container.appendChild(document.createElement('hr'));
    });
    document.body.innerHTML = '';
    document.body.appendChild(container);
});