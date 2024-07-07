
export class RootService {

  constructor() { }

  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers() {
    return {
      "x-token": this.token
    }
  }
}
