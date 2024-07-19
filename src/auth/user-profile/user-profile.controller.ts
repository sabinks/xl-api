import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('api/user-profile')
export class UserProfileController {
    constructor(private readonly userProfileService: UserProfileService) { }

    @Post()
    create(@Body() createUserProfileDto: CreateUserProfileDto) {
        return this.userProfileService.create(createUserProfileDto);
    }

    @Get()
    findAll() {
        return this.userProfileService.findAll();
    }

    @Get(':id')
    @UseGuards(RolesGuard, AuthGuard('jwt'))
    @Roles(['superadmin'])
    findOne(@Param('id') id: string) {
        return this.userProfileService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
        return this.userProfileService.update(+id, updateUserProfileDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userProfileService.remove(+id);
    }
}
