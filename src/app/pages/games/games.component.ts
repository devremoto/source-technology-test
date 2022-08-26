import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Jackpot } from 'src/app/models/jackpot';
import { GameQuery } from 'src/app/state/game/game.query';
import { GameService } from 'src/app/state/game/game.service';
import { JackpotQuery } from 'src/app/state/jackpot/jackpot.query';
import { JackpotService } from 'src/app/state/jackpot/jackpot.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  games$: Observable<Game[]> = new Observable<Game[]>();
  group = this.activatedRoute.snapshot.params['group']
  jackpots: Jackpot[] = [];
  jackpots$!: Subscription;

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
  }

  load() {
    this.group = this.activatedRoute.snapshot.params['group'];
    this.gameService.get();

    if (this.group == 'jackpots') {
      this.loadJackPots();
      this.games$ = this.gameService.getJackPots();
    } else {
      this.jackpots$?.unsubscribe();
      this.games$ = this.gameQuery.getByGroup(this.group);
    }
  }

  loadJackPots() {
    this.jackpots$ = this.jackpotService.get().subscribe();
    this.jackpotQuery.selectAll().subscribe((result: Jackpot[]) => {
      this.jackpots = result;
    })
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

  ngOnDestroy(): void {
    this.jackpots$.unsubscribe();
  }

}
