type ContentType = 'event' | 'news';

interface MediaItem {
    id: number;
    url: string;
    alt?: string; // optional alternative text
}

export interface NewsAndEventsModel {
    id?: number;
    title: string;
    type: ContentType;
    description: string;
    date: string; // date of event or news (ISO format recommended)
    created_at?: string; // when this was uploaded (also ISO format)
    images: MediaItem[];
}
