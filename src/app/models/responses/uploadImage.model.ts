export class UploadImageResponse {
    public ok: boolean;
    public message: string;
    public imageName?: string;

    constructor() {
        this.ok = false;
        this.message = "";
    }
}
  