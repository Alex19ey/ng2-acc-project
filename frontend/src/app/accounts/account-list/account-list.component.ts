import { Component, OnInit, OnDestroy} from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AccountService, AccountsWithCount } from "../accounts.service";
import { CustomPaginationConfig } from "../../shared/pagination";
import { flyIn } from '../shared/animations';


@Component({
    templateUrl: 'account-list.component.html',
    styleUrls: ['account-list.component.scss'],
    animations: [
        flyIn
    ]
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
        {title: 'Contact name', name: 'contactName'}
    ];
    sortedColumn: any = this.columns[0];
    filterString: string;
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
    sortBy(column: any): void {
        if (this.sortedColumn === column) {
            let sort = this.sortedColumn.sort;
            this.sortedColumn.sort = sort === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortedColumn.sort = '';
            column.sort = 'asc';
            this.sortedColumn = column;
        }

        this.updateTable$.next();
    }

    onDelete(id: number): void {
        this.accountService.remove(id)
            .subscribe(
                () => this.updateTable$.next(),
                err => console.log(err)
            );
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
                    this.rows = res.data;
                },
                err => console.log(err)
            );

        this.filterName$
            .debounceTime(300)
            .distinctUntilChanged()
            .takeWhile(() => this.alive)
            .subscribe(
                name => {
                    this.filterString = name;
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

    private getAllAccounts(): Observable<AccountsWithCount> {
        let params = new URLSearchParams();
        let sortItem = this.columns.find(item => item.sort);
        if (sortItem) {
            params.set('sort', sortItem.name);
            params.set('order', sortItem.sort);
        }
        params.set('query', this.filterString);
        params.set('limit', this.pagination.limit.toString());
        params.set('offset', this.pagination.countOffset().toString());

        return this.accountService.getAll(params);
    }
}