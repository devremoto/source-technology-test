import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Jackpot } from '../../models/jackpot';

export interface JackpotState extends EntityState<Jackpot> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'jackpot' })
export class JackpotStore extends EntityStore<JackpotState> {

  constructor() {
    super();
  }

}
