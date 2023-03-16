import { Injectable } from '@angular/core';
import { ToastService } from 'angular-toastify';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { HttpService } from './http.service';

type Reservation = {
  id: number,
  who: string,
  time: Date
}

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationsSubject = new BehaviorSubject<Reservation[]>([]);
  public reservations$ = this.reservationsSubject.asObservable();

  private reservationsErrorSubject = new BehaviorSubject<string | null>(null);
  public reservationsError$ = this.reservationsErrorSubject.asObservable();

  constructor(private httpService: HttpService, private _toastService: ToastService) { }

  getReservations() {
    type Response = {
      data: {
        getReservations: Reservation[]
      }
    }

    this.httpService.query('{"query": "{ getReservations { id who time }}"}').subscribe({
      next: (response) => {
        this.reservationsSubject.next((response as Response).data.getReservations as Reservation[])
      },
      error: (error) => {
        this.reservationsErrorSubject.next(error);
      }
    });
  }

  addReservation(id: number, who: string) {
    const reservations = [...this.reservationsSubject.value];

    for (let i in reservations) {
      if (reservations[i].id === id) {
        reservations[i].who = who;
      }
    }

    this.reservationsSubject.next(reservations);

    type Response = {
      data: {
        updateReservation: {
          status: string,
          message: string
        }
      }
    }

    this.httpService.query(`{"query": "mutation { updateReservation (id: \\"${id}\\", input: { who: \\"${who}\\" }) { status message }}"}`).subscribe({
      next: (response) => {
        if ((response as Response).data.updateReservation.status === "success") {
          this._toastService.success((response as Response).data.updateReservation.message);
        } else {
          this._toastService.error((response as Response).data.updateReservation.message);
        }
      },
      error: (error) => this._toastService.error(error) 
    })
  }
}
