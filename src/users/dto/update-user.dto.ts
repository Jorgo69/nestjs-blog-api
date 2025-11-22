// src/posts/dto/update-post.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateUserDTO } from './create-user.dto';

// PartialType() est une fonction utilitaire de NestJS/Swagger qui prend toutes les
// propriétés d'un DTO (ici CreateUserDTO) et les rend toutes OBLIGATOIREMENT OPTIONNELLES.
export class UpdateUserDto extends PartialType(CreateUserDTO) {
  // Aucune propriété supplémentaire n'est nécessaire ici.
  // Toutes les règles de validation de CreateUserDto sont conservées, 
  // mais les décorateurs @IsNotEmpty() seront ignorés si ils existent.
}