import { IsNotEmpty, IsString, IsBoolean, IsUUID, IsOptional, ArrayMinSize, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer'; // Nécessaire pour les DTOs imbriqués ou les transformations

export class CreateUserDTO {
  
  // Le nom de l'utilisateur ne doit pas être vide et doit être une chaîne.
  @IsNotEmpty({ message: 'Le nom est obligatoire.' })
  @IsString()
  lastName: string;

  // Le prenom ne doit pas être vide et doit être une chaîne.
  @IsNotEmpty({ message: 'Le prenom est obligatoire.' })
  @IsString()
  firstName: string;

  @IsNotEmpty({ message: 'L\'email est obligatoire '})
  @IsEmail()
  email: string;

  // Le prenom ne doit pas être vide et doit être une chaîne.
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire.' })
  @MinLength(8,
    {message: 'Le mot de passe doit avoir 8 caractere'}
  )
  @IsString()
  password: string;
}