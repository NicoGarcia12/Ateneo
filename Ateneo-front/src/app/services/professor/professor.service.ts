import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  private apiUrl = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) { }

  logIn(email: string, password: string) {
    const loginData = { email, password };

    return this.http.post(`${this.apiUrl}/professor/login`, loginData);
  }
}
