import { UserModel } from "../user.model";

export class LoginResponse {
    ok: boolean = false;
    message: string = "";
    token?: string;
    user?: UserModel;
}
  