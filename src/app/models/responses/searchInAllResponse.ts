import { HospitalModel } from "../hospital.model";
import { MedicalDoctorModel } from "../medicalDoctor.model";
import { UserModel } from "../user.model";

export class SearchInAllResponse {
    ok: boolean;
    message: string;
    users?: UserModel[];
    medicalDoctors?: MedicalDoctorModel[];
    hospitals?: HospitalModel[];

    constructor() {
        this.ok = false;
        this.message = "";
    }
}