import { GalleryModel } from '../models/galleryModel';
import { ApiResponse, get, post, put } from '../utils/api';

const GalleryService = () => {
    const baseUrl = 'gallery';

    const insert = async (data: any): Promise<ApiResponse<GalleryModel>> => {
        return post<GalleryModel>(`${baseUrl}/insert`, data);
    };
    const fetch = async (): Promise<ApiResponse<GalleryModel[]>> => {
        return get<GalleryModel[]>(`${baseUrl}/`);
    };
    const update = async (data: any, id: number): Promise<ApiResponse<GalleryModel>> => {
        return put<GalleryModel>(`${baseUrl}/update/${id}`, data);
    };
    const remove = async (id: number): Promise<ApiResponse<GalleryModel>> => {
        return put<GalleryModel>(`${baseUrl}/disable/${id}`);
    };
    return {
        insert,
        fetch,
        update,
        remove,
    };
};
export default GalleryService;
