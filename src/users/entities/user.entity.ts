import { Category } from 'src/categories/entities/category.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity('users') // Bonne pratique : spécifier explicitement le nom de la table
export class User {
  
    // 1. Clé Primaire (ID)
    @PrimaryGeneratedColumn('uuid')    
    id: string; // TypeORM gère la génération de l'UUID, le type TS est 'string'.
    
    // 2. Colonnes Standard
    @Column({ name: 'name', nullable: true }) // 'name' n'est pas un nom courant en TypeORM, donc on l'alias.
    lastName: string; // Utiliser un nom de propriété plus clair comme lastName
    
    @Column()
    firstName: string; // Corrigé : 'firstname' en 'firstName' (convention JavaScript)
    
    @Column({ unique: true })
    email: string;

    @Column({select: false})
        password: string;

    // 3. Gestion des Dates (Soft Delete, Created/Updated)
    
    // La colonne de suppression douce (Soft Delete)
    // TypeORM utilise 'timestamp' ou 'date' pour cela, le type TS est 'Date'.
    // J'utilise une simple colonne 'deletedAt' de type Date, ce qui est la convention.
    // @Column({ type: 'timestamp', nullable: true })
    // deletedAt: Date; 

    // Ceci permet à TypeORM de gérer la suppression douce :
    // Quand vous faites repository.delete(id), TypeORM met à jour cette colonne au lieu de supprimer la ligne.
    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt: Date;
    
    // Date de création (méthode standard TypeORM)
    // Le décorateur @CreateDateColumn() gère automatiquement l'insertion de la date/heure actuelle.
    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
    
    // Date de mise à jour (méthode standard TypeORM)
    // Le décorateur @UpdateDateColumn() met à jour la date/heure à chaque UPDATE.
    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;


    // --- RELATION AUTEUR (Many-to-One) ---
    // Relation UN-À-PLUSIEURS : Un utilisateur peut créer plusieurs catégories
    @OneToMany(() => Category, (category) => category.author)
    categories: Category[];

    // Relation UN-À-PLUSIEURS : Un utilisateur peut créer plusieurs posts
    @OneToMany(() => Post, (post) => post.authorId)
    posts: Post[];
    
}