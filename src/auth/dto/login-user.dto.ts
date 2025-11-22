import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDTO{
    @IsNotEmpty({message: 'L\'email est requis'})
    @IsString()
    @IsEmail({
        blacklisted_chars: "!?#$%^&*(){}[]|\\/",
    }, {
        message: "L'adresse mail n'est pas valide",
    })
        email: string

    @IsString({
        message: 'Le mot de passe devra etre chaine de caractere'
    })
    @IsNotEmpty({
        message: 'Le mot de passe est requis'
    })
    @MinLength(8, {
        message: "Le mot de passe doit contenir au moins 8 caracteres"
    })
        password: string
}