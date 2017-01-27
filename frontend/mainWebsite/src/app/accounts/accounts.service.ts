import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { Account } from './account.model';



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

    getAll(params: URLSearchParams): Promise<{ data: Account[], count: number }> {
        return this.http
            .get(this.accountsUrl, { search: params })
            .toPromise()
            .then(response => {
                return {
                    data: response.json() as Account[],
                    count: +response.headers.get('X-Count')
                }
            })
            .catch(this.errorHandler);
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

    remove(id: number): Promise<void> {
        const url = `${this.accountsUrl}/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.errorHandler);
    }

    private errorHandler(error: any): Promise<any> {
        console.log('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}