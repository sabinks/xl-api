import { Injectable } from '@nestjs/common';

@Injectable()
export class MathService {
    add(a: number, b: number): number {
        return a + b
    }

    multiply(a: number, b: number): number {
        return a * b
    }
}
