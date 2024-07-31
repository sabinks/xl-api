import { Test, TestingModule } from '@nestjs/testing';
import { MathService } from './math.service';

describe('MathService', () => {
    let service: MathService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MathService],
        }).compile();

        service = module.get<MathService>(MathService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    it('should add to two number', () => {
        const result = service.add(10, 20)
        expect(result).toBe(30)
    })
    it('should multiply to two number', () => {
        const result = service.multiply(10, 20)
        expect(result).toBe(200)
    })
});
