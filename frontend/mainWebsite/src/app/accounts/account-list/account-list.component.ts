import { Component, OnInit, OnDestroy } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AccountService, AccountsWithCount } from "../accounts.service";
import { Account } from "../shared/account.model";
import { CustomPaginationConfig } from "../../shared/pagination";



@Component({
    templateUrl: 'account-list.component.html',
    styleUrls: ['account-list.component.scss']
})
export class AccountListComponent implements OnInit, OnDestroy {
    /**
     * Fields
     */
    rows: Array<any> = [];
    columns: Array<any> = [
        {title: 'Account name', name: 'accountName', sort: 'asc'},
        {title: 'Address', name: 'address'},
        {title: 'Phone', name: 'phone'},
        {title: 'Fax', name: 'fax'},
        {title: 'City', name: 'city'},
        {title: 'Info', name: 'info'},
        {title: 'Contact name', name: 'contactName'},
        {title: 'View', name: 'view', sort: false},
        {title: 'Remove', name: 'remove', sort: false}
    ];
    tableConfig: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: ''},
        className: ['table-striped', 'table-hover']
    };
    filterName$: Subject<string> = new Subject<string>();
    updateTable$: Subject<null> = new Subject<null>();
    pagination: CustomPaginationConfig;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    /**
     * Handlers
     */
    onChangeTable(): void {
        this.updateTable$.next();
    }

    onCellClick(data: any): void {
        if (data.column === 'view') {
            this.router.navigate([`/accounts`, data.row.id]);
        }
        else if (data.column === 'remove') {
            this.accountService.remove(data.row.id)
                .subscribe(
                    () => {this.updateTable$.next()},
                    err => console.log(err)
                );
        }
    }

    onChangePage(page: number): void {
        this.pagination.page = page;
        this.updateTable$.next();
    }

    onFilterTable(value: string): void {
        this.filterName$.next(value);
    }

    /**
     * Hooks
     */
    ngOnInit(): void {
        this.pagination = new CustomPaginationConfig();

        this.updateTable$
            .switchMap(() => this.getAllAccounts())
            .takeWhile(() => this.alive)
            .subscribe(
                res => {
                    this.pagination.totalItems = res.count;
                    this.generateRows(res.data);
                },
                err => console.log(err)
            );

        this.filterName$
            .debounceTime(300)
            .distinctUntilChanged()
            .takeWhile(() => this.alive)
            .subscribe(
                name => {
                    this.tableConfig.filtering.filterString = name;
                    this.updateTable$.next();
                },
                err => console.log(err)
            );

        this.updateTable$.next();
    }

    ngOnDestroy() {
        this.alive = false;
    }

    /**
     * Helpers
     */
    private alive: boolean = true;

    // this is sort of hack, ng2-table cant create btns in a row
    private generateRows(accounts: Account[]): void {
        let rows: any = accounts;
        rows.filter((item, i, arr) => {
            item.view = '<button class="btn btn-info">View</button>';
            item.remove = '<button class="btn btn-danger">Delete</button>';
        });

        this.rows = rows;
    }

    private getAllAccounts(): Observable<AccountsWithCount> {
        let params = new URLSearchParams();
        let sortItem = this.tableConfig.sorting.columns.find(item => item.sort);
        if (sortItem) {
            params.set('sort', sortItem.name);
            params.set('order', sortItem.sort);
        }
        params.set('query', this.tableConfig.filtering.filterString);
        params.set('limit', this.pagination.limit.toString());
        params.set('offset', this.pagination.countOffset().toString());

        return this.accountService.getAll(params);
    }
}