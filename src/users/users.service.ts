import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    // Injection d User
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    // Methode 1: Creer l'utilisateur en hashant son mot de passe en bcrypt
    async create(createUserDto: CreateUserDTO){
        // 1 - Hashon le mdp avec bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(
            createUserDto.password, saltRounds
        );

        // 2 - Creons l'entite User
        const newUser = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });

        // 3 - Sauvegardons dans la base de donnee

        return this.usersRepository.save(newUser);
    }

    // Methode 2: Trouver un User par email
    async findOneByEmail(email: string){
        try {
            // Utiliser createQueryBuilder pour ajouter la colonne 'password'
            const user = await this.usersRepository.createQueryBuilder('user')
                .addSelect('user.password') // <-- DEMANDE EXPLICITE DU HASH
                .where('user.email = :email', { email })
                .getOneOrFail(); // Utiliser getOneOrFail pour lever une erreur si non trouvé

            return user;

        } catch (error) {
            // Renvoie une erreur standard si l'utilisateur n'existe pas
            throw new NotFoundException('Utilisateur inexistant.');
        }
    }

    // Methode 3: Chercher par id
    async findOneById(id: string){
        try{
            // Avec le repository
            return await this.usersRepository.findOneByOrFail({id});
        }catch(error){
            throw new NotFoundException('Utilisateur inexistant.');
        }
    }
}
