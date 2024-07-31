import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class ActiveStatusClientDto {
    active: boolean;
}
