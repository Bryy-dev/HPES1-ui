import { BrigadaModel } from '../models/brigadaModel';
import { ApiResponse, get, post, put } from '../utils/api';

const SuggestionService = () => {
    const baseUrl = 'suggestion';

    const insert = async (data: any): Promise<ApiResponse<any>> => {
        return post<any>(`${baseUrl}/`, data);
    };

    return {
        insert,
    };
};
export default SuggestionService;
