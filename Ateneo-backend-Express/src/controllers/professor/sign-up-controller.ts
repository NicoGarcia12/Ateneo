import { Professor } from '@prisma/client';
import { SignUpHelper } from '../../helpers/professor/sign-up-helper';
import bcrypt from 'bcrypt';

export const SignUpController = async (email: string, password: string, firstName: string, lastName: string): Promise<string> => {
    try {
        password = await bcrypt.hash(password, 10);
        return await SignUpHelper({ email, password, firstName, lastName });
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};
