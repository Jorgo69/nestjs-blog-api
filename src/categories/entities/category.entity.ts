import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
        id: string

    @Column({unique: true})
        name: string

    @Column('text', { nullable: true})
        description: string


    @DeleteDateColumn({ type: 'timestamp', nullable: true })
        deletedAt: Date;

    @CreateDateColumn({type: 'timestamp'})
        createdAt: Date

    @UpdateDateColumn({type: 'timestamp'})
        updatedAt: Date


    // --- RELATION AUTEUR (Many-to-One) ---

    // 1. Définition de la colonne de la clé étrangère (FK)
    // Elle sera stockée dans cette table ('categories').
    @Column({ name: 'author_id', type: 'uuid' }) // On stocke l'UUID de l'utilisateur
    authorId: string;

    // 2. Définition de la relation || Plusieurs categories peuvent appartenir a 1 User
    @ManyToOne(() => User, (user) => user.categories, {
      eager: false, // Ne pas charger l'utilisateur par défaut
      onDelete: 'SET NULL', // Si l'utilisateur est supprimé, on ne supprime pas la catégorie
    })
    @JoinColumn({ name: 'author_id' }) // Fait le lien avec la colonne 'author_id' ci-dessus
    author: User; // L'objet User complet (relation)

    // C'est l'autre côté de la relation définie dans Post.
    @ManyToMany(() => Post, (post) => post.categories)
    posts: Post[]; // <-- AJOUT NÉCESSAIRE POUR LA BIDIRECTIONNALITÉ


    
}

