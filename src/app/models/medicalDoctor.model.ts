
import { environment } from "../../environments/environment.development";
import { HospitalModel } from "./hospital.model";
import { UserModel } from "./user.model";

const url = environment.apiUrl + "/images/medicalDoctors";

export class MedicalDoctorModel {
    constructor(
        public name: string,
        public image?: string,
        public user?: UserModel,
        public hospital?: HospitalModel,
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