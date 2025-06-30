import { useState } from 'react';
import { dateToString } from '../helper/dateFormmater';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { GalleryModel } from '../../models/galleryModel';

interface GalleryImageMapperProps {
    title: string;
    description: string;
    date_upload: string;
    image_url?: string;
    data?: GalleryModel;
    edit?: (data: any) => void;
    editData?: (data: any) => void;
    deleteRow?: (data?: any) => void;
}

const GalleryImageMapper: React.FC<GalleryImageMapperProps> = ({ title, description, date_upload, image_url, edit, deleteRow, data }) => {
    return (
        <div className="mb-5 flex items-center justify-center">
            <div className="max-w-full w-full bg-white shadow-[4px_6px_10px_-3px_#bfc9d4] rounded-xl border border-white-light dark:border-[#1b2e4b] dark:bg-[#191e3a] dark:shadow-none">
                <div className="py-7 px-6">
                    <div className="-mt-7 mb-7 -mx-6 rounded-tl rounded-tr h-[260px] overflow-hidden">
                        <img src={`${image_url}`} alt="profile" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-primary text-xs mb-1.5 font-bold">{dateToString(date_upload)}</p>
                    <h5 className="text-[#3b3f5c] text-[15px] font-bold mb-4 dark:text-white-light">{title}</h5>
                    <p className="text-white-dark break-words overflow-hidden">{description}</p>
                </div>
            </div>
        </div>
    );
};
export default GalleryImageMapper;
