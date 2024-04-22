import { Routes } from '@angular/router';
// import { PokemonPageComponent } from './modules/pokemon/pages/pokemon-page/pokemon-page.component';
import { BerriesPageComponent } from './modules/Berries/pages/berries-page/berries-page.component';
import { ItemPageComponent } from './modules/Item/pages/item-page/item-page.component';
import { LoginPageComponent } from './modules/authentication/pages/login-page/login-page.component';
import { HomeComponent } from './modules/home/home.component';
import { PokemonListComponent } from './modules/pokemon/components/pokemon-list/pokemon-list.component';

export const routes: Routes = [

{path: '', redirectTo: 'login', pathMatch: 'full'},
{ path: 'login', component: LoginPageComponent },
{ path: 'home', component: HomeComponent },
//   { path: 'pokemon-page', component: PokemonPageComponent },
{ path: 'pokemon-page', component: PokemonListComponent },
  { path: 'berries-page', component: BerriesPageComponent },
  { path: 'item-page', component: ItemPageComponent },
];
