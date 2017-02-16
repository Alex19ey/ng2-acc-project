import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ng2-bootstrap/pagination';

import { AwesomePipe } from './awesome.pipe';
import { HighlightDirective } from './highlight.directive';



@NgModule({
    imports: [ CommonModule ],
    declarations: [ AwesomePipe, HighlightDirective ],
    exports: [
        CommonModule,
        FormsModule,
        PaginationModule,
        AwesomePipe,
        HighlightDirective
    ],
})
export class SharedModule { }
