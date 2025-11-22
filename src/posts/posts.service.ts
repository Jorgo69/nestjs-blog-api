// src/posts/posts.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  // Injection du Repository TypeORM (équivalent à injecter le Modèle Eloquent)
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  // C R E A T E
  async create(createPostDto: CreatePostDTO, authorId: string): Promise<Post> {
    // 1. Crée une instance de l'Entité Post à partir du DTO
    const newPost = this.postsRepository.create({
      ...createPostDto,
    //   authorId, // On ajoute l'ID de l'auteur récupéré via le JWT
      // Note: La logique de liaison des catégories sera plus complexe (voir note ci-dessous)
    });

    // 2. Sauvegarde l'entité en base de données
    return this.postsRepository.save(newPost);
  }

  // R E A D - Tous
  async findAll(): Promise<Post[]> {
    // find() sans arguments récupère tout.
    // 'relations: [...]' est nécessaire pour charger les auteurs et catégories
    return this.postsRepository.find({ relations: ['author', 'categories'] }); 
  }

  // R E A D - Un Seul
  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'categories'],
    });

    if (!post) {
      throw new NotFoundException(`Article avec l'ID ${id} non trouvé.`);
    }

    return post;
  }

  // U P D A T E
  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    // TypeORM permet d'appliquer directement les changements via update()
    const result = await this.postsRepository.update(id, updatePostDto);

    if (result.affected === 0) {
      throw new NotFoundException(`Impossible de mettre à jour l'article ${id}.`);
    }

    // On retourne l'article mis à jour
    return this.findOne(id);
  }

  // D E L E T E
  async remove(id: string): Promise<void> {
    // remove() ou softDelete() pour le Soft Delete
    const result = await this.postsRepository.softDelete(id); 

    if (result.affected === 0) {
        throw new NotFoundException(`Impossible de supprimer l'article ${id}.`);
    }
  }
}