import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThankyouComponent } from './thank-you.component';

const routes: Routes = [
  { path: '', component: ThankyouComponent }
];

@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ThankyouModule { }
