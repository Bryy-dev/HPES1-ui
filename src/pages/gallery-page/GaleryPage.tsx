import GalleryImageMapper from '../../components/gallery/galleryImageMapper';
import { itemImages } from '../../data/ItemImages';
import { GalleryModel } from '../../models/galleryModel';
import GalleryService from '../../services/galleryService';
import { ApiResponse } from '../../utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';

interface GalleryProps {}

const GaleryPage: React.FC<GalleryProps> = ({}) => {
    const galleryService = GalleryService();

    const {
        data: galleryData,
        refetch: refetchData,
        isLoading,
    } = useQuery({
        queryKey: ['gallery'],
        queryFn: () => galleryService.fetch(),
        staleTime: 0,
    });

    return (
        <>
            <div className="panel px-4">
                <div className="mb-10 py-2">
                    <h2 className="text-4xl font-black text-gray-800 dark:text-white ">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Gallery</span>
                    </h2>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {galleryData?.data.map((gallery, index) => (
                        <div key={gallery.id} className="transform transition-transform duration-300 hover:scale-110">
                            <GalleryImageMapper title={gallery.title} description={gallery.description} date_upload={gallery.date_upload} image_url={gallery.image_url} data={gallery} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default GaleryPage;
