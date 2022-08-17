import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'enter', loadChildren: () => import('./pages/enter/enter.module').then(module => module.EnterModule) },
  { path: 'thankyou', loadChildren: () => import('./pages/thank-you/thank-you.module').then(module => module.ThankyouModule) },
  { path: '**', redirectTo: 'enter' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class AppRoutingModule { }
