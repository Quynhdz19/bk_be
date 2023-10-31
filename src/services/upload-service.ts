import { RcFile } from "antd/lib/upload";
import { ServiceBase } from "./core/service-base";
export class JsonServices extends ServiceBase {
    // Implement method call API
    uploadSingles = async (params: { file: RcFile }) => {
        const form = new FormData();
        form.append('file', params.file);

        const response = await this.post("json/upload", form).catch(res => res.response);
        return response.data
    };
    getQueuedJson = (params: any) => {
        return this.get('/json/queue/status', params).then(res => res.data);
    }
    markQueuedJsonAsRead = (id: string, param: any) => {
        return this.patch('/json/queue/status/' + id, param).then(res => res.data).catch(res => res.data)
    }
    markAllQueuedJsonAsRead = () => {
        return this.patch('/json/queue/mark-all-as-read', {}).then(res => res.data).catch(res => res.data)
    }
}
