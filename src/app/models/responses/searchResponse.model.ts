import { UserModel } from "../user.model";

export class SearchResponse {
    ok: boolean;
    message: string;
    data: UserModel[];
    totalRecords: number;

    constructor() {
        this.ok = false;
        this.message = "";
        this.totalRecords = 0;
        this.data = [];
    }
}