import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Game } from 'src/app/models/game';
import { GameQuery } from '../game/game.query';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private gameQuery: GameQuery) {
  }

  get() {
    return this.gameQuery.selectAll().
      pipe(
        map<any, Category[]>((data: Game[]) => {
          let categories: string[] = [];

          data.forEach((game: Game) => {
            categories = categories.concat(game.categories)
          });

          let groups = categories
            .filter((value: string, index: Number, self: string[]) => self.indexOf(value) === index)
            .map(category => {
              return { name: category, group: category } as Category
            });

          let result: Category[] = [];
          groups.forEach(game => {
            game.group == game.name
            switch (game.name.toLocaleLowerCase()) {
              case "ball":
              case "virtual":
              case "fun":
                game.group = 'other';
                break;
            }
            if (!result.find((z: Category) => z.group == game.group)) {
              result.push(game);
            }
          })

          return result;
        }));
  }

}
