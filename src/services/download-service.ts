import { filteredObj } from "src/helpers/filter-object";
import { ServiceBase } from "./core/service-base";
export class DownloadServices extends ServiceBase {
  getAllFiles = async (params?: object) => {
    return this.get("json/download", filteredObj(params));
  };

  getAllVersionOfFile = async (filename: string, params: object) => {
    return this.get(`json/${filename}/all-versions`, filteredObj(params));
  };

  downloadFileVersion = async ({
    filename,
    version,
  }: {
    filename: string;
    version: number;
  }) => {
    return this.get(`json/download/${filename}/${version}`);
  };
}
