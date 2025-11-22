// src/posts/posts.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

// Décorateur principal. Les routes commenceront par /posts.
@Controller('posts')
export class PostsController {
  
  // Injection du PostsService via le constructeur
  constructor(private readonly postsService: PostsService) {}

  // --- 1. POST /posts (Création) ---
  @Post()
  async create(@Body() createPostDto: CreatePostDTO) {
    // NOTE IMPORTANTE : L'ID de l'auteur (authorId) doit être récupéré ici 
    // à partir de l'utilisateur authentifié (via JWT), une étape que nous ferons plus tard.
    // Pour l'instant, utilisons un ID de placeholder temporaire.
    const tempAuthorId = '9371d332-94f4-4340-84c1-49b29d4c2b92'; // Remplacez par un vrai UUID dans votre .env

    return this.postsService.create(createPostDto, tempAuthorId);
  }

  // --- 2. GET /posts (Lecture de tous) ---
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  // --- 3. GET /posts/:id (Lecture d'un seul) ---
  // @Param('id') récupère l'UUID dans l'URL.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  // --- 4. PATCH /posts/:id (Mise à jour) ---
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  // --- 5. DELETE /posts/:id (Suppression) ---
  // @HttpCode(HttpStatus.NO_CONTENT) renvoie un statut 204 (Pas de contenu) pour une suppression réussie
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.postsService.remove(id);
  }
}