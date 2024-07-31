import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException, ParseIntPipe, ValidationPipe, UsePipes, UseFilters, ForbiddenException } from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Controller('cat')
export class CatController {
    constructor(private readonly catService: CatService) { }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createCatDto: CreateCatDto) {
        return new ForbiddenException()
        return this.catService.create(createCatDto);
    }

    @Get()
    findAll(@Query('color') color: 'black' | 'gray') {
        return this.catService.findAll(color);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.catService.findOne(id);
        } catch (error) {
            throw new NotFoundException()
        }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body(new ValidationPipe) updateCatDto: UpdateCatDto) {
        return this.catService.update(+id, updateCatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.catService.remove(+id);
    }
}
