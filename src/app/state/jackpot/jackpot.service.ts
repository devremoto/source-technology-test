import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Jackpot } from '../../models/jackpot';
import { JackpotStore } from './jackpot.store';

@Injectable({ providedIn: 'root' })
export class JackpotService {
  jackpotEndpoint = `${environment.api}jackpots.php`;
  constructor(private jackpotStore: JackpotStore, private http: HttpClient) {
  }

  get() {
    const timer = interval(3000);
    let api = this.http.get<Jackpot[]>(this.jackpotEndpoint)

    timer.pipe(
      mergeMap(() => api),
      tap((entities: Jackpot[]) => {
        this.jackpotStore.set({ ...entities });
      })
    ).subscribe();

  }
}
