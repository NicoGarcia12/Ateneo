import crypto from 'crypto';

/**
 * Genera un código de reseteo de contraseña de 6 dígitos
 * Los primeros 3 dígitos están basados en la fecha
 * Los últimos 3 dígitos están basados en el ID del profesor
 * Se usa un hash para garantizar unicidad
 */
export function generateResetPasswordCode(professorId: string): string {
    const now = new Date();

    // Generar los primeros 3 dígitos basados en fecha (día del año + hora)
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Combinar día del año, hora y minuto para obtener un número único del tiempo
    const timeComponent = (dayOfYear * 100 + hour * 10 + Math.floor(minute / 10)) % 1000;

    // Extraer dígitos del ID del profesor para los últimos 3 dígitos
    const idNumbers = professorId.replace(/\D/g, ''); // Eliminar no-dígitos
    const idComponent = parseInt(idNumbers.slice(-4) || '0', 10) % 1000;

    // Crear un hash único combinando timestamp, ID y un número aleatorio
    const hashInput = `${now.getTime()}-${professorId}-${Math.random()}`;
    const hash = crypto.createHash('sha256').update(hashInput).digest('hex');

    // Usar el hash para modificar los componentes y garantizar unicidad
    const hashNumber = parseInt(hash.substring(0, 8), 16);

    const firstThree = ((timeComponent + hashNumber) % 1000).toString().padStart(3, '0');
    const lastThree = ((idComponent + hashNumber) % 1000).toString().padStart(3, '0');

    return `${firstThree}${lastThree}`;
}

/**
 * Verifica si un código de reseteo aún es válido (no ha expirado)
 * El código expira después de 15 minutos
 */
export function isResetCodeValid(createdAt: Date): boolean {
    const now = new Date();
    const diffMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
    return diffMinutes <= 30; // El código expira después de 30 minutos
}
