import { DocumentModel } from '../models/documentModel';
import { ModuleModel } from '../models/moduleModel';
import { ApiResponse, get, post, put } from '../utils/api';

const DocumentService = () => {
    const baseUrl = 'document';

    const insert = async (data: any): Promise<ApiResponse<DocumentModel>> => {
        return post<DocumentModel>(`${baseUrl}/insert`, data);
    };
    const fetch = async (): Promise<ApiResponse<DocumentModel[]>> => {
        return get<DocumentModel[]>(`${baseUrl}/`);
    };
    const update = async (id: number, status: string): Promise<ApiResponse<DocumentModel>> => {
        return put<DocumentModel>(`${baseUrl}/${status}/${id}`);
    };
    const remove = async (id: number): Promise<ApiResponse<DocumentModel>> => {
        return put<DocumentModel>(`${baseUrl}/disable/${id}`);
    };

    const sendEmail = async (data: DocumentModel): Promise<ApiResponse<DocumentModel>> => {
        return post<DocumentModel>(`${baseUrl}/email`,data);
    };
    return {
        insert,
        fetch,
        update,
        remove,
        sendEmail
    };
};
export default DocumentService;
