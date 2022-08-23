import { TestBed } from '@angular/core/testing';
import { GameQuery } from '../game/game.query';
import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let service: CategoryService;

  beforeEach(() => {
    const gameQueryStub = () => ({ selectAll: () => ({ pipe: () => ({}) }) });
    TestBed.configureTestingModule({
      providers: [
        CategoryService,
        { provide: GameQuery, useFactory: gameQueryStub }
      ]
    });
    service = TestBed.inject(CategoryService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const gameQueryStub: GameQuery = TestBed.inject(GameQuery);
      spyOn(gameQueryStub, 'selectAll').and.callThrough();
      service.get();
      expect(gameQueryStub.selectAll).toHaveBeenCalled();
    });
  });
});
