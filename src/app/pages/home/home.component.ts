import { Component } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  reservations$ = this.reservationsService.reservations$;
  reservationsError$ = this.reservationsService.reservationsError$;

  constructor(private reservationsService: ReservationsService) {
  }

  ngOnInit() {
    this.reservationsService.getReservations();
  }

  onReservation(id: number, who: string) {
    console.log(`Reserving ${id} -> ${who} ...`);

    if (who !== undefined && who !== "") {
      this.reservationsService.addReservation(id, who);
    }
  }
}
