import { environment } from "../../environments/environment.development";

const url = environment.apiUrl + "/images/users";

export class UserModel {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public image?: string,
        public google?: boolean,
        public role?: RoleType,
        public _id?: string
    ) {

    }

    get imagePath() {
        if(this.google) {
            return this.image;
        }
        if(this.image) {
            return `${url}/${this.image}`;
        }else {
            return `${url}/no-image`;
        }
    }
}

type RoleType = "USER_ROLE" | "ADMIN_ROLE";