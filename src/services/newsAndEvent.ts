import { NewsAndEventsModel } from '../models/news&EventsModel';
import { ApiResponse, get } from '../utils/api';

const NewsAndEventsService = () => {
    const baseUrl = 'newsAndEvents';

    const fetchAll = async (): Promise<ApiResponse<NewsAndEventsModel[]>> => {
        return get<NewsAndEventsModel[]>(`${baseUrl}/`);
    };
    const fetchById = async (id: number): Promise<ApiResponse<NewsAndEventsModel>> => {
        return get<NewsAndEventsModel>(`${baseUrl}/${id}`);
    };

    const landingFetchAll = async (): Promise<ApiResponse<NewsAndEventsModel[]>> => {
        return get<NewsAndEventsModel[]>(`${baseUrl}/landing`);
    };
    const getCalendarEvent = async (): Promise<ApiResponse<NewsAndEventsModel[]>> => {
        return get<NewsAndEventsModel[]>(`${baseUrl}/event/calendar`);
    };

    return {
        fetchAll,
        landingFetchAll,
        getCalendarEvent,
        fetchById,
    };
};
export default NewsAndEventsService;
