import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: SearchComponent },
  { path: '**',    component: NoContentComponent },
];
