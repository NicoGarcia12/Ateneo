import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from 'src/app/domain/entities/professor';
import { TokenService } from '../../shared/services/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  professor$: Observable<Professor | null>;

  constructor(private tokenService: TokenService) {
    this.professor$ = this.tokenService.professor$;
    this.professor$.subscribe(
      (p) => console.log(p) 
    )
  }
}
