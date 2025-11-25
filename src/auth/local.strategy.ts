// Imports (PassportStrategy, Strategy, Injectable, UnauthorizedException, AuthService)
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
// On utilise la stratégie 'local'. La classe doit étendre PassportStrategy et la stratégie de base
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  // 1. Injection
  constructor(private authService: AuthService) {
    // 2. Appel au super : 
    // On doit spécifier les champs d'identification (usernameField)
    super({
        usernameField: 'email', // On dit à Passport d'utiliser le champ 'email' comme nom d'utilisateur
    });
  }

  // 3. Méthode de validation : Elle reçoit l'email et le password du corps de la requête.
  // Le rôle est d'appeler le service pour valider.
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    
    // Si la validation échoue (AuthService retourne null)
    if (!user) {
      // 4. Lancer l'exception pour que Passport renvoie 401 Unauthorized
      throw new UnauthorizedException('Identifiants incorrects');
    }
    
    // Si la validation réussit, Passport stocke cet objet 'user' dans l'objet request.
    return user;
  }
}