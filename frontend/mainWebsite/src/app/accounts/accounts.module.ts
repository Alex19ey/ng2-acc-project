import { NgModule } from '@angular/core';
import { CommonModule, Location }   from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap/pagination';

import { Ng2TableModule } from 'ng2-table/ng2-table';

import { AccountsRoutingModule } from './accounts-routing.module';

import { AccountsComponent } from './accounts.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountCreateComponent} from './account-create/account-create.component';
import { AccountFormComponent } from './shared/account-form/account-form.component';
import { AccountService } from './accounts.service';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        AccountsRoutingModule
    ],
    declarations: [
        AccountsComponent,
        AccountFormComponent,
        AccountListComponent,
        AccountDetailComponent,
        AccountCreateComponent
    ],
    providers: [
        Location,
        AccountService
    ]
})
export class AccountsModule {}