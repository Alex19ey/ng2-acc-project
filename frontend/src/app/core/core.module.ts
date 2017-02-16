import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { UserService, UserServiceConfig } from './user.service';
import { PageNotFoundComponent } from './not-found.component';


@NgModule({
    imports: [],
    exports: [ PageNotFoundComponent ],
    declarations: [ PageNotFoundComponent ],
    providers: [ UserService ],
})
export class CoreModule {
    constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }

    static forRoot(config: UserServiceConfig): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                { provide: UserServiceConfig, useValue: config }
            ]
        };
    }
}
