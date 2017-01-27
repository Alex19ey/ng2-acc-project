import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';

import { AccountService } from "../accounts.service";
import { Account } from "../account.model";
import { CustomPaginationConfig } from "../pagination";



@Component({
    templateUrl: 'account-list.component.html',
    styleUrls: ['account-list.component.scss']
})
export class AccountListComponent implements OnInit {
    /**
     * State
     */
    public rows: Array<any> = [];
    public columns: Array<any> = [
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

    public tableConfig: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: ''},
        className: ['table-striped', 'table-hover']
    };

    public pagination: CustomPaginationConfig;

    constructor(
        private accountService: AccountService,
        private router: Router
    ) {
        this.pagination = new CustomPaginationConfig();
    }

    // this is sort of hack, ng2-table cant create btns in a row
    private generateRows(accounts: Account[]): void {
        this.rows = accounts;
        this.rows.filter((item, i, arr) => {
            item.view = '<button class="btn btn-info">View</button>';
            item.remove = '<button class="btn btn-danger">Delete</button>';
        });
    }

    /**
     * Handlers
     */
    public onChangeTable(event: any): void {
        let params = new URLSearchParams();
        let sortItem = this.tableConfig.sorting.columns.find(item => item.sort);
        if (sortItem) {
            params.set('sort', sortItem.name);
            params.set('order', sortItem.sort);
        }
        params.set('query', this.tableConfig.filtering.filterString);
        params.set('limit', this.pagination.limit.toString());
        params.set('offset', this.pagination.countOffset().toString());

        this.accountService.getAll(params)
            .then(res => {
                this.pagination.totalItems = res.count;
                this.generateRows(res.data);
            })
            .catch(err => {console.log(err);});
    }

    public onCellClick(data: any): any {
        if (data.column === 'view') {
            this.router.navigate([`/accounts`, data.row.id]);

        } else if (data.column === 'remove') {
            this.accountService.remove(data.row.id)
                .then(res => this.onChangeTable(this.tableConfig))
                .catch(err => console.log(err));
        }
    }

    public onChangePage(event): void {
        this.pagination.page = event.page;
        this.onChangeTable(this.tableConfig);
    }

    /**
     * Hooks
     */
    public ngOnInit(): void {
        this.onChangeTable(this.tableConfig);
    }
}