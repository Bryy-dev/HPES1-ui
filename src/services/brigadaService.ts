import { BrigadaModel } from '../models/brigadaModel';
import { ApiResponse, get, post, put } from '../utils/api';

const BrigadaService = () => {
    const baseUrl = 'brigada';

    const insert = async (data: any): Promise<ApiResponse<BrigadaModel>> => {
        return post<BrigadaModel>(`${baseUrl}/insert`, data);
    };
    const fetch = async (): Promise<ApiResponse<BrigadaModel[]>> => {
        return get<BrigadaModel[]>(`${baseUrl}/`);
    };
    const update = async (id: number, status: string): Promise<ApiResponse<BrigadaModel>> => {
        return put<BrigadaModel>(`${baseUrl}/${status}/${id}`);
    };
    const remove = async (id: number): Promise<ApiResponse<BrigadaModel>> => {
        return put<BrigadaModel>(`${baseUrl}/disable/${id}`);
    };
    return {
        insert,
        fetch,
        update,
        remove,
    };
};
export default BrigadaService;
