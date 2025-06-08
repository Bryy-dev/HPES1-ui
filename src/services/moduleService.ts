import { ModuleModel, ModuleSearchModel } from '../models/moduleModel';
import { ApiResponse, get, post, put } from '../utils/api';

const ModuleService = () => {
    const baseUrl = 'module';

    const fetchAll = async (): Promise<ApiResponse<ModuleModel[]>> => {
        return get<ModuleModel[]>(`${baseUrl}/`);
    };

    const search = async (query: string): Promise<ApiResponse<ModuleSearchModel>> => {
        return get<ModuleSearchModel>(`${baseUrl}/search?${query}`);
    };

    return {
        fetchAll,
        search,
    };
};
export default ModuleService;
