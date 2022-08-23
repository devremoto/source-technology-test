import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { JackpotStore, JackpotState } from './jackpot.store';

@Injectable({ providedIn: 'root' })
export class JackpotQuery extends QueryEntity<JackpotState> {

  constructor(store: JackpotStore) {
    super(store);
  }

}
