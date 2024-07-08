import { HospitalModel } from "../hospital.model";

export class HospitalsResponse {
    ok: boolean;
    message: string;
    hospitals?: HospitalModel[];
    totalRecords: number;

    constructor() {
        this.ok = false;
        this.message = "";
        this.totalRecords = 0;
    }
}