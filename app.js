// Ejercicio 1: El Quiz del Scope
function ejercicio1() {
    let respuestaGlobal = confirm("¿Es accesible `globalVariable` desde cualquier parte del código?");
    let respuestaFuncion = confirm("¿Es accesible `functionVariable` desde fuera de la función?");
    let respuestaBloque = confirm("¿Es accesible `blockVariable` desde fuera del bloque if?");

    let resultado = `<p>Acceso a globalVariable: ${respuestaGlobal ? "Correcto" : "Incorrecto, globalVariable es accesible globalmente."}</p>`;
    resultado += `<p>Acceso a functionVariable desde fuera: ${respuestaFuncion ? "Incorrecto, functionVariable solo es accesible dentro de la función." : "Correcto"}</p>`;
    resultado += `<p>Acceso a blockVariable desde fuera: ${respuestaBloque ? "Incorrecto, blockVariable solo es accesible dentro del bloque donde se declaró." : "Correcto"}</p>`;

    document.getElementById("resultado1").innerHTML = resultado;
}

// Ejercicio 2: Hoisting en Práctica
function ejercicio2() {
    try {
        var a = 1;
        let b = 2;
        const c = 3;
        var resultado = `Valor de a antes de declarar: ${a} (undefined pero asignada después) <br>`;
        resultado += `Intento de acceso a b antes de declarar: Error<br>`;
        resultado += `Intento de acceso a c antes de declarar: Error<br>`;
        resultado += `Resultado de funcionDeclarada(): ${funcionDeclarada()}<br>`;
        resultado += `Intento de acceso a funcionExpresada() antes de declarar: Error`;
    } catch (error) {
        resultado += `Error capturado: ${error.message}<br>`;
    }

    document.getElementById("resultado2").innerHTML += resultado;

    function funcionDeclarada() {
        return "Función declarada ha sido llamada.";
    }

    const funcionExpresada = function () {
        return "Función expresada ha sido llamada.";
    };
}

// Ejercicio 3: Closures en Acción
function ejercicio3() {
    function crearSumador(x) {
        return function(y) {
            return x + y;
        };
    }

    const sumarCinco = crearSumador(5);
    const resultado = sumarCinco(3);

    document.getElementById("resultado3").innerHTML = `<img src="./imgs/3-1.png" alt=""> <br>Resultado de sumar 5 + 3 = ${resultado}`;
}

// Ejercicio 4: Funciones Declaradas vs Expresadas
function ejercicio4() {
    let resultado = "";

    try {
        resultado += `Llamada a funcionDeclarada antes de definirla: ${funcionDeclarada()}<br>`;
    } catch (error) {
        resultado += `Error al llamar a funcionDeclarada antes de su definición: ${error.message}<br>`;
    }

    try {
        resultado += `Intento de llamar a funcionExpresada antes de definirla: ${funcionExpresada()}<br>`;
    } catch (error) {
        resultado += `Error al llamar a funcionExpresada antes de su definición: ${error.message}<br>`;
    }

    function funcionDeclarada() {
        return "Función declarada ha sido llamada.";
    }

    const funcionExpresada = function () {
        return "Función expresada ha sido llamada.";
    };

    resultado += `Llamada a funcionDeclarada después de definirla: ${funcionDeclarada()}<br>`;
    resultado += `Llamada a funcionExpresada después de definirla: ${funcionExpresada()}<br>`;

    document.getElementById("resultado4").innerHTML += resultado;
}

// Ejercicio 5: Promesas y Callbacks en Acción
function ejercicio5() {
    function manejarAsincronia(callback, promesa) {
        promesa.then(callback).catch(err => console.error("Error en la promesa:", err));
    }

    const miPromesa = new Promise((resolve, reject) => {
        setTimeout(() => resolve("¡Promesa cumplida!"), 2000);
    });

    manejarAsincronia(() => {
        document.getElementById("resultado5").innerHTML += "<p>Callback ejecutado después de la promesa.</p>";
    }, miPromesa);
}

// Ejercicio 6: Event Loop y Web APIs
function ejercicio6() {
    console.log("Mensaje 1: Inmediatamente");

    setTimeout(() => {
        console.log("Mensaje 2: Con timeout de 0 segundos");
        document.getElementById("resultado6").innerHTML += "<p>Mensaje 2: Con timeout de 0 segundos</p>";
    }, 0);

    setTimeout(() => {
        console.log("Mensaje 3: Con timeout de 1 segundo");
        document.getElementById("resultado6").innerHTML += "<p>Mensaje 3: Con timeout de 1 segundo</p>";
    }, 1000);

    document.getElementById("resultado6").innerHTML += `<img src="./imgs/6-1.png" alt=""> <br><p>Mensaje 1: Inmediatamente</p>`;
}

