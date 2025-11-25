import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- IMPORTER
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Le service UsersService est maintenant disponible ici
    JwtModule.registerAsync({ // <-- CONFIGURATION AVEC ConfigService
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get('jwt.secret'), // Lire depuis config/configuration.ts
            signOptions: { 
                expiresIn: configService.get('jwt.expiresIn') 
            },
        }),
        inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Plus besoin de déclarer UsersService
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // On exporte JwtModule et AuthService si d'autres modules en ont besoin (ex: Passport)
})
export class AuthModule {}