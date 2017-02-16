import { NgModule } from '@angular/core';
import { Location }   from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';

import { AccountsComponent } from './accounts.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountCreateComponent} from './account-create/account-create.component';
import { AccountFormComponent } from './shared/account-form/account-form.component';
import { AccountService } from './accounts.service';



@NgModule({
    imports: [
        SharedModule,
        ReactiveFormsModule,
        AccountsRoutingModule
    ],
    declarations: [
        AccountsComponent,
        AccountFormComponent,
        AccountListComponent,
        AccountDetailComponent,
        AccountCreateComponent
    ],
    exports: [ AccountsComponent ],
    providers: [
        Location,
        AccountService
    ]
})
export class AccountsModule {}