// Ejercicio 7: Predicción del Orden de Ejecución
function ejercicio7() {
    document.getElementById("resultado7").innerHTML += `<img src="./imgs/7-1.png" alt=""> <br>`;
    const scriptExplanation = `
    console.log("Inicio del script");
    
    setTimeout(() => {
        console.log("Primer setTimeout");
    }, 0);
    
    setTimeout(() => {
        console.log("Segundo setTimeout");
    }, 0);
    
    Promise.resolve("Promesa resuelta").then(console.log);
    
    console.log("Fin del script");
    `;

    alert("Estudia el siguiente script y prepárate para predecir el orden de los mensajes en la consola:\n" + scriptExplanation);
    let userPrediction = prompt("Ingresa el orden esperado de los mensajes, separados por comas (por ejemplo: Inicio del script, Fin del script, Promesa resuelta, Primer setTimeout, Segundo setTimeout)");

    console.log("Inicio del script");
    document.getElementById("resultado7").innerHTML += "<p>Inicio del script</p>";

    setTimeout(() => {
        console.log("Primer setTimeout");
        document.getElementById("resultado7").innerHTML += "<p>Primer setTimeout</p>";
    }, 0);

    setTimeout(() => {
        console.log("Segundo setTimeout");
        document.getElementById("resultado7").innerHTML += "<p>Segundo setTimeout</p>";
    }, 0);

    Promise.resolve("Promesa resuelta").then((res) => {
        console.log(res);
        document.getElementById("resultado7").innerHTML += `<p>${res}</p>`;
    });

    console.log("Fin del script");
    document.getElementById("resultado7").innerHTML += "<p>Fin del script</p>";

    let realOrder = "Inicio del script, Fin del script, Promesa resuelta, Primer setTimeout, Segundo setTimeout";
    if (userPrediction === realOrder) {
        alert("¡Felicidades! Predijiste el orden correctamente.");
    } else {
        alert("El orden predicho fue incorrecto. El orden correcto es:\n" + realOrder);
    }
}



// Ejercicio 8: Magia con Closures
function ejercicio8() {
    function contador() {
        let count = 0;
        return {
            incrementar: function() { count++; return count; },
            obtenerValor: function() { return count; }
        };
    }

    const miContador = contador();
    let accion = confirm("¿Desea incrementar el contador?");

    while (accion) {
        miContador.incrementar();
        alert("Valor actual del contador: " + miContador.obtenerValor());
        accion = confirm("¿Desea incrementar el contador?");
    }

    document.getElementById("resultado8").innerHTML = `<img src="imgs/8-1.png" alt="">Valor final del contador: ${miContador.obtenerValor()}`;
}

// Ejercicio 9: Domina las Web APIs con Promesas y Fetch
function ejercicio9() {
    const delay = parseInt(prompt("Ingrese el número de segundos para el delay:"));
    
    setTimeout(() => {
        console.log("Mensaje mostrado después de " + delay + " segundos.");
    }, delay * 1000);

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            console.log("Datos recibidos de la API:", data);
            document.getElementById("resultado9").innerHTML = `<pre>${JSON.stringify(data.slice(0, 5), null, 2)}</pre>`;
        })
        .catch(error => {
            console.error("Error al cargar datos de la API:", error);
            document.getElementById("resultado9").innerHTML = "Error al cargar datos: " + error.message;
        });
}


// Ejercicio 10: Visualización del Event Loop
function ejercicio10() {
    console.log("Inicio del script");

    // Macrotarea: setTimeout
    setTimeout(() => {
        console.log("Macrotarea 1 second (setTimeout)");
        document.getElementById("resultado10").innerHTML += "<p>Macrotarea 1 second (setTimeout)</p>";
    }, 1000);

    setTimeout(() => {
        console.log("Macrotarea 0 seconds (setTimeout)");
        document.getElementById("resultado10").innerHTML += "<p>Macrotarea 0 seconds (setTimeout)</p>";
    }, 0);

    // Microtarea: Promesa
    Promise.resolve()
        .then(() => {
            setTimeout(() => {
                console.log("Macrotarea (setTimeout) inside Microtarea 1");
                document.getElementById("resultado10").innerHTML += "<p>Macrotarea (setTimeout) inside Microtarea 1</p>";
                return "from micro 1";
            }, 0);
        })
        .then((message) => {
            console.log("Microtarea 2 (Promesa)");
            document.getElementById("resultado10").innerHTML += "<p>Microtarea 2 (Promesa)</p>";
        });

    // Microtarea: Promesa
    Promise.resolve()
        .then(() => {
            console.log("Microtarea 3 (Promesa)");
            document.getElementById("resultado10").innerHTML += "<p>Microtarea 3 (Promesa)</p>";
        })
        .then(() => {
            console.log("Microtarea 4 (Promesa)");
            document.getElementById("resultado10").innerHTML += "<p>Microtarea 4 (Promesa)</p>";
        });

    console.log("Fin del script");
    document.getElementById("resultado10").innerHTML += "<p>Inicio y Fin del script se han ejecutado</p>";
}
