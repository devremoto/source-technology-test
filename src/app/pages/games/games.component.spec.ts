import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameQuery } from 'src/app/state/game/game.query';
import { GameService } from 'src/app/state/game/game.service';
import { JackpotQuery } from 'src/app/state/jackpot/jackpot.query';
import { JackpotService } from 'src/app/state/jackpot/jackpot.service';
import { Game } from '../../models/game';
import { GamesComponent } from './games.component';
import { Category } from 'src/app/models/category';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ snapshot: { params: {} } });
    const routerStub = () => ({ events: { subscribe: f => f({}) } });
    const gameQueryStub = () => ({
      selectAll: () => ({ subscribe: f => f({}) }),
      getByGroup: (group: Category) => ({})
    });
    const gameServiceStub = () => ({ get: () => ({}) });
    const jackpotQueryStub = () => ({
      selectAll: () => ({ subscribe: f => f({}) })
    });
    const jackpotServiceStub = () => ({ get: () => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [GamesComponent],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: GameQuery, useFactory: gameQueryStub },
        { provide: GameService, useFactory: gameServiceStub },
        { provide: JackpotQuery, useFactory: jackpotQueryStub },
        { provide: JackpotService, useFactory: jackpotServiceStub }
      ]
    });
    spyOn(GamesComponent.prototype, 'load');
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`allGames has default value`, () => {
    expect(component.allGames).toEqual([]);
  });

  it(`games has default value`, () => {
    expect(component.games).toEqual([]);
  });

  it(`jackpots has default value`, () => {
    expect(component.jackpots).toEqual([]);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(GamesComponent.prototype.load).toHaveBeenCalled();
    });
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      (<jasmine.Spy>component.load).calls.reset();
      spyOn(component, 'loadJackPots').and.callThrough();
      component.ngOnInit();
      expect(component.load).toHaveBeenCalled();
      expect(component.loadJackPots).toHaveBeenCalled();
    });
  });

  describe('load', () => {
    it('makes expected calls', () => {
      const gameQueryStub: GameQuery = fixture.debugElement.injector.get(
        GameQuery
      );
      const gameServiceStub: GameService = fixture.debugElement.injector.get(
        GameService
      );
      spyOn(gameQueryStub, 'selectAll').and.callThrough();
      spyOn(gameQueryStub, 'getByGroup').and.callThrough();
      spyOn(gameServiceStub, 'get').and.callThrough();
      (<jasmine.Spy>component.load).and.callThrough();
      component.load();
      expect(gameQueryStub.selectAll).toHaveBeenCalled();
      expect(gameQueryStub.getByGroup).toHaveBeenCalled();
      expect(gameServiceStub.get).toHaveBeenCalled();
    });
  });

  describe('loadJackPots', () => {
    it('makes expected calls', () => {
      const jackpotQueryStub: JackpotQuery = fixture.debugElement.injector.get(
        JackpotQuery
      );
      const jackpotServiceStub: JackpotService = fixture.debugElement.injector.get(
        JackpotService
      );
      spyOn(jackpotQueryStub, 'selectAll').and.callThrough();
      spyOn(jackpotServiceStub, 'get').and.callThrough();
      component.loadJackPots();
      expect(jackpotQueryStub.selectAll).toHaveBeenCalled();
      expect(jackpotServiceStub.get).toHaveBeenCalled();
    });
  });
});
