import { BrigadaModel } from '../models/brigadaModel';
import { ApiResponse, get, post, put } from '../utils/api';

const SuggestionService = () => {
    const baseUrl = 'suggestion';

    const create = async (data: any): Promise<ApiResponse<any>> => {
        return post<any>(`${baseUrl}/`, data);
    };

    return {
        create,
    };
};
export default SuggestionService;
