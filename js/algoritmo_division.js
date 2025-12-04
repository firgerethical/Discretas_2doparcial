/**
 * Lógica para Algoritmo_Division.html
 * No usa divAlgoritmo de core.js porque necesita generar los pasos detallados (verbose).
 */

function divAlgoritmoVerbose(a, b, verbose = true) {
    if (b <= 0) return { error: "El divisor 'b' debe ser positivo." };

    let q = 0;
    let r = a;
    let pasos = [];

    pasos.push(`Iniciando: a = ${a}, b = ${b}`);
    
    if (r >= 0) {
        pasos.push(`Como a ≥ 0, restamos b (${b}) repetidamente:`);
        while (r >= b) {
            r -= b;
            q++;
            if (verbose) pasos.push(`r = ${r + b} - ${b} = ${r}, q = ${q}`);
        }
    } else {
        pasos.push(`Como a < 0, sumamos b (${b}) repetidamente:`);
        while (r < 0) {
            r += b;
            q--;
            if (verbose) pasos.push(`r = ${r - b} + ${b} = ${r}, q = ${q}`);
        }
    }

    return { q: q, r: r, pasos: pasos };
}

function calcularDivision() {
    const a = parseInt(document.getElementById('dividendo').value);
    const b = parseInt(document.getElementById('divisor').value);
    const mostrarProceso = document.getElementById('mostrarProceso').checked;
    const resultadoDiv = document.getElementById('resultado');

    if (isNaN(a)) {
        mostrarError(resultadoDiv, "Ingresa un dividendo válido");
        return;
    }
    if (isNaN(b) || b <= 0) {
        mostrarError(resultadoDiv, "El divisor debe ser positivo");
        return;
    }

    const resultado = divAlgoritmoVerbose(a, b, mostrarProceso);

    let html = '<div class="resultado">';
    html += `<h2>Resultado</h2>`;
    html += `<div class="resultado-principal">${a} = ${b} × ${resultado.q} + ${resultado.r}</div>`;

    html += `<div class="inputs-grid" style="margin-top:20px;">
                <div style="text-align:center; padding:10px; border:2px solid var(--primary-color); border-radius:8px;">
                    <label>Cociente (q)</label><div style="font-size:1.5em; font-weight:bold; color:var(--primary-color)">${resultado.q}</div>
                </div>
                <div style="text-align:center; padding:10px; border:2px solid var(--primary-color); border-radius:8px;">
                    <label>Residuo (r)</label><div style="font-size:1.5em; font-weight:bold; color:var(--primary-color)">${resultado.r}</div>
                </div>
             </div>`;

    if (mostrarProceso) {
        html += '<div style="margin-top:20px;"><strong>Proceso:</strong>';
        resultado.pasos.forEach((paso, i) => {
            html += `<div class="paso">${paso}</div>`;
        });
        html += '</div>';
    }
    html += '</div>';

    resultadoDiv.innerHTML = html;
}

document.addEventListener('keypress', (e) => { if(e.key === 'Enter') calcularDivision() });
window.onload = calcularDivision;