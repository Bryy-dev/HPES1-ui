import { NewsAndEventsModel } from '../models/news&EventsModel';
import { testModel } from '../models/testModel';
import { ApiResponse, get, post, put } from '../utils/api';

const NewsAndEventsService = () => {
    const baseUrl = 'newsAndEvents';

    const submitForm = async (data: any): Promise<ApiResponse<NewsAndEventsModel>> => {
        return post<NewsAndEventsModel>(`${baseUrl}/submit`, data);
    };
    const getNewsAndEvents = async (): Promise<ApiResponse<NewsAndEventsModel[]>> => {
        return get<NewsAndEventsModel[]>(`${baseUrl}/`);
    };
    const getNewsAndEventsById = async (id: number): Promise<ApiResponse<NewsAndEventsModel>> => {
        return get<NewsAndEventsModel>(`${baseUrl}/${id}`);
    };

    const getAll = async (): Promise<ApiResponse<NewsAndEventsModel[]>> => {
        return get<NewsAndEventsModel[]>(`${baseUrl}/public`);
    };
    const getCalendarEvent = async (): Promise<ApiResponse<NewsAndEventsModel[]>> => {
        return get<NewsAndEventsModel[]>(`${baseUrl}/event/calendar`);
    };

    const update = async (data: any, id: number): Promise<ApiResponse<NewsAndEventsModel>> => {
        return put<NewsAndEventsModel>(`${baseUrl}/${id}`, data);
    };
    return {
        submitForm,
        getNewsAndEvents,
        update,
        getAll,
        getCalendarEvent,
        getNewsAndEventsById,
    };
};
export default NewsAndEventsService;
