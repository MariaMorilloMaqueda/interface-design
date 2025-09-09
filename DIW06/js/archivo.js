$(document).ready(function () {
    // 1.1 - INICIALIZAR WEB
    // Se ocultan los elementos empleando el efecto .hide()
    $('#opciones_estilos').hide();
    $('.control_clasificacion img:last').hide(); // Se oculta la segunda imagen (la última) del contenedor
    $('#vista_clasificacion').hide();

    // Para ocultar las imagenes del slider se han utilizado 2 variables:
    let indice = 0; // Contador
    let imagenes = $('#imagenes_slider img'); // Almacena las imagenes del slider

    imagenes.hide().eq(indice).show(); // Primero se ocultan las imagenes con .hide(), luego se selecciona la imagen en la posición 0 (la primera) con .eq(indice) y se muestra con .show()

    // Para inicializar los campos con un valor concreto se emplea el método .val()
    // Para "deschekear" el ckeckbox se utiliza el método .prop()
    $('#input_color_fondo').val('#343a40');
    $('#select_fuente').val('Arial');
    $('#input_tamano_texto').val(48);
    $('#input_filtro_avatar').prop('checked', false);
    
    // 1.2 - FUNCIONALIDAD USUARIO
    // Al hacer clic en el icono de configuración sucede lo siguiente:
    $('#boton_config').click(function () {
        let nombreActual = $('#usuario span').text(); // Se utiliza una variable que almacena el nombre actual con el método .text()
        $('#modificar_usuario input').val(nombreActual); // Le asignamos el valor obtenido al imput

        $('#usuario').hide(); // Se oculta el contendor usuario
        $('#modificar_usuario').show(); // Se muestra el contenedor con los dos botones 
    });

    // Al hacer clic en el botón verde (modificar) sucede lo siguiente:
    $('#boton_modificar_usuario').click(function () {
        let nombreNuevo = $('#modificar_usuario input').val(); // Se utiliza una variable que almacena el valor actual con el método .val()

        if (nombreNuevo === '') {
            $('#modificar_usuario input').val('').attr('placeholder', 'Campo vacío'); // Si el valor está vacío aparece "campo vacío" como placeholder
        } else {
            $('#usuario span').text(nombreNuevo); // Sino, se le asigna el valor obtenido al span con el método .text()
            $('#modificar_usuario').hide(); // Se oculta el contenedor con los dos botones 
            $('#usuario').show(); // Se muestra el contenedor usuario
        }
    });

    // Al hacer clic en el botón rojo (cancelar) sucede lo siguiente:
    $('#boton_cancelar_usuario').click(function () {
        $('#modificar_usuario').hide(); // Se oculta el contenedor con los dos botones 
        $('#usuario').show(); // Se muestra el contenedor usuario
    });

    // 1.3 - INICIO
    // Al hacer clic en "Inicio" sucede lo siguiente:
    $('nav li:first-child a').click(function () {

        $('#migas_de_pan span').text("Inicio"); // Se asigna el valor "Inicio" al siguiente span de las migas de pan

        $('#vista_clasificacion').fadeOut(500, function () { // Se oculta el contenido de clasificación con el efecto .fadeOut()
            $('#vista_inicio').fadeIn(500); // A su vez, se muestra el contenido del slider
        });

        $('.control_clasificacion img:last').hide(500); // Se oculta el icono (vista.png)
    });

    // 1.4 - MIGAS DE PAN
    // Al hacer clic sobre la imagen "ocultar.png" sucede lo siguiente:
    $('#migas_de_pan img').click(function () {
        $('#migas_de_pan p').fadeToggle(500); // Se asigna el efecto .fadeToggle() a las miagas de pan
        
        $(this).hide(500, function() { //Se oculta la imagen que se esté mostrando actualmente
            let cambioImg = $(this).attr('src').includes('ocultar.png') ? 'imagenes/ver.png' : 'imagenes/ocultar.png';

            $(this).attr('src', cambioImg).show(500); // Se muestra la imagen que estuviese oculta
        });
    });

    // 1.5 - SLIDER
    // Se utilizan las variables declaradas en el primer punto
    let puntos = $('#botones_slider span'); // Variable que almacena los puntos visibles del slider
    let total = imagenes.length; // variable que almacena el total de las imagenes

    puntos.css('color', '#4c5156').eq(indice).css('color', '#73c6b6'); // Al cargar, mostramos solo la primera imagen y marcamos el primer punto como activo

    // Al hacer clic en "anterior" sucede lo siguiente:
    $('img[src="imagenes/anterior.png"]').click(function () {
        // Se oculta la imagen actual y se cambia el punto a gris
        imagenes.eq(indice).hide();
        puntos.eq(indice).css('color', '#4c5156');

        // Se calcula el nuevo valor del índice
        indice = (indice - 1 + total) % total;

        // Se muestra la nueva imagen y cambia el punto a verde
        imagenes.eq(indice).fadeIn(1000);
        puntos.eq(indice).css('color', '#73c6b6');
    });

    // Al hacer clic en "siguiente" sucede lo siguiente:
    $('img[src="imagenes/siguiente.png"]').click(function () {
        // Se oculta la imagen actual y se cambia el punto a gris
        imagenes.eq(indice).hide();
        puntos.eq(indice).css('color', '#4c5156');

        // Se calcula el nuevo valor del índice
        indice = (indice + 1) % total;

        // Se muestra la nueva imagen y cambia el punto a verde
        imagenes.eq(indice).fadeIn(1000);
        puntos.eq(indice).css('color', '#73c6b6');
    });

    // 1.6 - CLASIFICACIÓN
    // Al hacer clic en "Clasificación" sucede lo siguiente:
    $('nav li:nth-child(2) a').click(function () {

        $('#migas_de_pan span').text("Clasificación"); //Se asigna el valor "clasificación" al texto en las migas de pan

        $('#vista_inicio').fadeOut(500, function () { // Se oculta el contenido del slider con el efecto .fadeOut()
            $('#vista_clasificacion').fadeIn(500); // A su vez, se muestra el contenido de clasificación
        });

        $('.control_clasificacion img:last').show(500); // Se muestra el icono (vista.png)
    });

    //Al hacer clic sobre el icono "vista.png" sucede lo siguiente:
    $('.control_clasificacion img:last').click(function () {
        let rotacion =  $(this).css('transform'); // Se asigna la propiedad transform de css de la imagen a una variable

        // Según la rotación de la imagen se aplican unos efectos css u otros a las tablascontenedores
        if (rotacion === "none" || rotacion === 'matrix(1, 0, 0, 1, 0, 0)') { // css('transform') devuelve 'none' si no hay transformación aplicada, o una matriz si ya hay una rotación. La matriz 'matrix(1, 0, 0, 1, 0, 0)' es el equivalente a ninguna rotación.
            $(this).css('transform', 'rotate(90deg)');
            $('#vista_clasificacion').css({
                display: 'flex',
                'flex-direction': 'column'
            });
            $('#ventana_clasificacion, #ventana_comparacion').css('width', '100%');
        } else {
            $(this).css('transform', 'rotate(0deg)');
            $('#vista_clasificacion').css({
                display: 'flex',
                'flex-direction': 'row'
            });
        }
    });

    // Al hacer clic sobre el icono (minimizar.png) de clasificación esta se expande o se contrae con el efecto .slideToggle()
    $('#minimizar_clasificacion').click(function () {
        $('#clasificacion').slideToggle(); 
    });

    // Al hacer clic sobre el icono (minimizar.png) de comparación esta se expande o se contrae con el efecto .slideToggle()
    $('#minimizar_comparacion').click(function () {
        $('#comparacion').slideToggle(); 
    });

    // 1.7 - FUNCIONALIDAD CLASIFICACIÓN
    $('#clasificacion table').hide().eq(0).show();
    
    // Al seleccionar una jornada en el select sucede lo siguiente:
    $('#jornadas').on('change', function () {
        // Ocultar la tabla visible actual con fadeOut
        $('#clasificacion table:visible').fadeOut(300); // tabla que está visible actualmente
        // Cuando se haya ocultado, mostrar la nueva tabla con fadeIn
        $('#jornada_' + $(this).val()).fadeIn(2000); // tabla correspondiente a la jornada seleccionada
    });

    // Al hacer clic sobre una de las filas de la tabla sucede lo siguiente:
    $('#clasificacion table tbody tr').on('click', function () {
        // 1. Quitar clase de cualquier fila seleccionada previamente
        $('.equipo_seleccionado').removeClass('equipo_seleccionado');
    
        // 2. Añadir clase a la fila actual
        $(this).addClass('equipo_seleccionado');
    
        // 3. Obtener celdas de la fila seleccionada
        let celdas = $(this).children('td, th');
    
        // 4. Actualizar imagen (ícono del deporte)
        let nombreEquipo = celdas.eq(1).text(); // Segunda celda
        let rutaIcono = `imagenes/equipos/${nombreEquipo}.png`;
        $('#comparacion table thead img').hide(0).attr('src', rutaIcono).fadeIn(1000);
    
        // 5. Poner los datos en la tabla de comparación (asumiendo mismo orden)
        $('#comparacion table tbody tr').each(function(indice) {
            $(this).find('td').text(celdas.eq(indice + 1).text());
            // +1 porque la primera celda es el puesto
        });
    });
    
    // 1.8 - FUNCIONALIDAD COMPARACIÓN
    // Al hacer click sobre el boton "borrar.png" sucede lo siguiente:
    $('img[src="imagenes/borrar.png"]').click(function () {
        // 1. Comprobar si la tabla comparación tiene datos (al menos una celda no vacía)
        let tieneDatos = false;
        $('#comparacion table tbody td').each(function() {
            if ($(this).text().trim() !== '') {
                tieneDatos = true;
            }
        });

        // 2. Si tiene datos, se ejecutan el resto de acciones
        if (tieneDatos) {
            // Borrar los datos de la tabla comparación
            $('#comparacion table tbody td').text('');

            // Cambiar el icono del deporte seleccionado por el icono por defecto
            $('#comparacion table thead img').hide(0).attr('src', 'imagenes/equipos/icono.png').fadeIn(1000);

            // Desmarcar la fila seleccionada de la tabla clasificación
            $('.equipo_seleccionado').removeClass('equipo_seleccionado');
        }
        // Si no tiene datos, no hace nada
    });

    // 1.9 - ESTILOS CABECERA
    // Al hacer clic en el ícono del menú que despliega opciones de estilos sucede lo siguiente:
    $('img[src="imagenes/flecha_abajo.png"]').click(function () {
        $('#opciones_estilos').slideToggle(800); // Muestra/oculta el submenú
    });

    $('#boton_aplicar_estilos').click(function () {
        // Obtener los valores seleccionados
        let color = $("#input_color_fondo").val();
        let fuente = $("#select_fuente").val();
        let tamanio = $("#input_tamano_texto").val();
        let filtro = $("#input_filtro_avatar").is(":checked");

        // Aplicar color de fondo a la cabecera
        $("#cabecera").css("background-color", color);

        // Aplicar fuente y tamaño al título (h1) de la cabecera, si existe
        let titulo = $("#cabecera").find("h1");
        titulo.css({
            "font-family": fuente,
            "font-size": tamanio + "px"
        });

        // Aplicar filtro al logo si está marcado el checkbox
        if (filtro) {
            $("#logo").find("img").css("filter", "invert(100%)");
        } else {
            $("#logo").find("img").css("filter", "none");
        }
    });

    $('#boton_reset_estilos').click(function () {
        $("#cabecera").css("background-color", "");

        let titulo = $("#cabecera").find("h1");
        titulo.css({
            "font-family": "",
            "font-size": ""
        });

        $("#logo").find("img").css("filter", "none");
    });
    
    // 1.10 - FOOTER
    $('footer a').mouseenter(function () {
        $(this).css({
            "color":  "#73c6b6",
            "font-size": "32px",
            "text-decoration": "none"
        });
    });

    $('footer a').mouseout(function () {
        $(this).css({
            "color":  "",
            "font-size": "",
            "text-decoration": ""
        });
    });
});