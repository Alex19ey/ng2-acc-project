import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response } from '@angular/http';

import { Account } from './shared/account.model';
import {Observable} from "rxjs";



@Injectable()
export class AccountService {

    private accountsUrl = 'api/v1/accounts';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    getById(id: number): Promise<Account> {
        const url = `${this.accountsUrl}/${id}`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json() as Account)
            .catch(this.errorHandler);
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

    create(account: Account): Promise<Account> {
        return this.http
            .post(this.accountsUrl, JSON.stringify(account), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.errorHandler);
    }

    update(id: number, account: Account): Promise<Account> {
        const url = `${this.accountsUrl}/${id}`;
        return this.http
            .patch(url, JSON.stringify(account), {headers: this.headers})
            .toPromise()
            .then((res) => res.json())
            .catch(this.errorHandler);
    }

    remove(id: number): Observable<null> {
        const url = `${this.accountsUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .map(res => null);
    }

    private errorHandler(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}

export interface AccountsWithCount {
    data: Account[],
    count: number
}