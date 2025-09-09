function dibujarMesa (dibujo)
{
    dibujo.beginPath();
    dibujo.rect(0, 0, 415, 215);
    dibujo.fillStyle="#008000";
    dibujo.fill(); 
    dibujo.strokeStyle = "#000000";
    dibujo.lineWidth = 15;
    dibujo.stroke();
}

// FUNCIÓN DIBUJAR CIRCULO
// Dibuja un círculo blanco (simulando la bola) con borde negro en las coordenadas especificadas
function dibujarCirculo(dibujo, posicion_x, posicion_y)
{
    dibujo.beginPath();
    dibujo.arc(posicion_x, posicion_y, 15, 0, Math.PI * 2);
    dibujo.fillStyle="#ffffff";
    dibujo.fill(); 
    dibujo.strokeStyle = "#000000";
    dibujo.lineWidth = 2;
          
}

// FUNCIÓN DIBUJAR PALO
// Dibuja un rectángulo rojo (simulando el taco) en la posición horizontal (posicion_x) y fija verticalmente en y = 100.
function dibujarPalo(dibujo, posicion_x)
{
    dibujo.beginPath();
    dibujo.rect(posicion_x, 100, 70, 10);
    dibujo.fillStyle="#B7321B";
    dibujo.fill();         
}

// FUNCIÓN LANZAR TEXTO
// Muestra un texto en el canvas con fuente roja y borde blanco.
function lanzarTexto(texto){
    texto.textBaseline="ideographic";
    texto.textAlign="center";
    texto.font="bold 22px 'LatoLocal', sans-serif";
    texto.fillStyle="#FF0000";
    texto.fillText("BILLARDS CLUB 10% DESCUENTO", 210, 50);
    texto.strokeStyle = "#FFFFFF";
    texto.lineWidth = 1;
    texto.strokeText("BILLARDS CLUB 10% DESCUENTO", 210, 50);
}

// FUNCIÓN (ANIMACIÓN) INICIAR ANIMACIÓN
// Comienza la animación al hacer clic en el botón con ID iniciar.
function iniciarAnimacion() {
    let miCanvas = document.getElementById("ele_canvas");
    let dibujo = miCanvas.getContext("2d");
    dibujarMesa(dibujo);

    let paloX = 50;
    let bolaX = 200;
    let bolaY = 103;

    let intervaloPalo = setInterval (function () {  // Mediante setInterval se realiza un movimiento del palo hacia la bola (círculo). Cuando el palo alcanza la bola, se detiene y lanza el texto.
        dibujo.clearRect (0, 0, miCanvas.width, miCanvas.height); //Borra todos los contenidos dentro del área.

        dibujarMesa(dibujo);
        dibujarCirculo (dibujo, bolaX, bolaY);
        dibujarPalo (dibujo, paloX);

        paloX += 5; //velocidad

        if (paloX >= bolaX - 84) {
            clearInterval(intervaloPalo);
            lanzarTexto(dibujo);

            let intervaloBola = setInterval (function () { // De nuevo, mediante otro setInterval se inicia otra animación que mueve la bola hacia la derecha hasta que alcanza el borde del canvas.
                dibujo.clearRect (0, 0, miCanvas.width, miCanvas.height);

                dibujarMesa(dibujo);
                dibujarCirculo (dibujo, bolaX, bolaY);
                dibujarPalo (dibujo, paloX); //El texto se lanza dos veces proque con clearRect se borran todos los contenidos dentro de área, de esta forma el texto no desaparece.
                lanzarTexto(dibujo);

                bolaX += 5;

                if (bolaX >= miCanvas.width - 20) {
                    clearInterval(intervaloBola);
                }
            }, 40);
        }
    }, 40);
}

// Se conecta un evento click al botón con ID iniciar para activar la animación.
document.getElementById("iniciar").addEventListener("click", iniciarAnimacion);

/* Conclusción: Este código crea una animación donde un palo se mueve hacia una bola,
simula una colisión, y luego la bola se desplaza mientras aparece un texto promocional.*/