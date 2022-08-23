import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { Game } from 'src/app/models/game';
import { GameStore, GameState } from './game.store';

@Injectable({ providedIn: 'root' })
export class GameQuery extends QueryEntity<GameState> {

  constructor(store: GameStore) {
    super(store);
  }

  getByCategory(category: string) {
    return this.getAll().filter((game: Game) => game.categories.indexOf(category) >= 0);
  }

  getByGroup(group: string) {
    return this.getAll().filter((game: Game) => {
      return game.categories.find((category: string) => {
        switch (category.toLocaleLowerCase()) {
          case "ball":
          case "virtual":
          case "fun":
            return group == "other";
        }
        return category == group;
      }

      )

    });
  }

}
