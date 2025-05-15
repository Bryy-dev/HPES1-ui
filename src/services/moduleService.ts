import { ModuleModel } from '../models/moduleModel';
import { ApiResponse, get, post, put } from '../utils/api';

const ModuleService = () => {
    const baseUrl = 'module';

    const insert = async (data: any): Promise<ApiResponse<ModuleModel>> => {
        return post<ModuleModel>(`${baseUrl}/insert`, data);
    };
    const fetch = async (): Promise<ApiResponse<ModuleModel[]>> => {
        return get<ModuleModel[]>(`${baseUrl}/`);
    };
    const update = async (data: any, id: number): Promise<ApiResponse<ModuleModel>> => {
        return put<ModuleModel>(`${baseUrl}/update/${id}`, data);
    };
    const remove = async (id: number): Promise<ApiResponse<ModuleModel>> => {
        return put<ModuleModel>(`${baseUrl}/disable/${id}`);
    };
    return {
        insert,
        fetch,
        update,
        remove,
    };
};
export default ModuleService;
