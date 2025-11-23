/**
 * Convierte todos los valores BigInt de un objeto o array a string de forma recursiva.
 * Útil para evitar errores de serialización en JSON.stringify y Express res.json,
 * ya que desde Node 20+ los BigInt no se serializan automáticamente.
 *
 * Uso recomendado: antes de enviar cualquier respuesta JSON que pueda contener BigInt,
 * pasa el objeto por esta función para asegurar compatibilidad con el frontend y evitar errores 500.
 *
 * Ejemplo:
 *   const safeData = convertBigIntToString(data);
 *   res.json(safeData);
 */
export function convertBigIntToString(obj: any): any {
    if (typeof obj === 'bigint') {
        return obj.toString();
    }
    if (obj instanceof Date) {
        return obj.toISOString();
    }
    if (Array.isArray(obj)) {
        return obj.map(convertBigIntToString);
    }
    if (obj && typeof obj === 'object') {
        const newObj: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                newObj[key] = convertBigIntToString(obj[key]);
            }
        }
        return newObj;
    }
    return obj;
}
