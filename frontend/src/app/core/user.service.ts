import { Injectable, Optional } from '@angular/core';


@Injectable()
export class UserService {
    private userName = 'Sherlock Holmes';

    constructor(@Optional() config: UserServiceConfig) {
        if (config) { this.userName = config.userName; }
    }
}

export class UserServiceConfig {
    userName = 'Philip Marlowe';
}