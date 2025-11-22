// src/posts/dto/create-post.dto.ts

import { IsNotEmpty, IsString, IsBoolean, IsUUID, IsOptional, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer'; // Nécessaire pour les DTOs imbriqués ou les transformations

export class CreatePostDTO {
  
  // Le titre de l'article ne doit pas être vide et doit être une chaîne.
  @IsNotEmpty({ message: 'Le titre est obligatoire.' })
  @IsString()
  title: string;

  // Le contenu ne doit pas être vide et doit être une chaîne.
  @IsNotEmpty({ message: 'Le contenu de l\'article est obligatoire.' })
  @IsString()
  content: string;

  // Indique si l'article est publié (optionnel, par défaut 'false' dans l'Entité, mais ici on le valide si présent).
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean) // Assure la transformation des chaînes ('true', 'false') en boolean réels
  isPublished?: boolean; // Le '?' indique qu'il est optionnel

  // L'auteur n'est pas inclus ici car il est récupéré à partir du token JWT de l'utilisateur connecté.
  
  // Les catégories (liste d'UUIDs de catégories existantes)
  @IsOptional()
  @ArrayMinSize(1, { message: 'L\'article doit avoir au moins une catégorie.' }) // Au moins 1 UUID dans le tableau
  @IsUUID('4', { each: true, message: 'Chaque identifiant de catégorie doit être un UUID valide.' }) // 'each: true' valide chaque élément du tableau
  categoriesIds?: string[];
}