import { UserModel } from "../user.model";

export class UserResponse {
    ok: boolean;
    message: string;
    user?: UserModel;
    token?: string;

    constructor() {
        this.ok = false;
        this.message = "";
    }
}
  