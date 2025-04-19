import { itemImages } from '../../data/ItemImages';

interface GalleryProps {}

const GaleryPage: React.FC<GalleryProps> = ({}) => {
    return (
        <div className="panel">
            <h2 className="header-text text-center">Gallery</h2>{' '}
            <div className="flex">
                <div className="grid grid-cols-8 gap-4">
                    {itemImages.map((item, i) => {
                        return <img src={item.src} className="max-h-full max-w-full object-cover  col-span-2" alt="itemImage" />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default GaleryPage;
