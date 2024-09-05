export interface File {
    name: string;
    size: number;
    type: MimeTypes;
    extension: string;
    content: ArrayBuffer;
    lastModified: Date;
}