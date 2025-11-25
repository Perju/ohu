// obtener parametros de la url
function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        function (m, key, value) {
            vars[key] = value;
        },
    );
    return vars;
}

// si el parametro no existe devolver un valor por defecto
function getUrlParam(parameter, defaultvalue) {
    let urlparameter = defaultvalue;
    if (window.location.href.indexOf(parameter) > -1) {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter !== undefined ? urlparameter : defaultvalue;
}

// actualizar el temporizador
function updateTimer(_horas, _minutos, _segundos) {
    document.getElementById("horas").innerHTML =
        _horas < 10 ? "0" + _horas : _horas;
    document.getElementById("minutos").innerHTML =
        _minutos < 10 ? "0" + _minutos : _minutos;
    document.getElementById("segundos").innerHTML =
        _segundos < 10 ? "0" + _segundos : _segundos;
}

// actualizar el titulo
function setTitle() {
    let title = getUrlParam("titulo", null);
    if (title !== null) {
        let h1 = document.createElement("h1");
        title = title.replaceAll("+", " ");
        h1.innerHTML = title;
        document.getElementById("title").appendChild(h1);
        console.log("Titulo: " + title + " creado");
    }
}

// iniciar el temporizador y el titulojasdfasdf
window.onload = function () {
    setTitle();
    let horas = getUrlParam("horas", 0);
    let minutos = getUrlParam("minutos", 10);
    let segundos = getUrlParam("segundos", 0);
    updateTimer(horas, minutos, segundos);
    setInterval(function () {
        if (segundos > 0) {
            segundos--;
        } else if (minutos > 0) {
            minutos--;
            segundos = 59;
        } else if (horas > 0) {
            horas--;
            minutos = 59;
            segundos = 59;
        }
        updateTimer(horas, minutos, segundos);
    }, 1000);
    console.log(minutos);
};
