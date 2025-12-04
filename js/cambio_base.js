/**
 * Lógica para Cambio_base.html
 * Dependencias: js/core.js (divAlgoritmo)
 */

const digitos = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function cambioBase(nStr, bOrigen, bDest, verbose = true) {
    let pasos = [];
    if (bOrigen < 2 || bDest < 2 || bOrigen > 36 || bDest > 36) {
        return { error: "Bases deben estar entre 2 y 36" };
    }

    // A Decimal
    let decimal = 0;
    let str = nStr.toString().toUpperCase();
    
    if (verbose) pasos.push(`<strong>Paso 1:</strong> Convertir ${str} (base ${bOrigen}) a Decimal`);
    
    for (let i = 0; i < str.length; i++) {
        let char = str[str.length - 1 - i]; // Leer de derecha a izquierda para la potencia
        let val = digitos.indexOf(char);
        if (val >= bOrigen || val === -1) return { error: `Dígito '${char}' inválido en base ${bOrigen}` };
        
        let aporte = val * Math.pow(bOrigen, i);
        if (verbose) pasos.push(`${val} × ${bOrigen}^${i} = ${aporte}`);
        decimal += aporte;
    }
    
    if (verbose) pasos.push(`Valor Decimal = ${decimal}`);

    // A Base Destino
    if (decimal === 0) return { resultado: "0", pasos: pasos };

    let resultado = "";
    let numTemp = decimal;
    if (verbose) pasos.push(`<strong>Paso 2:</strong> Convertir ${decimal} a Base ${bDest} (divisiones sucesivas)`);

    while (numTemp > 0) {
        let division = divAlgoritmo(numTemp, bDest); // Usando core.js
        let r = division.r;
        let q = division.q;
        
        let charR = digitos[r];
        if (verbose) pasos.push(`${numTemp} ÷ ${bDest} = ${q}, residuo = ${r} ('${charR}')`);
        
        resultado = charR + resultado;
        numTemp = q;
    }

    return { resultado: resultado, pasos: pasos };
}

function convertirBase() {
    const numero = document.getElementById('numero').value.trim();
    const b1 = parseInt(document.getElementById('baseOrigen').value);
    const b2 = parseInt(document.getElementById('baseDestino').value);
    const mostrar = document.getElementById('mostrarProceso').checked;
    const resDiv = document.getElementById('resultado');

    document.getElementById('displayOrigen').textContent = b1;
    document.getElementById('displayDestino').textContent = b2;

    if (!numero) { mostrarError(resDiv, "Ingresa un número"); return; }

    const res = cambioBase(numero, b1, b2, mostrar);

    if (res.error) { mostrarError(resDiv, res.error); return; }

    let html = `<div class="resultado">`;
    html += `<h2>${res.resultado}</h2>`;
    html += `<p style="text-align:center">Base ${b2}</p>`;
    
    if (mostrar) {
        html += '<div style="margin-top:20px; text-align:left;">';
        res.pasos.forEach(p => html += `<div class="paso">${p}</div>`);
        html += '</div>';
    }
    html += '</div>';
    resDiv.innerHTML = html;
}

document.getElementById('baseOrigen').addEventListener('input', convertirBase);
document.getElementById('baseDestino').addEventListener('input', convertirBase);
window.onload = convertirBase;