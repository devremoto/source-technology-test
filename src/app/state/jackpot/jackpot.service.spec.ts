import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { JackpotStore } from './jackpot.store';
import { JackpotService } from './jackpot.service';

describe('JackpotService', () => {
  let service: JackpotService;

  beforeEach(() => {
    const jackpotStoreStub = () => ({ set: arg => ({}) });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        JackpotService,
        { provide: JackpotStore, useFactory: jackpotStoreStub }
      ]
    });
    service = TestBed.inject(JackpotService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const jackpotStoreStub: JackpotStore = TestBed.inject(JackpotStore);
      spyOn(jackpotStoreStub, 'set').and.callThrough();
      service.get();
      const req = httpTestingController.expectOne('http://stage.whgstage.com/front-end-test/jackpots.php');
      expect(req.request.method).toEqual('GET');
      expect(jackpotStoreStub.set).toHaveBeenCalled();
      req.flush();
      httpTestingController.verify();
    });
  });
});
