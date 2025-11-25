import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Pour utiliser AuthGuard('local')
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto'; // Importez votre DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/login
  // 1. @UseGuards(AuthGuard('local')): Déclenche la LocalStrategy.
  // 2. Si la stratégie réussit, elle attache l'objet utilisateur (sans MDP) à req.user.
  // 3. La méthode 'login' est ensuite exécutée.
  @Post('login')
  @UseGuards(AuthGuard('local'))
  // NOTE : Le DTO est implicitement validé par la LocalStrategy. 
  // Nous utilisons @Request() pour récupérer l'objet 'user' attaché par Passport.
  async login(@Request() req: any, @Body() loginUserDto: LoginUserDto) {
    // Le corps de la requête (loginUserDto) est déjà validé par la LocalStrategy.
    
    // Le req.user est l'objet retourné par LocalStrategy.validate()
    // 1. Appelez la méthode 'login' du service (celle qui génère le JWT)
    return this.authService.login(req.user);
  }
}