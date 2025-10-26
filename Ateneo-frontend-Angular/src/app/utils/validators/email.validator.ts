import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Regex para validar formato de email: dato@dato.com
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;

/**
 * Valida el formato del email
 * @param email - Email a validar
 * @returns true si es válido o está vacío, false si es inválido
 */
export function isValidEmail(email: string): boolean {
    if (!email) return true; // El email es opcional
    return EMAIL_REGEX.test(email);
}

/**
 * Validador personalizado para email en formularios reactivos
 * Formato requerido: dato@dato.com
 * - Al menos un carácter antes del @
 * - @ obligatorio
 * - Al menos un carácter después del @ y antes del punto
 * - Punto obligatorio
 * - Al menos 2 caracteres después del punto (dominio)
 */
export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null; // Si está vacío, lo maneja el Validators.required
        }

        const valid = EMAIL_REGEX.test(control.value);

        return valid ? null : { invalidEmail: { value: control.value } };
    };
}
