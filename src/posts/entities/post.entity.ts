import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn('uuid')
        id: string

    @Column()
        title: string

    @Column('text')
        content: string

    @Column({default: false})
        isPublished: boolean

    @DeleteDateColumn({type: 'timestamp', nullable: true})
        deletedAt: Date

    @CreateDateColumn({type: 'timestamp'})
        createdAt: Date

    @UpdateDateColumn({type: 'timestamp'})
        updatedAt: Date

    // --- Relations (Équivalent des relations Eloquent) ---

    // Relation PLUSIEURS-À-UN (Many-to-One) : Plusieurs articles (Posts) ont un seul auteur (User).
    // TypeORM crée automatiquement la colonne 'authorId' dans cette table (Post).
    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'authorId' }) // Assure que la colonne s'appelle bien 'authorId'
    authorId: User;

    // Relation PLUSIEURS-À-PLUSIEURS (Many-to-Many)
    // @JoinTable crée la table de jointure (pivot) 'post_categories_category'
    @ManyToMany(() => Category, (category) => category.posts, { cascade: true })
    @JoinTable({
        name: 'post_categories', // Nom de la table pivot
        // Définitions des clés étrangères dans la table pivot (similaire à Laravel)
        joinColumn: { name: 'postId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'categoryId', referencedColumnName: 'id' },
    })
    categories: Category[];
}

