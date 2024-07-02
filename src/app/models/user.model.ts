
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
}

type RoleType = "USER_ROLE" | "ADMIN_ROLE";