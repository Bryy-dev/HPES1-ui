import { BrigadaModel } from '../models/brigadaModel';
import { ApiResponse, get, post, put } from '../utils/api';

const SurveyService = () => {
    const baseUrl = 'survey';

    const fetchAll = async (): Promise<ApiResponse<any>> => {
        return get<any>(`${baseUrl}/`);
    };

    return {
        fetchAll,
    };
};
export default SurveyService;
