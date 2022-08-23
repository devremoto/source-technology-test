import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Game } from 'src/app/models/game';

export interface GameState extends EntityState<Game, any> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'game' })
export class GameStore extends EntityStore<GameState> {

  constructor() {
    super();
  }

}
