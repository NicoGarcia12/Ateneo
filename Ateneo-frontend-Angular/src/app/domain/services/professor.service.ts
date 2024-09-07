import { Professor } from "../entities/professor.model";

export class ProfessorService{
    getProffesorByLogin(): Professor{
        return new Professor()
    }
}