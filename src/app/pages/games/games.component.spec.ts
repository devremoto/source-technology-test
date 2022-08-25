import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GameQuery } from 'src/app/state/game/game.query';
import { GameService } from 'src/app/state/game/game.service';
import { JackpotQuery } from 'src/app/state/jackpot/jackpot.query';
import { JackpotService } from 'src/app/state/jackpot/jackpot.service';
import { GamesComponent } from './games.component';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(() => {
    const activatedRouteStub = () => ({ snapshot: { params: {} } });
    const routerStub = () => ({ events: { subscribe: (f: any) => f({}) } });
    const gameQueryStub = () => ({ getByGroup: (group: string) => ({}) });
    const gameServiceStub = () => ({
      get: () => ({}),
      getJackPots: () => ({})
    });
    const jackpotQueryStub = () => ({
      selectAll: () => ({ subscribe: (f: any) => f({}) })
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

  it(`jackpots has default value`, () => {
    expect(component.jackpots).toEqual([]);
  });

  describe('constructor', () => {
    it('makes expected calls', () => {
      expect(GamesComponent.prototype.load).toHaveBeenCalled();
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
      spyOn(component, 'loadJackPots').and.callThrough();
      spyOn(gameQueryStub, 'getByGroup').and.callThrough();
      spyOn(gameServiceStub, 'get').and.callThrough();
      spyOn(gameServiceStub, 'getJackPots').and.callThrough();
      (<jasmine.Spy>component.load).and.callThrough();
      component.load();
      expect(component.loadJackPots).toHaveBeenCalled();
      expect(gameQueryStub.getByGroup).toHaveBeenCalled();
      expect(gameServiceStub.get).toHaveBeenCalled();
      expect(gameServiceStub.getJackPots).toHaveBeenCalled();
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
