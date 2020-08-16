interface ImgurFilter {
    section: string;
    sort: string;
    window: string;
    page: string;
    showViral: boolean;
}

interface SelectOption {
    value: string;
    text: string;
}

interface GalleryImage {
    id: string;
    title: string;
    description: [string, null];
    datetime: number;
    cover: string;
    cover_width: number;
    cover_height: number;
    account_url: string;
    account_id: string;
    privacy: string;
    layout: string;
    views: number;
    link: string;
    ups: number;
    downs: number;
    points: number;
    score: number;
    is_album: boolean;
    vote: string;
    favorite: string;
    nsfw: boolean;
    section: string;
    comment_count: number;
    favorite_count: number;
    topic: string;
    topic_id: string;
    images_count: number;
    in_gallery: boolean;
    is_ad: boolean;
    tags: Array;
}
