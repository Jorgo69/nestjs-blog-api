// src/posts/posts.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Request, Req, ForbiddenException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundError } from 'rxjs';

// Décorateur principal. Les routes commenceront par /posts.
@Controller('posts')
export class PostsController {
  
  // Injection du PostsService via le constructeur
  constructor(private readonly postsService: PostsService) {}

  // --- 1. POST /posts (Création) ---
  @Post()
  @UseGuards(AuthGuard('jwt')) // <-- SÉCURISÉ PAR JWT
  async create(@Body() createPostDto: CreatePostDTO, @Request() req) {
    // NOTE IMPORTANTE : L'ID de l'auteur (authorId) doit être récupéré ici 
    // L'ID de l'auteur est dans req.user.userId, grâce à JwtStrategy.validate()
    const authorId = req.user.userId;
    // Appel au service avec l'ID réel de l'auteur
    return this.postsService.create(createPostDto, authorId);
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
  @UseGuards(AuthGuard('jwt')) // <-- SÉCURISÉ
  async update(
    @Param('id') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @Request() req: any
  ) {
    const userId = req.user.userId;
    // 1. Trouver le post existant pour vérifier l'auteur
    const existingPost = await this.postsService.findOne(postId);

    // 2. Vérification des droits (Autorisation)
    // On compare l'ID de l'utilisateur connecté (du token) avec l'ID de l'auteur du post
    if (existingPost.author !== userId) {
      // Si l'utilisateur n'est pas l'auteur, on lève une exception 403 Forbidden
      throw new ForbiddenException('Vous n\'êtes pas autorisé à modifier cet article.');
    }

    const sameUser = req.user.userId === this.postsService.findOne(req.user.userId)
    if(!sameUser){
      return throw new NotFoundError('Vous avez pas le droit')
    }
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