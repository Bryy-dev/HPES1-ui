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
import Loading from '../../components/loader';
import ErrorMsg from '../../components/ErrorMsg';
import { Component } from 'lucide-react';
import ComponentHeader from '../../components/Header';

interface GalleryProps {}

const GaleryPage: React.FC<GalleryProps> = ({}) => {
    const galleryService = GalleryService();

    const {
        data: galleryData,
        refetch: refetchData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['gallery'],
        queryFn: () => galleryService.fetchAll(),
    });

    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDescription, setShowDescription] = useState(true);
    const [selectedImage, setSelectedImage] = useState({ src: '', title: '', description: '' });
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
            <div className="px-3 md:px-8 md:py-8">
                <ComponentHeader title="School Gallery" desktopSize="4xl" />

                {isLoading && <Loading />}
                {isError && <ErrorMsg />}
                {galleryData && galleryData.data && (
                    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-6">
                        {galleryData?.data.map((gallery, index) => (
                            <div key={gallery.id} className="transform transition-transform duration-300 hover:scale-105" onClick={() => handleImageClick(gallery)}>
                                <GalleryImageMapper title={gallery.title} description={gallery.description} date_upload={gallery.date_upload} image_url={gallery.image_url} data={gallery} />
                            </div>
                        ))}
                    </div>
                )}

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
