import { Injectable } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

// src/auth/auth.service.ts (Corrigé)

// ... imports

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    // 1. UTILISÉ PAR PASSPORT POUR VÉRIFIER LES IDENTIFIANTS
    async validateUser(email: string, password: string) {
        // NOTE: findOneByEmail doit retourner le MDP (voir correction dans le chapitre précédent)
        const user = await this.userService.findOneByEmail(email); 

        // Si l'utilisateur n'est pas trouvé ou si 'user' est undefined
        if (!user) {
            return null;
        }
        
        // Comparaison du mot de passe
        const passwordCompare = await bcrypt.compare(password, user.password);

        if (passwordCompare) {
            // IMPORTANT : Supprimer le mot de passe avant de retourner l'objet utilisateur.
            const { password: userPassword, ...result } = user;
            return result; // Retourne l'objet user SANS le hash du mot de passe
        }
        return null; // Échec de la validation
    }

    // 2. UTILISÉ POUR GÉNÉRER LE TOKEN JWT
    async login(user: any) { // 'user' est l'objet retourné par validateUser (SANS MDP)
        const payload = { 
            email: user.email, 
            sub: user.id // 'sub' est la convention pour l'ID de l'utilisateur
        };

        return {
            access_token: this.jwtService.sign(payload), // Génère le token
        };
    }
}
