import { DocumentModel } from '../models/documentModel';
import { ModuleModel } from '../models/moduleModel';
import { ApiResponse, get, post, put } from '../utils/api';

const DocumentService = () => {
    const baseUrl = 'document';

    const create = async (data: any): Promise<ApiResponse<DocumentModel>> => {
        return post<DocumentModel>(`${baseUrl}/`, data);
    };

    return {
        create,
    };
};
export default DocumentService;
