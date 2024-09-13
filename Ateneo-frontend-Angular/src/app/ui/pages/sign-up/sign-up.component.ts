import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ResolutionService } from '../../shared/services/resolution.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  public signUpForm!: FormGroup;
  public isMobile: boolean = false;

  public constructor(
    private fb: FormBuilder,
    private router: Router,
    private resolutionService: ResolutionService
  ) {}

  public ngOnInit(): void {
    this.signUpForm = this.fb.group({
      names: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/),
        ],
      ],
    });

    this.resolutionService.screenWidth$.subscribe((width) => {
      this.isMobile = width <= 600;
    });
  }

  public hasError(field: string, errorType: string): boolean | undefined {
    const control = this.signUpForm.get(field);

    if (!control) {
      return undefined;
    }

    if (field === 'password' && errorType === 'pattern') {
      if (control.hasError('minlength')) {
        return false;
      }
    }

    return control.hasError(errorType) && control.touched;
  }

  public signUp(): void {
    if (!this.signUpForm.valid) {
      return;
    }

    const user = this.signUpForm.value;
    console.log(user);
    this.router.navigate(['/login']);
  }
}
