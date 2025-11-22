// src/posts/dto/update-post.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreatePostDTO } from './create-post.dto';

// PartialType() est une fonction utilitaire de NestJS/Swagger qui prend toutes les
// propriétés d'un DTO (ici CreatePostDto) et les rend toutes OBLIGATOIREMENT OPTIONNELLES.
export class UpdatePostDto extends PartialType(CreatePostDTO) {
  // Aucune propriété supplémentaire n'est nécessaire ici.
  // Toutes les règles de validation de CreatePostDto sont conservées, 
  // mais les décorateurs @IsNotEmpty() sont ignorés.
}