import { GetGradeHelper } from 'src/helpers/grade/get-grade-helper';
import { GetGradeRelationshipsHelper } from 'src/helpers/grade/get-grade-relationships-helper';

/**
 * Detecta si existe un ciclo en las relaciones de grados.
 * @param gradeId ID del grado principal a analizar.
 * @param baseGrades Lista de grados base relacionados.
 * @returns true si hay ciclo, false si no.
 */
export async function detectGradeCycle(gradeId: string, baseGrades: Array<{ gradeId: string }>): Promise<boolean> {
    // Búsqueda en profundidad para detectar ciclos
    async function searchCycle(currentGradeId: string, visitedGrades: Set<string>): Promise<boolean> {
        if (visitedGrades.has(currentGradeId)) {
            return true; // Ciclo detectado
        }
        visitedGrades.add(currentGradeId);
        const grade = await GetGradeHelper(currentGradeId);
        if (!grade) {
            return false; // Grado no existe, no hay ciclo
        }
        const relationships = await GetGradeRelationshipsHelper(currentGradeId);
        for (const relationship of relationships) {
            if (await searchCycle(relationship.baseGradeId, visitedGrades)) {
                return true;
            }
        }
        visitedGrades.delete(currentGradeId);
        return false;
    }

    for (const baseGrade of baseGrades) {
        const visited = new Set([gradeId]);
        if (await searchCycle(baseGrade.gradeId, visited)) {
            return true;
        }
    }
    return false;
}
