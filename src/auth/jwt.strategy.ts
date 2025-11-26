// Squelette de src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt'; // <-- ASSUREZ-VOUS D'AVOIR INSTALLÉ @types/passport-jwt
import { ConfigService } from '@nestjs/config';

// Le nom de la stratégie est 'jwt' (ce que nous utiliserons dans @UseGuards)
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {

    super({
      // 1. D'où extraire le JWT (Bearer Token dans l'en-tête Authorization)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 2. Le secret pour décoder le token (doit correspondre à celui utilisé pour la signature)
      secretOrKey: configService.get('jwt.secret') as string,
      // 3. Permet à Passport de gérer l'expiration du token pour nous (si expiré, échec automatique)
      ignoreExpiration: false, 
    });
  }

  // Cette méthode est appelée après que le token a été décodé et vérifié.
  // 'payload' contient l'objet { email, sub: id } que vous avez signé dans AuthService.login().
  async validate(payload: any) {
    // 1. Vous pouvez effectuer ici une vérification supplémentaire (ex: l'utilisateur existe toujours en BDD)
    // const user = await this.usersService.findOneById(payload.sub);
    // if (!user) throw new UnauthorizedException('Utilisateur non trouvé.');
    //    Pour l'instant, on va juste retourner l'ID et l'e-mail du payload.
    
    // Le contenu retourné est attaché à l'objet 'req.user'.
    return { userId: payload.sub, email: payload.email }; 
    // return { userId: payload.sub, email: payload.email, role: payload.role }; // <--- AJOUTER LE RÔLE
  }
}