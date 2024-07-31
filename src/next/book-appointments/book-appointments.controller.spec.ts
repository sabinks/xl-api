import { Test, TestingModule } from '@nestjs/testing';
import { BookAppointmentsController } from './book-appointments.controller';
import { BookAppointmentsService } from './book-appointments.service';

describe('BookAppointmentsController', () => {
    let controller: BookAppointmentsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BookAppointmentsController],
            providers: [BookAppointmentsService],
        }).compile();

        controller = module.get<BookAppointmentsController>(BookAppointmentsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
