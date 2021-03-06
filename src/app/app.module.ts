import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { PopUpWindowComponent } from './pop-up-window/pop-up-window.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PopUpComponent } from './pop-up/pop-up.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainService } from './main.service';
import { CookieService } from 'ngx-cookie-service';
 
//Toaster Module
import { ToastrModule } from 'ngx-toastr';

//Social Media login Module
import { SocialLoginModule,AuthServiceConfig ,GoogleLoginProvider } from 'angularx-social-login';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { SubscriptionWindowComponent } from './subscription-window/subscription-window.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("532973368446-71tu520t0iv1mv8fqpvcruqm47112bt0.apps.googleusercontent.com")
  }
]);
export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    PostComponent,
    NotFoundComponent,
    LoginComponent,
    SignupComponent,
    PopUpWindowComponent,
    PopUpComponent,
    NavigationBarComponent,
    SubscriptionWindowComponent

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    SocialLoginModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:"",redirectTo:'/home',pathMatch:"full"},
      {path:"home",component:HomeComponent},
      {path:"login",component:LoginComponent},
      {path:"signup",component:SignupComponent},
      {path:"post",component:PostComponent},
      {path:"**",component:NotFoundComponent},
     // {path:"**",redirectTo:'/notFound',pathMatch:'full'},
    ])

  ],
  providers: [ MainService, 
               CookieService, 
  
    {
      provide: AuthServiceConfig,
      useFactory : provideConfig
    }

  ],
  entryComponents:[PopUpWindowComponent,SubscriptionWindowComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
