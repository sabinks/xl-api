import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { FileUploadService } from "src/services/file-upload-service/file-upload-service.service";

@Processor('fileUpload')
export class FileUploadProcess {
    constructor(private fileUploadService: FileUploadService) {
    }
    @Process('upload-to-s3')
    async uploadToS3(job: Job) {
        // this.fileUploadService.getPreSignedURL(job)
        console.log(job.data);
    }
}