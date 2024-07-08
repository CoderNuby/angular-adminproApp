
import { environment } from "../../environments/environment.development";
import { UserModel } from "./user.model";

const url = environment.apiUrl + "/images/hospitals";

export class HospitalModel {
    constructor(
        public name: string,
        public image?: string,
        public user?: UserModel,
        public _id?: string
    ) {

    }

    get imagePath() {
        if(this.image) {
            return `${url}/${this.image}`;
        }else {
            return `${url}/no-image`;
        }
    }
}