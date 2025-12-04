/**
 * core.js
 * Funciones matemáticas compartidas
 */

//modulo
function modulo(a, b) {
    if (b === 0) {
        throw new Error("No se puede dividir entre cero");
    }
    
    const cociente = Math.floor(a / b);
    const residuo = a - (b * cociente);
    
    return residuo;
}

// 1. Algoritmo de la División (Retorna cociente y residuo)
function divAlgoritmo(a, b) {
    if (b <= 0) return null;
    
    let q = 0;
    let r = a;

    if (r >= 0) {
        while (r >= b) {
            r -= b;
            q++;
        }
    } else {
        while (r < 0) {
            r += b;
            q--;
        }
    }
    return { q: q, r: r };
}

// 2. Máximo Común Divisor (Euclides)
// Usado en: Euclides.html, Mcm.html, Bezout.html
function mcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        let temp = b;
        b = modulo(a, b);
        a = temp;
    }
    return a;
}

// 3. Verifica si un número es primo
// Usado en: Primos.html
function esPrimo(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (modulo(n, 2) === 0 || modulo(n, 3) === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (modulo(n, i) === 0 || modulo(n, (i + 2)) === 0) {
            return false;
        }
    }
    return true;
}

// 4. Utilidad para mostrar errores en pantalla
function mostrarError(elementoDiv, mensaje) {
    elementoDiv.innerHTML = `<div class="error">⚠️ ${mensaje}</div>`;
}