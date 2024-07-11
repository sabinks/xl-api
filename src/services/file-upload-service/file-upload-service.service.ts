import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
@Injectable()
export class FileUploadService {
    constructor() { }

    async getPreSignedURL(bucketName: string, key: string, contentType: string) {
        const region = process.env.AWS_BUCKET_REGION;
        const accessKey = process.env.AWS_ACCESS_KEY;
        const secretKey = process.env.AWS_SECRET_KEY;

        try {
            const s3 = new S3({
                region: region,
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            });

            let params = {
                Bucket: bucketName,
                Key: key,
                ContentType: contentType,
                Expires: 1800
            };

            return await s3.getSignedUrlPromise('putObject', params);
        } catch (error) {
            throw error;
        }
    }
}
