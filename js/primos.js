/**
 * Lógica para Primos.html
 * Dependencias: js/core.js (esPrimo)
 */

// Función auxiliar para obtener la lista de divisores (específica de este módulo)
function obtenerDivisores(n) {
    let divisores = [];
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            divisores.push(i);
        }
    }
    return divisores;
}

function verificarPrimo() {
    const numero = parseInt(document.getElementById('numero').value);
    // Verificamos si existe el checkbox, si no, asumimos true
    const checkDetalles = document.getElementById('mostrarDetalles');
    const mostrarDetalles = checkDetalles ? checkDetalles.checked : true;
    
    const resultadoDiv = document.getElementById('resultado');

    if (!numero || numero < 1) {
        mostrarError(resultadoDiv, "Ingresa un número natural válido (mayor a 1)");
        return;
    }

    // Usamos la función compartida de core.js
    const primo = esPrimo(numero);
    
    // Configuración de colores según resultado
    const color = primo ? '#28a745' : '#dc3545';
    const bg = primo ? '#d4edda' : '#f8d7da';
    const icono = primo ? '✓' : '✗';
    const textoTitulo = primo ? `¡${numero} es PRIMO!` : `${numero} NO es primo`;

    let html = `<div class="resultado" style="border-left: 5px solid ${color}; background: ${bg}">`;
    html += `<h2 style="color: ${color}">${icono} ${textoTitulo}</h2>`;
    
    // Lógica para mostrar los detalles paso a paso
    if (mostrarDetalles) {
        const divisores = obtenerDivisores(numero);

        html += `<div class="explicacion">`;
        if (numero === 1) {
            html += `<p>El 1 es un caso especial: no se considera ni primo ni compuesto.</p>`;
        } else if (primo) {
            html += `<p><strong>Explicación:</strong> El número ${numero} cumple la condición de primalidad porque solo es divisible por 1 y por sí mismo.</p>`;
        } else {
            html += `<p><strong>Explicación:</strong> El número ${numero} es compuesto porque tiene más de dos divisores.</p>`;
        }
        html += `</div>`;

        // Sección de divisores
        html += `<div class="divisores">`;
        html += `<strong>Divisores encontrados:</strong>`;
        html += `<div class="divisores-lista">`;
        divisores.forEach(d => {
            html += `<span class="divisor">${d}</span>`;
        });
        html += `</div>`;
        html += `<div class="total-divisores">Tiene un total de ${divisores.length} divisores.</div>`;
        html += `</div>`;
    } 
    // Versión simple (si el checkbox está desactivado)
    else {
        html += `<p>${primo ? 'Solo tiene 2 divisores.' : 'Tiene más de 2 divisores.'}</p>`;
    }

    html += '</div>';
    resultadoDiv.innerHTML = html;
}

// Evento para tecla Enter
document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verificarPrimo();
});