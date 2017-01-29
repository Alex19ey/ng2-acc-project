import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { Account } from './shared/account.model';
import { Observable } from "rxjs";



@Injectable()
export class AccountService {

    private accountsUrl = 'api/v1/accounts';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(
        private http: Http
    ) {}

    getById(id: number): Observable<Account> {
        const url = `${this.accountsUrl}/${id}`;
        return this.http
            .get(url)
            .map(res => res.json() as Account);
    }

    getAll(params: URLSearchParams): Observable<AccountsWithCount> {
        return this.http
            .get(this.accountsUrl, { search: params })
            .map(res => {
                return {
                    data: res.json() as Account[],
                    count: +res.headers.get('X-Count')
                }
            });
    }

    create(account: Account): Observable<Account> {
        return this.http
            .post(this.accountsUrl, JSON.stringify(account), {headers: this.headers})
            .map(res => res.json() as Account);
    }

    update(id: number, account: Account): Observable<Account> {
        const url = `${this.accountsUrl}/${id}`;
        return this.http
            .patch(url, JSON.stringify(account), {headers: this.headers})
            .map(res => res.json() as Account);
    }

    remove(id: number): Observable<string> {
        const url = `${this.accountsUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .map(res => null);
    }
}

export interface AccountsWithCount {
    data: Account[],
    count: number
}