import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from "../accounts.service";
import { Account } from "../shared/account.model";



@Component({
    templateUrl: 'account-create.component.html',
    styleUrls: ['account-create.component.scss']
})
export class AccountCreateComponent {

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    /**
     * Handlers
     */
    onSubmit(account: Account) {
        this.accountService.create(account)
            .subscribe(
                res => this.router.navigate([`/accounts`]),
                err => console.log(err)
            );
    }
}