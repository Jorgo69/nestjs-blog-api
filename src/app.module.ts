import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './auth/models/user.model/user.model';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend le module disponible globalement
      envFilePath: '.env', // Chemin vers le fichier .env
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true, // Pour rendre le ConfigService disponible partout
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [
          UserModel,
        ], // Spécifier explicitement les entités
        synchronize: configService.get('database.synchronize'),
        logging: configService.get('database.logging'),
        migrations: ['dist/migrations/*.js'], // Configuration des migrations
        migrationsRun: false,
        migrationsTableName: 'migrations',
      }),
      inject: [ConfigService],
    }),

    AuthModule,

    UsersModule,

    CategoriesModule,

    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
