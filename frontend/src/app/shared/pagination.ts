

export class CustomPaginationConfig {
    public maxSize: number = 5;
    public page: number = 1;
    public totalItems: number = 0;
    public limit: number = 10;
    public offset: number = 0;

    public countOffset(): number {
        return (this.page - 1) * this.limit;
    }
}