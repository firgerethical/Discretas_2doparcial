/**
 * Lógica para Primos.html
 * Dependencias: js/core.js para comprobar un primo
 */

function verificarPrimo() {
    const numero = parseInt(document.getElementById('numero').value);
    const resultadoDiv = document.getElementById('resultado');

    if (!numero || numero < 1) {
        mostrarError(resultadoDiv, "Ingresa un número natural válido (mayor a 1)");
        return;
    }

    // Traido desde Core
    const primo = esPrimo(numero);

    let html = `<div class="resultado" style="border-left: 5px solid ${primo ? '#28a745' : '#dc3545'}; background: ${primo ? '#d4edda' : '#f8d7da'}">`;
    
    if (primo) {
        html += `<h2 style="color: #28a745">✓ ¡${numero} es PRIMO!</h2>`;
        html += `<p>Solo tiene dos divisores: 1 y ${numero}.</p>`;
    } else {
        html += `<h2 style="color: #dc3545">✗ ${numero} NO es primo</h2>`;
        html += `<p>Es un número compuesto (tiene más de 2 divisores).</p>`;
    }
    html += '</div>';

    resultadoDiv.innerHTML = html;
}

document.getElementById('numero').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') verificarPrimo();
});