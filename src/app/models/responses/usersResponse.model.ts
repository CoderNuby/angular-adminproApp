import { UserModel } from "../user.model";

export class UsersResponse {
    ok: boolean;
    message: string;
    users?: UserModel[];
    totalRecords: number;

    constructor() {
        this.ok = false;
        this.message = "";
        this.totalRecords = 0;
    }
}