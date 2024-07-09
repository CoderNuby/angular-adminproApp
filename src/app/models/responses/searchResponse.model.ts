
export class SearchResponse<T> {
    ok: boolean;
    message: string;
    data: T[];
    totalRecords: number;

    constructor() {
        this.ok = false;
        this.message = "";
        this.totalRecords = 0;
        this.data = [];
    }
}