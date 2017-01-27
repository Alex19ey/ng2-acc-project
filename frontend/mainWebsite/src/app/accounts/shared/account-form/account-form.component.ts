import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Account } from "../../account.model";



@Component({
    selector: 'my-account-form',
    templateUrl: 'account-form.component.html',
    styleUrls: ['account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
    @Input()
    account: Account;

    ngOnChanges(input) {
        if (!this.accountForm) return;

        this.accountForm.patchValue(input.account.currentValue);
    }

    @Output()
    formSubmit = new EventEmitter();

    /**
     * State
     */
    public accountForm: FormGroup;
    public submitted: boolean;
    public formType: string;

    public formErrors = {
        accountName: '',
        address: '',
        phone: '',
        fax: '',
        city: '',
        info: '',
        contactName: ''
    };
    private commonErrors = {
        'required':  'field is required.',
        'minlength': 'field is too short.',
        'maxlength': 'field is too long.',
        'pattern': 'number is not correct.'
    };
    public validationMessages = {
        accountName: this.commonErrors,
        address: this.commonErrors,
        phone: this.commonErrors,
        fax: this.commonErrors,
        city: this.commonErrors,
        info: this.commonErrors,
        contactName: this.commonErrors
    };

    constructor(
        private router: Router,
        private fb: FormBuilder
    ) {
        this.formType = this.router.url.includes('/create') ? 'create' : 'update';
    }


    /**
     * Handlers
     */
    public onSubmit() {
        this.submitted = true;

        if (!this.accountForm.valid) {
            return this.onValueChanged();
        }

        this.formSubmit.emit(this.accountForm.value);
    }

    onValueChanged(data?: any) {
        if (!this.accountForm) return;
        const form = this.accountForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && (this.submitted || control.dirty) && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }



    /**
     * Hooks
     */
    public ngOnInit(): void {
        const account: Account = this.account || new Account(0,'','','','','','','');

        this.accountForm = this.fb.group({
            accountName: [account.accountName, [Validators.required]],
            address: [account.address, [Validators.required]],
            phone: [account.phone, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^\+?\d+-?\d+-?\d+$/)])],
            fax: [account.fax, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^\+?\d+-?\d+-?\d+$/)])],
            city: [account.city, [Validators.required]],
            info: [account.info, [Validators.required]],
            contactName: [account.contactName, [Validators.required]],
        });

        this.accountForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged();
    }
}