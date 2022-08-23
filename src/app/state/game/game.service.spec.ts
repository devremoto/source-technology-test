import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { GameQuery } from './game.query';
import { GameStore } from './game.store';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    const gameQueryStub = () => ({ getAll: () => ({ length: {} }) });
    const gameStoreStub = () => ({
      set: arg => ({}),
      update: (id: any, game: Game) => ({})
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        GameService,
        { provide: GameQuery, useFactory: gameQueryStub },
        { provide: GameStore, useFactory: gameStoreStub }
      ]
    });
    service = TestBed.inject(GameService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const gameQueryStub: GameQuery = TestBed.inject(GameQuery);
      spyOn(component, 'getAll').and.callThrough();
      spyOn(gameQueryStub, 'getAll').and.callThrough();
      service.get();
      expect(service.getAll).toHaveBeenCalled();
      expect(gameQueryStub.getAll).toHaveBeenCalled();
    });
  });

  describe('getAll', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const gameStoreStub: GameStore = TestBed.inject(GameStore);
      spyOn(gameStoreStub, 'set').and.callThrough();
      service.getAll();
      const req = httpTestingController.expectOne('http://stage.whgstage.com/front-end-test/games.php');
      expect(req.request.method).toEqual('GET');
      expect(gameStoreStub.set).toHaveBeenCalled();
      req.flush();
      httpTestingController.verify();
    });
  });
});
