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