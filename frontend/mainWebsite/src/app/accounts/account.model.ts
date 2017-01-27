export class Account {
    constructor(
        public id: number,
        public accountName: string,
        public address: string,
        public phone: string,
        public fax: string,
        public city: string,
        public info: string,
        public contactName: string
    ) {}
}