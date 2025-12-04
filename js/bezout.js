/**
 * Lógica para Bezout.html
 * Dependencias: js/core.js (para divAlgoritmo)
 */

function bezoutLogica(a, b, verbose = true) {
    let r_old = a, r_new = b;
    let s_old = 1, s_new = 0;
    let t_old = 0, t_new = 1;
    let tabla = [];

    while (r_new !== 0) {
        // Usamos la función compartida de core.js
        let div = divAlgoritmo(r_old, r_new);
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

        if (verbose) {
            tabla.push({ q: q, r: r_new, s: s_new, t: t_new });
        }
    }
    return { mcd: r_old, s: s_old, t: t_old, tabla: tabla };
}

function calcularBezout() {
    const a = parseInt(document.getElementById('num1').value);
    const b = parseInt(document.getElementById('num2').value);
    const mostrarTabla = document.getElementById('mostrarTabla').checked;
    const resultadoDiv = document.getElementById('resultado');

    if (isNaN(a) || isNaN(b)) {
        mostrarError(resultadoDiv, "Por favor, ingresa dos números válidos");
        return;
    }

    const resultado = bezoutLogica(a, b, mostrarTabla);

    // Construcción del HTML de respuesta
    let html = `<div class="resultado">`;
    html += `<h2>Resultado</h2>`;
    html += `<div class="resultado-principal">${a}(${resultado.s}) + ${b}(${resultado.t}) = ${resultado.mcd}</div>`;
    
    // Tabla
    if (mostrarTabla && resultado.tabla.length > 0) {
        html += '<div style="overflow-x:auto; margin-top:20px;"><table style="width:100%; text-align:center; border-collapse: collapse;">';
        html += '<thead style="background:var(--primary-color); color:white;"><tr><th>q</th><th>r</th><th>s</th><th>t</th></tr></thead><tbody>';
        resultado.tabla.forEach((row, i) => {
            html += `<tr style="background:${i%2===0?'#f9f9f9':'white'}"><td>${row.q}</td><td>${row.r}</td><td>${row.s}</td><td>${row.t}</td></tr>`;
        });
        html += '</tbody></table></div>';
    }
    html += '</div>';

    resultadoDiv.innerHTML = html;
}


window.onload = calcularBezout;
document.addEventListener('keypress', (e) => { if(e.key === 'Enter') calcularBezout() });