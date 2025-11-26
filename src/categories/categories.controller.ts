import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private categoriesService: CategoriesService
    ){}

    // --- Route protege ---
    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createCategoryDto: CreateCategoryDto, @Request() req){
        
        // if (req.user.role !== 'admin') {
        //     throw new ForbiddenException('Seuls les administrateurs peuvent créer des catégories.');
        // }
        // 1. Récupérer l'ID de l'utilisateur connecté du JWT
        const authorId = req.user.userId; 
        
        // 2. Passer l'ID au service
        return this.categoriesService.create(createCategoryDto, authorId);
    }

    // -- Lecture publique --
    @Get()
    findAll(){
        // find() sans argument et findAll() renvoi tous la meme chose c'est a dire tout n'est ce pas?
        return this.categoriesService.findAll();
    }

    // -- Renvoi un specifique
    @Get(':id')
    findOne(@Param('id') id: string){
        return this.categoriesService.findOne(id);
    }

    // -- Modification: Protege
    // Etre connecte donc route proteger
    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto ){
        return this.categoriesService.update(id, updateCategoryDto);
    }

    // -- Suppression : bien protege
    @Delete()
    @UseGuards(AuthGuard('jwt'))
    remove(@Param('id') id: string){
        return this.categoriesService.softDelete(id);
    }

    @Delete('force')
    @UseGuards(AuthGuard('jwt'))
    forceDelete(@Param('id') id: string){
        return this.categoriesService.forceDelete(id)
    }


}
