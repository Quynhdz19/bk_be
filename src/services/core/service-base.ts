import { HttpClient } from "./http-service";

interface Dict<T> {
  [key: string]: T;
  [key: number]: T;
}

export interface ChangeListener {
  (event: any): any;
}

export class ServiceBase extends HttpClient {
  private onChangeListeners: Dict<ChangeListener> = {};

  get = async (url: string, params?: any): Promise<any> => {
    const response = await this.axiosInstance.get(url, { params });
    return response;
  };

  put = async (url: string, data: any): Promise<any> => {
    const response = await this.axiosInstance.put(url, data);
    return response;
  };

  patch = async (url: string, data: any): Promise<any> => {
    const response = await this.axiosInstance.patch(url, data);
    return response;
  };

  post = async (url: string, params: any): Promise<any> => {
    const response = await this.axiosInstance.post(url, params,{});
    return response;
  };

  delete = async (url: string, id: number): Promise<any> => {
    const response = await this.axiosInstance.delete(`${url}/${id}`);
    return response;
  };

  deleteByUrl = async (url: string): Promise<any> => {
    const response = await this.axiosInstance.delete(url);
    return response;
  };

  update = async (
    url: string,
    id: number | undefined,
    params: any
  ): Promise<any> => {
    const response = await this.axiosInstance.patch(`${url}/${id}`, params);
    return response;
  };

  subscribe(key: string, listener: ChangeListener) {
    if (this.onChangeListeners[key]) return;
    this.onChangeListeners[key] = listener;
  }

  unsubcribe(key: string) {
    delete this.onChangeListeners[key];
  }

  fire(data: any) {
    Object.values(this.onChangeListeners).forEach((listener) => listener(data));
  }
}
