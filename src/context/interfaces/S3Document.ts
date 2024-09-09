export interface S3Document {
  Bucket: string;
  Key: string;
  ContentType: string;
  Body: ArrayBuffer;
  ACL: string;
}
