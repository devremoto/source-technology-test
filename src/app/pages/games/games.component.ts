import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Jackpot } from 'src/app/models/jackpot';
import { GameQuery } from 'src/app/state/game/game.query';
import { GameService } from 'src/app/state/game/game.service';
import { JackpotQuery } from 'src/app/state/jackpot/jackpot.query';
import { JackpotService } from 'src/app/state/jackpot/jackpot.service';
import { createGame, Game } from '../../models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  allGames: Game[] = [];
  games: Game[] = [];
  group = this.activatedRoute.snapshot.params['group']
  jackpots: Jackpot[] = [];
  constructor(
    private gameService: GameService,
    private gameQuery: GameQuery,
    private jackpotService: JackpotService,
    private jackpotQuery: JackpotQuery,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.load();
      }
    })
  }

  ngOnInit(): void {
    this.load();
    this.loadJackPots();
  }

  load() {
    this.group = this.activatedRoute.snapshot.params['group'];
    this.gameService.get();
    this.gameQuery.selectAll().subscribe((result: Game[]) => {
      this.games = this.group ? this.gameQuery.getByGroup(this.group) : result;

    })
  }

  loadJackPots() {
    this.jackpotService.get();
    this.jackpotQuery.selectAll().subscribe((result: Jackpot[]) => {
      this.jackpots = result;
    })
  }

  getJackpot(game: Game) {
    let jackpot = this.jackpots.find(x => x.game == game.id);
    return jackpot?.amount || 0;
  }



  isNew(game: Game) {
    if (this.group == "new" || this.group == "top") {
      return false
    }

    if (game.categories.find(x => x == 'new')) {
      return "new"
    }

    if (game.categories.find(x => x == 'top')) {
      return "top"
    }

    return false;

  }

  handleMissingImage(event: Event) {
    (event.target as HTMLDivElement).style.backgroundColor = 'var(--dark)';
  }

}
