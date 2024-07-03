import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatService {
    private cats = [
        { id: 1, name: "Sam", color: "black" },
        { id: 2, name: "Mitty", color: "gray" }
    ]
    create(createCatDto: CreateCatDto) {
        let newCat = { id: this.cats.length + 1, name: createCatDto.name, color: createCatDto.color }
        this.cats.push(newCat)
    }

    findAll(color: string) {
        if (color) {
            return this.cats.filter(cat => cat.color === color);
        }
        return this.cats
    }

    findOne(id: number) {
        let cat = this.cats.find(cat => cat.id === id);
        if (!cat) {
            throw new Error('Cat Not Found!')
        }
        return cat
    }

    update(id: number, updateCatDto: UpdateCatDto) {
        let catList = this.cats.map(cat => {
            if (cat.id == id) {
                return { ...cat, ...updateCatDto }
            }
            return cat
        })
        this.cats = catList
        return this.findOne(id)
    }

    remove(id: number) {
        this.cats = this.cats.filter(cat => cat.id != id)
    }
}
