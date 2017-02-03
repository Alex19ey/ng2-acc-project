import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AccountService } from "../accounts.service";
import { Account } from "../shared/account.model";



@Component({
    templateUrl: 'account-detail.component.html',
    styleUrls: ['account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
    /**
     * Fields
     */
    account: Account;
    accountId: number;

    constructor(
        private accountService: AccountService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    /**
     * Handlers
     */
    onSubmit(account: Account): void {
        this.accountService.update(this.accountId, account)
            .subscribe(
                res => this.router.navigate([`/accounts`]),
                err => console.log(err)
            );
    }

    /**
     * Hooks
     */
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => {
                this.accountId = +params['id'];
                return this.accountService.getById(this.accountId);
            })
            .subscribe(
                account => this.account = account,
                err => console.log(err)
            );
    }
}