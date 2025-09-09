function cambiarEstadoAnimacion(estado) {
    let elementos = document.querySelectorAll("#mesa, #blanca, #roja, #taco, #mensaje");
    elementos.forEach(elemento => {
        elemento.style.animationPlayState = estado;
    });
}

document.getElementById("parar").addEventListener("click", function() {
    cambiarEstadoAnimacion("paused");
});

document.getElementById("reanudar").addEventListener("click", function() {
    cambiarEstadoAnimacion("running");
});