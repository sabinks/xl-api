import { Test, TestingModule } from '@nestjs/testing';
import { BookAppointmentsService } from './book-appointments.service';

describe('BookAppointmentsService', () => {
    let service: BookAppointmentsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BookAppointmentsService],
        }).compile();

        service = module.get<BookAppointmentsService>(BookAppointmentsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
