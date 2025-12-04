/**
 * Lógica para Mcm.html
 * Dependencias: js/core.js (mcd)
 */

let cantidadNumeros = 2;

function cambiarCantidad(n) {
    cantidadNumeros = n;
    let html = '';
    for(let i=1; i<=n; i++) {
        html += `<div class="input-group">
                    <label>Número ${i}:</label>
                    <input type="number" id="num${i}" placeholder="Ej: ${10+i}" min="1">
                 </div>`;
    }
    document.getElementById('inputsContainer').innerHTML = html;
}

function mcmDosNumeros(a, b) {
    // Fórmula: (a*b)/MCD(a,b). Usamos mcd de core.js
    return Math.abs(a * b) / mcd(a, b);
}

function calcularMCM() {
    let numeros = [];
    const resDiv = document.getElementById('resultado');

    for(let i=1; i<=cantidadNumeros; i++) {
        let val = parseInt(document.getElementById(`num${i}`).value);
        if(!val || val < 1) {
            mostrarError(resDiv, "Ingresa todos los números (positivos)");
            return;
        }
        numeros.push(val);
    }

    // Cálculo iterativo
    let resultadoMCM = numeros[0];
    let pasos = [`Iniciamos con: ${resultadoMCM}`];

    for(let i=1; i<numeros.length; i++) {
        let actual = numeros[i];
        let mcdVal = mcd(resultadoMCM, actual);
        let nuevoMCM = (resultadoMCM * actual) / mcdVal;
        
        pasos.push(`MCM(${resultadoMCM}, ${actual}) = (${resultadoMCM} × ${actual}) / ${mcdVal} = ${nuevoMCM}`);
        resultadoMCM = nuevoMCM;
    }

    let html = `<div class="resultado">`;
    html += `<h2>MCM = ${resultadoMCM}</h2>`;
    html += `<div style="margin-top:15px;">`;
    pasos.forEach(p => html += `<div class="paso">${p}</div>`);
    html += `</div></div>`;

    resDiv.innerHTML = html;
}

// Iniciar con 2 inputs
window.onload = function() { cambiarCantidad(2); };