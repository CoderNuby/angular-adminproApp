import { MedicalDoctorModel } from "../medicalDoctor.model";

export class MedicalDoctorsResponse {
    ok: boolean;
    message: string;
    medicalDoctors?: MedicalDoctorModel[];
    totalRecords: number;

    constructor() {
        this.ok = false;
        this.message = "";
        this.totalRecords = 0;
    }
}