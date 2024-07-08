import { MedicalDoctorModel } from "../medicalDoctor.model";

export class MedicalDoctorResponse {
    ok: boolean;
    message: string;
    medicalDoctor?: MedicalDoctorModel;

    constructor() {
        this.ok = false;
        this.message = "";
    }
}
  