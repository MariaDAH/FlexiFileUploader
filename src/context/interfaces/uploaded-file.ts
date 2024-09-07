export interface UploadedFile {
    uploadUrl: string;
    connector: Connectors;
    status: UploadStatus;
    downloadUrl: string;
}