let listica;

const botonClickBorrar = (event) => {
    console.log(event.target.parentElement);
    event.target.parentElement.remove();
}

function agregar() {
    let li = document.createElement('li');
    let nombreElement = document.getElementById('nombre');
    let nombre = nombreElement.value;

    // span para el nombre
    let span = document.createElement('span');
    span.textContent = nombre;
    li.appendChild(span);

    // agregar boton para eliminar
    let button = document.createElement('button');
    button.textContent = "X";
    button.onclick = botonClickBorrar;
    li.appendChild(button);

    // limpiar el nombre del formulario
    nombre.value = "";
    
    // agregarlo a la lista
    agregar_a_la_lista(li);
}

function agregar_a_la_lista(li) {
    let lista = document.getElementById('lista');
    lista.appendChild(li.cloneNode(true));
}

function agregar_a_la_ruleta(li) {
    let ruletaMain = document.getElementById('ruleta-main');
    let ruletaAux = document.getElementById('ruleta-aux');
    ruletaMain.appendChild(li.cloneNode(true));
    ruletaAux.appendChild(li.cloneNode(true));
}

function limpiar_ruleta(){
    let ruletaMain = document.getElementById('ruleta-main');
    let ruletaAux = document.getElementById('ruleta-aux');
    ruletaMain.classList.remove('spin');
    ruletaAux.classList.remove('spin');
    ruletaMain.classList.remove('spin-end');
    ruletaAux.classList.remove('spin-end');
    ruletaMain.innerHTML = "";
    ruletaAux.innerHTML = "";
}

function elegir_ganador() {

    limpiar_ruleta();

    // rellenar la ruleta
    for(let i = 0; i < 40; i++){
        agregar_a_la_ruleta(listica[Math.floor(Math.random() * listica.length)]);
    }

    // arrancar la ruleta
    let ruletaMain = document.getElementById('ruleta-main');
    let ruletaAux = document.getElementById('ruleta-aux');
    ruletaMain.classList.add('spin');
    ruletaAux.classList.add('spin');

    // elegir el ganador
    let ganador = listica[Math.floor(Math.random() * listica.length)];
    setTimeout(() => {
        // agregar el ganardor al medio de la lista
        let winner = ganador.cloneNode(true);
        winner.classList.add('ganador');
        agregar_a_la_ruleta(winner);
        ruletaMain.classList.remove('spin');
        ruletaAux.classList.remove('spin');
        ruletaMain.classList.add('spin-end');
        ruletaAux.classList.add('spin-end');
        console.log("El ganador es: " + winner.innerText);
    }, 3000);
}
window.onload = (event) => {
    listica = document.getElementById("lista").children;
    console.log(listica);
}
