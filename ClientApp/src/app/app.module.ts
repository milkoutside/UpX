import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component'
import { HomeComponent } from './Pages/home/home.component'
import {AppRoutingModule} from "./app-routing.module";
import {ProfileComponent} from "./Pages/profile/profile.component";
import {MenuComponent} from "./Pages/profile/menu/menu.component";
import {StairsComponent} from './Pages/games/stairs/stairs.component';
import { CrashComponent } from './Pages/games/crash/crash.component';
import { ModalLoginComponent } from './Components/nav-menu/modal-login/modal-login.component'
import {JwtModule} from "@auth0/angular-jwt";
import {AuthGuard} from "./guards/auth.guard";
import { HelpComponent } from './Pages/help/help.component';
import { PaymentModalComponent } from './Pages/profile/menu/payment-modal/payment-modal.component';
import { GamesCardComponent } from './Components/games-card/games-card.component';
import { AllGamesComponent } from './Pages/all-games/all-games.component';



export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ProfileComponent,
    MenuComponent,
    StairsComponent,
    CrashComponent,
    ModalLoginComponent,
    HelpComponent,
    PaymentModalComponent,
    GamesCardComponent,
    AllGamesComponent,
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: tokenGetter,
            allowedDomains: ["localhost:7006"],
            disallowedRoutes: []
          }
        }),
        ReactiveFormsModule
    ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
