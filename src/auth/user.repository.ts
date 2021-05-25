import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthDto } from "./dto/auth.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'; 

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authDto: AuthDto): Promise<void>{
        const {username, password} = authDto;
       
        const user = new User();

        user.username = username;
        const salt = await bcrypt.genSalt();
        user.salt = salt;
        user.password = await this.hashPassword(password, user.salt);

        try {
            await user.save()
        } catch(error){
            if (error.code === '23505'){
                //duplicate username 
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException()
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt)
    }
}