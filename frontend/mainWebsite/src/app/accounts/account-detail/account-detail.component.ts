import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AccountService } from "../accounts.service";
import { Account } from "../account.model";



@Component({
    templateUrl: 'account-detail.component.html',
    styleUrls: ['account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
    /**
     * State
     */
    public account: Account;
    public accountId: number;

    constructor(
        private accountService: AccountService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    /**
     * Handlers
     */
    public onSubmit(account: Account): void {
        this.accountService.update(this.accountId, account)
            .then(res => {
                this.router.navigate([`/accounts`]);
            })
            .catch(err => {console.log(err)});
    }

    /**
     * Hooks
     */
    public ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => {
                this.accountId = +params['id'];
                return this.accountService.getById(this.accountId);
            })
            .subscribe(account => this.account = account);
    }
}