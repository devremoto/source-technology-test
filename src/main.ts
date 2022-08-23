import { DEFAULT_CURRENCY_CODE, enableProdMode, LOCALE_ID } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableAkitaProdMode, persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  enableAkitaProdMode();
}
export const storage = persistState({ storage: sessionStorage });

platformBrowserDynamic([])
  .bootstrapModule(AppModule, {
    providers: [
      { provide: LOCALE_ID, useValue: 'en-GB' },
      { provide: DEFAULT_CURRENCY_CODE, useValue: 'GBP' }]
  })
  .catch(err => console.error(err));
