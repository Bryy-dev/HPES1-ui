import { BrigadaModel } from '../models/brigadaModel';
import { DocumentModel } from '../models/documentModel';
import { GalleryModel } from '../models/galleryModel';
import { ModuleModel, ModuleSearchModel } from '../models/moduleModel';
import { NewsAndEventsModel } from '../models/news&EventsModel';

export const newsAndEventsInitialState: NewsAndEventsModel = {
    title: '',
    type: 'news',
    description: '',
    date: '', // date of event or news (ISO format recommended)
    created_at: '', // when this was uploaded (also ISO format)
    images: [],
};
export const galleryInitialState: GalleryModel = {
    title: '',
    description: '',
    date_upload: '',
    disabled: 'no',
    // image_url: '',
};

export const moduleInitialState: ModuleModel = {
    topic: '',
    week: '',
    description: '',
    discussion_date: '',
    subject: '',
    level: '',
};

export const documentInitialState: DocumentModel = {
    email: '',
    name: '',
    student_name: '',
    address: '',
    document_type: '',
    date_requested: '',
    status: '',
};
export const brigadaInitialState: BrigadaModel = {
    email: '',
    name: '',
    company: '',
    contact: '',
    amount: '',
};

export const moduleSearchInitialState: ModuleSearchModel = {
    level: '',
    subject: '',
    week: '',
};
