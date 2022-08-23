import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Game, createGame } from 'src/app/models/game';
import { environment } from 'src/environments/environment';
import { GameQuery } from './game.query';
import { GameStore } from './game.store';

@Injectable({ providedIn: 'root' })
export class GameService {

  gamesEndpoint = `${environment.api}games.php`
  constructor(private gameStore: GameStore, private gameQuery: GameQuery, private http: HttpClient) {
  }

  get() {
    let games = this.gameQuery.getAll();
    if (!games || !games.length) {
      this.getAll();
    }
  }

  getAll() {
    this.http.get<Game[]>(this.gamesEndpoint)
      .pipe(tap((entities: Game[]) => {
        entities.forEach(x => {
          switch (x.name.toLocaleLowerCase()) {
            case "ball":
            case "virtual":
            case "fun":
              x.group = 'other';
              break;
          }
        })
        this.gameStore.set(entities.map(x => createGame(x)));
      })).subscribe();
  }

  update(game: Partial<Game>) {
    this.gameStore.update(game.id, game);
  }

}
