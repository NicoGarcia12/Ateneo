import { ProfessorService } from '../../services/professor.service';
import { useCase } from '../use-case.interface';

export class getProfessorByLogin implements useCase {
    constructor(private professorService: ProfessorService) {}

    execute() {
        return this.professorService.getProfessorByLogin();
    }
}
