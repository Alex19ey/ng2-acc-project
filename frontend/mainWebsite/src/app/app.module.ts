import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { AppRoutingModule } from "./app-routing.module";
import { AccountsModule } from "./accounts/accounts.module";

import { AppComponent } from "./app.component";
import { PageNotFoundComponent } from "./not-found.component";

import "../styles/styles.scss";



@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AccountsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}

