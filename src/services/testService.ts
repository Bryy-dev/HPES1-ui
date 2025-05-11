import { testModel } from '../models/testModel';
import { ApiResponse, get, post, put } from '../utils/api';

const TestService = () => {
    const baseUrl = 'test';

    const test = async (): Promise<ApiResponse<testModel[]>> => {
        return get<testModel[]>(`${baseUrl}`);
    };

    

    return {
        test,
        
    };
};
export default TestService;
