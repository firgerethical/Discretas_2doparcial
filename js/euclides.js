/**
 * Lógica para Euclides.html
 */



function mcdEuclidesVerbose(a, b) {
    let pasos = [];
    let mayor = Math.max(a, b);
    let menor = Math.min(a, b);
    let i = 1;

    while (menor !== 0) {
        const cociente = Math.floor(mayor / menor);
        const resto = modulo(mayor, menor);
        pasos.push(`Paso ${i}: ${mayor} = ${menor} × ${cociente} + ${resto}`);
        mayor = menor;
        menor = resto;
        i++;
    }
    return { mcd: mayor, pasos: pasos };
}

function calcular() {
    const n1 = parseInt(document.getElementById('num1').value);
    const n2 = parseInt(document.getElementById('num2').value);
    const resDiv = document.getElementById('resultado');

    if (!n1 || !n2 || n1<=0 || n2<=0) {
        mostrarError(resDiv, "Ingresa números positivos");
        return;
    }

    const res = mcdEuclidesVerbose(n1, n2);

    let html = `<div class="resultado">`;
    html += `<h2>MCD = ${res.mcd}</h2>`;
    html += `<div style="margin-top:15px;">`;
    res.pasos.forEach(p => html += `<div class="paso">${p}</div>`);
    html += `</div></div>`;

    resDiv.innerHTML = html;
}

document.addEventListener('keypress', (e) => { if(e.key==='Enter') calcular() });