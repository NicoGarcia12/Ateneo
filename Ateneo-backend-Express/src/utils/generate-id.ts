
export type ModelName = 'class' | 'absence' | 'student' | 'professor' | 'subject' | 'grade';

export function generateId(modelName: ModelName): string {
    const modelSuffix: Record<ModelName, number> = {
        class: 1,
        absence: 2,
        student: 3,
        professor: 4,
        subject: 5,
        grade: 6
    };
    // Extrae los últimos 4 dígitos del timestamp actual
    const timestamp = Date.now().toString().slice(-4);
    // Genera un número aleatorio de 4 dígitos y lo convierte a cadena con ceros al inicio si es necesario
    const randomPart = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
    // Busca el sufijo según el modelo
    const suffix = modelSuffix[modelName];
    // Combina las partes para formar el ID
    return `${timestamp}${randomPart}${suffix}`;
}
