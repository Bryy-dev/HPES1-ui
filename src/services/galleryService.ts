import { GalleryModel } from '../models/galleryModel';
import { ApiResponse, get, post, put } from '../utils/api';

const GalleryService = () => {
    const baseUrl = 'gallery';

    const fetchAll = async (): Promise<ApiResponse<GalleryModel[]>> => {
        return get<GalleryModel[]>(`${baseUrl}/`);
    };

    return {
        fetchAll,
    };
};
export default GalleryService;
