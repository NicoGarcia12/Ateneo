import { SignUpProfessorHelper } from '../../helpers/professor/sign-up-professor-helper';
import bcrypt from 'bcrypt';

export const SignUpProfessorController = async (email: string, password: string, firstName: string, lastName: string): Promise<string> => {
    try {
        password = await bcrypt.hash(password, 10);
        return await SignUpProfessorHelper(email, password, firstName, lastName);
    } catch (error: any) {
        throw new Error(error.message);
    }
};
