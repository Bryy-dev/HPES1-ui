import GalleryImageMapper from '../../components/gallery/galleryImageMapper';
import { itemImages } from '../../data/ItemImages';
import { GalleryModel } from '../../models/galleryModel';
import GalleryService from '../../services/galleryService';
import { ApiResponse } from '../../utils/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { useState } from 'react';

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

    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDescription, setShowDescription] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const slides = galleryData?.data.map((gallery) => ({
        src: gallery.image_url,
        title: gallery.title,
        description: showDescription ? gallery.description : '',
    }));

    const handleImageClick = (gallery: any) => {
        setSelectedImage({
            src: gallery.image_url,
            title: gallery.title,
            description: showDescription ? gallery.description : '',
        });
        setOpen(true);
    };

    const handleTap = () => {
        // Toggle description visibility
        if (selectedImage) {
            setSelectedImage((prev) => ({
                ...prev,
                description: prev.description ? '' : galleryData.data.find((g) => g.image_url === prev.image_url)?.description || '',
            }));
        }
    };
    return (
        <>
            <div className="lg:panel px-8">
                <div className="lg:mb-10 mb-4 py-2">
                    <h2 className="lg:text-4xl text-2xl font-black text-gray-800 dark:text-white">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-500">Gallery</span>
                    </h2>
                </div>
                <div className="grid xl:grid-cols-4 grid-cols-1 gap-2">
                    {galleryData?.data.map((gallery, index) => (
                        <div key={gallery.id} className="transform transition-transform duration-300 hover:scale-110" onClick={() => handleImageClick(gallery)}>
                            <GalleryImageMapper title={gallery.title} description={gallery.description} date_upload={gallery.date_upload} image_url={gallery.image_url} data={gallery} />
                        </div>
                    ))}
                </div>

                {selectedImage && (
                    <Lightbox
                        open={open}
                        close={() => setOpen(false)}
                        slides={[selectedImage]} // Only 1 image
                        on={{
                            click: handleTap,
                        }}
                        plugins={[Thumbnails, Captions, Zoom]}
                        zoom={{
                            maxZoomPixelRatio: 4,
                            zoomInMultiplier: 2,
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default GaleryPage;
