import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountsComponent } from './accounts.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent} from './account-detail/account-detail.component';
import { AccountCreateComponent} from './account-create/account-create.component';


const accountsRoutes: Routes = [
    {
        path: 'accounts',
        component: AccountsComponent,
        children: [
            {
                path: '',
                component: AccountListComponent
            },
            {
                path: 'create',
                component: AccountCreateComponent
            },
            {
                path: ':id',
                component: AccountDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(accountsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountsRoutingModule { }