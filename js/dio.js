/* 
 * Lógica para Dio.html (Ecuaciones Diofánticas)
 * Dependencias: js/core.js (divAlgoritmo)
 */

// Implementación local de Bézout simplificada para este cálculo
function bezoutLocal(a, b) {
    let r_old = a, r_new = b;
    let s_old = 1, s_new = 0;
    let t_old = 0, t_new = 1;

    while (r_new !== 0) {
        let div = divAlgoritmo(r_old, r_new); // Usamos core.js
        let q = div.q;

        let r_temp = r_new;
        let s_temp = s_new;
        let t_temp = t_new;

        r_new = r_old - q * r_temp;
        s_new = s_old - q * s_temp;
        t_new = t_old - q * t_temp;

        r_old = r_temp;
        s_old = s_temp;
        t_old = t_temp;
    }
    return { mcd: r_old, s: s_old, t: t_old };
}

function diofantica(a, b, c) {
    let bezoutRes = bezoutLocal(a, b);
    let d = bezoutRes.mcd;
    let s = bezoutRes.s;
    let t = bezoutRes.t;

    if (modulo(c, d) !== 0) {
        return { 
            tieneSolucion: false, 
            mcd: d,
            razon: `El MCD(${a}, ${b}) = ${d} no divide a ${c}`
        };
    }

    let factor = c / d;
    let x0 = s * factor;
    let y0 = t * factor;

    return {
        tieneSolucion: true,
        mcd: d,
        s: s, t: t,
        factor: factor,
        x0: x0, y0: y0,
        genX: `${x0} + k(${b/d})`,
        genY: `${y0} - k(${a/d})`,
        bD: b/d, aD: a/d
    };
}

function actualizarEcuacion() {
    const a = document.getElementById('coefA').value || 'a';
    const b = document.getElementById('coefB').value || 'b';
    const c = document.getElementById('coefC').value || 'c';
    document.getElementById('ecuacionDisplay').textContent = `${a}x + ${b}y = ${c}`;
}

function resolverDiofantica() {
    const a = parseInt(document.getElementById('coefA').value);
    const b = parseInt(document.getElementById('coefB').value);
    const c = parseInt(document.getElementById('coefC').value);
    const resultadoDiv = document.getElementById('resultado');

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        mostrarError(resultadoDiv, "Por favor, ingresa todos los coeficientes");
        return;
    }

    actualizarEcuacion();
    const resultado = diofantica(a, b, c);

    let html = '';

    if (!resultado.tieneSolucion) {
        html = `<div class="resultado" style="background:#f8d7da; border-left:4px solid #dc3545;">`;
        html += `<h2 style="color:#dc3545">No tiene solución entera</h2>`;
        html += `<div class="paso"><p>MCD(${a}, ${b}) = ${resultado.mcd}</p><p>Como ${resultado.mcd} no divide a ${c}, no existen enteros x, y que cumplan la ecuación.</p></div>`;
        html += `</div>`;
    } else {
        html = `<div class="resultado" style="background:#d4edda; border-left:4px solid #28a745;">`;
        html += `<h2 style="color:#28a745">✓ Tiene solución</h2>`;
        
        html += `<div class="paso"><strong>Solución Particular:</strong><br>x₀ = ${resultado.x0}, y₀ = ${resultado.y0}</div>`;
        html += `<div class="paso"><strong>Solución General (k ∈ ℤ):</strong><br>x = ${resultado.genX}<br>y = ${resultado.genY}</div>`;

        html += '<div style="margin-top:15px; background:white; padding:10px; border-radius:8px;"><strong>Ejemplos:</strong>';
        for (let k = -2; k <= 2; k++) {
            let x = resultado.x0 + k * resultado.bD;
            let y = resultado.y0 - k * resultado.aD;
            html += `<div style="font-family:monospace; margin:5px 0;">k=${k}: x=${x}, y=${y}</div>`;
        }
        html += '</div></div>';
    }

    resultadoDiv.innerHTML = html;
}

document.getElementById('coefA').addEventListener('input', actualizarEcuacion);
document.getElementById('coefB').addEventListener('input', actualizarEcuacion);
document.getElementById('coefC').addEventListener('input', actualizarEcuacion);
document.addEventListener('keypress', (e) => { if(e.key === 'Enter') resolverDiofantica() });
window.onload = function() { actualizarEcuacion(); resolverDiofantica(); };