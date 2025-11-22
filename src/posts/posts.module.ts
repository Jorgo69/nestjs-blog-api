import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
    imports: [
        // Ceci rend le Repository du Post injectable dans PostsService
        TypeOrmModule.forFeature([Post]),
    ],
    providers: [PostsService],
    controllers: [PostsController]
})
export class PostsModule {}
