import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(
        // 1 - declaration des injections du service user donc users.service 
        private readonly usersService: UsersService
    ){}

    // 2 - Methode d'inscription POST
    @Post()
    create(@Body() createUserDto: CreateUserDTO){
        return this.usersService.create(createUserDto);
    }

    // 3 - 
    @Get(':id')
    findOne(@Param('id') id: string){
        // 1 - utilisons le service pour trouver
        return this.usersService.findOneById(id);
    }
    
}
