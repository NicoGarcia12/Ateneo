import { Subject } from './subject';

export interface Professor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    emailActivated: boolean;
    subjects: Array<Subject>;
}
