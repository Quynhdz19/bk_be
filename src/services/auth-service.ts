import { ServiceBase } from "./core/service-base";
export class AuthServices extends ServiceBase {
  // Implement method call API
  login = async (params: { username: string; password: string }) => {
    return this.post("admin/login", params);
  };
}
