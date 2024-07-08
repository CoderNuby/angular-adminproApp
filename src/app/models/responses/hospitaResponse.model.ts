import { HospitalModel } from "../hospital.model";

export class HospitalResponse {
    ok: boolean;
    message: string;
    hospital?: HospitalModel;

    constructor() {
        this.ok = false;
        this.message = "";
    }
}
  