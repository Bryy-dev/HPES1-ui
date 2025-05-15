export interface GalleryModel {
    id?: number;
    title: string;
    description: string;
    date_upload: string; // date of event or news (ISO format recommended)
    image_url?: string;
    disabled: string; // when this was uploaded (also ISO format)
}
