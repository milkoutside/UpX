import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import {HomeComponent} from "./Pages/home/home.component";
import {ProfileComponent} from "./Pages/profile/profile.component";
import {StairsComponent} from "./Pages/games/stairs/stairs.component";
import {CrashComponent} from "./Pages/games/crash/crash.component";
import {HelpComponent} from "./Pages/help/help.component";
import {AllGamesComponent} from "./Pages/all-games/all-games.component";





const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'profile', component: ProfileComponent},
  {path: 'stairs', component: StairsComponent},
  {path: 'crash', component: CrashComponent},
  {path: 'help', component: HelpComponent},
  {path: 'games', component: AllGamesComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
