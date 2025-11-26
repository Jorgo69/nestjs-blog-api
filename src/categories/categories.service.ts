import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ){}

    // Creation Crud
    async create(createCategoryDto: CreateCategoryDto, authorId: string): Promise<Category>{

        const category = this.categoriesRepository.create({
            ...createCategoryDto,
            authorId
        });

        try {
            return this.categoriesRepository.save(category);
        } catch (error: any) {
            if (error.code === '23505') { // PostgreSQL Unique constraint violation
                throw new Error('Une catégorie avec ce nom existe déjà.');
            }
            throw error;
        }
    }

    // Tout renvoyer cRud
    async findAll(): Promise<Category[]>{
        const categories = await this.categoriesRepository.find({
            relations: ['author', 'posts']
        });

        return categories;
    }

    async findOne(id: string): Promise<Category>{
        const category = await this.categoriesRepository.findOneBy({id});
        
        if(!category){
            throw new NotFoundException("Categorie introuvable")
        }
        return category;
    }

    // U P D A T E
      async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        // TypeORM permet d'appliquer directement les changements via update()
        const result = await this.categoriesRepository.update(id, updateCategoryDto);
    
        if (result.affected === 0) {
          throw new NotFoundException(`Impossible de mettre à jour la catgorie ${id}.`);
        }
    
        // On retourne la catgorie mis à jour
        return this.findOne(id);
      }

      async updateVerify(id: string, updateCategoryDto: UpdateCategoryDto, userId: string, userRole: string): Promise<Category> {
    
        const existingCategory = await this.categoriesRepository.findOneBy({ id });

        if (!existingCategory) {
            throw new NotFoundException(`Catégorie introuvable.`);
        }

        // Autorisation : Seul l'auteur ou un administrateur peut modifier
        if (existingCategory.authorId !== userId && userRole !== 'admin') {
            throw new ForbiddenException('Vous n\'avez pas la permission de modifier cette catégorie.');
        }
        
        // Si l'autorisation est OK, on procède à la mise à jour
        const updatedCategory = Object.assign(existingCategory, updateCategoryDto);
        await this.categoriesRepository.save(updatedCategory);

        return this.findOne(id);
    }
    
      // D E L E T E
      async softDelete(id: string): Promise<void> {
        // le softDelete() pour le Soft Delete
        const result = await this.categoriesRepository.softDelete(id);

        // si c'etait remove on allait faire delete
        // const result = await this.categoriesRepository.delete(id);
    
        if (result.affected === 0) {
            throw new NotFoundException(`Impossible de supprimer la categorie ${id}.`);
        }
      }

      async forceDelete(id: string): Promise<void> {
        // le softDelete() pour le Soft Delete
        const result = await this.categoriesRepository.delete(id);
    
        if (result.affected === 0) {
            throw new NotFoundException(`Impossible de supprimer la categorie ${id}.`);
        }
      }

}
