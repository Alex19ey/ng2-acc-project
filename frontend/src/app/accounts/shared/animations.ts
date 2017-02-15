import { animate, AnimationEntryMetadata, state, style, transition, trigger, keyframes } from '@angular/core';



export const flyIn: AnimationEntryMetadata =
    trigger('flyIn', [
        state('in', style({transform: 'translateX(0)'})),
        transition('void => *', [
            animate(300, keyframes([
                style({opacity: 0, transform: 'translateX(-10%)', offset: 0}),
                style({opacity: 0.5, transform: 'translateX(15px)',  offset: 0.3}),
                style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
            ]))
        ])
    ]);




