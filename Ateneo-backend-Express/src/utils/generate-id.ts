export function generateId(): string {
    // Extrae los últimos 4 dígitos del timestamp actual
    const timestamp = Date.now().toString().slice(-4);

    // Genera un número aleatorio de 4 dígitos y lo convierte a cadena con ceros al inicio si es necesario
    const randomPart = String(Math.floor(Math.random() * 10000)).padStart(4, '0');

    // Combina las dos partes para formar el ID
    return `${timestamp}${randomPart}`;
}
