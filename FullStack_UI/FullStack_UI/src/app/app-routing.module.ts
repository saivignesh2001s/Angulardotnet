import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightsListComponent } from './components/flights/flights-list/flights-list.component';
import { AddflightComponent } from './components/flights/addflight/addflight.component';
import { EditflightComponent } from './components/flights/editflight/editflight.component';
import { LoginComponent } from './components/login/login.component';
import { FileComponent } from './components/file/file.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'flights',
    component:FlightsListComponent
  },
  {
    path:'flights/add',
    component:AddflightComponent

  },
  {
    path:'flights/edit/:id',
    component:EditflightComponent
  },
  {
    path:'flights/import',
    component:FileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
