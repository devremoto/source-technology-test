import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { map } from 'rxjs';
import { Game } from 'src/app/models/game';
import { GameStore, GameState } from './game.store';

@Injectable({ providedIn: 'root' })
export class GameQuery extends QueryEntity<GameState> {

  constructor(store: GameStore) {
    super(store);
  }

  getByGroup(group: string) {
    return this.selectAll().pipe(
      map<Game[], Game[]>((games: Game[]) => {
        return games.filter((game) => {
          return game.categories.find((category: string) => {
            switch (category.toLocaleLowerCase()) {
              case "ball":
              case "virtual":
              case "fun":
                return group == "other";
            }
            return category == group;
          });
        })
      })
    );
  }

}
