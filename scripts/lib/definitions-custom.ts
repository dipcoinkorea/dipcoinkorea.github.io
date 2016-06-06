enum Direction {
    Top,
    Right,
    Bottom,
    Left
}

interface IPosition {
    x: number;
    y: number;
}

interface IRectangle {
    Top: number;
    Right: number;
    Bottom: number;
    Left: number;
}

interface IPost {
    HTMLContent: string;
    Title?: string;
    Date?: number;
}

interface ITumblrPost {
    date: string;
    type: string;
    id: number;
    text?: string;
    body?: string;
    title?: string;
    photos?: ITumblrPhoto[];
    player?: any;
    embed?: any;
    video_type?: string;
    audio_type?: string;
    tags?: string[];
}

interface ITumblrVideo {
    embed_code: string;
    width: number;
}

interface ITumblrPhotoSrc {
    height: number;
    width: number;
    url: string;
}

interface ITumblrPhoto {
    caption: string;
    height: number;
    original_size: ITumblrPhotoSrc;
    alt_sizes: ITumblrPhotoSrc[];
}