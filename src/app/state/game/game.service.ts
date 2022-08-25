import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Game, createGame } from 'src/app/models/game';
import { Jackpot } from 'src/app/models/jackpot';
import { environment } from 'src/environments/environment';
import { JackpotQuery } from '../jackpot/jackpot.query';
import { GameQuery } from './game.query';
import { GameStore } from './game.store';

@Injectable({ providedIn: 'root' })
export class GameService {

  gamesEndpoint = `${environment.api}games.php`
  constructor(
    private gameStore: GameStore,
    private gameQuery: GameQuery,
    private jackpotQuery: JackpotQuery,
    private http: HttpClient) {
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
        this.gameStore.set(entities.map(x => createGame(x)));
      })).subscribe();
  }

  getJackPots() {
    let games = this.gameQuery.getAll();

    return this.jackpotQuery.selectAll().pipe(
      map<Jackpot[], Game[]>(jackpots => {
        return jackpots.map((jackpot: Jackpot) => {
          let game = games.find((game: Game) => game.id == jackpot.game);
          if (game) {
            console.log({ ...game, amount: jackpot.amount });
            return { ...game, amount: jackpot.amount };
          }
          return {} as Game;
        })
      })
    );
  }

  update(game: Partial<Game>) {
    this.gameStore.update(game.id, game);
  }

}
