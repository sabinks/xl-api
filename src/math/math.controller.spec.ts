import { Test, TestingModule } from '@nestjs/testing';
import { MathController } from './math.controller';
import { MathService } from './math.service';

describe('MathController', () => {
    let controller: MathController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MathController],
            providers: [MathService]
        }).compile();

        controller = module.get<MathController>(MathController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    it('should get message', () => {
        const result = controller.getHello()
        expect(result).toBe('Hello World!')
    })
});
