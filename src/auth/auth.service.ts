import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from "bcrypt";
import { Payload } from './security/payload.interface';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,

        private jwtService: JwtService
    ){}

    async registerUser(newUser: UserDTO): Promise<UserDTO>{
        let userFind: UserDTO = await this.userService.findByFileds({
            where: {
                username: newUser.username,
            }
        });

        if(userFind){
            throw new HttpException('Username already used', HttpStatus.BAD_REQUEST);
        }else{
            return await this.userService.save(newUser);
        }
    }

    async validateUser(userDTO: UserDTO): Promise<{accessToken: string} | undefined>{
        let userFind: User = await this.userService.findByFileds({
            where: {
                username: userDTO.username,
            }
        });

        const validatePassword = await bcrypt.compare(userDTO.password, userFind.password);
        
        if(!userFind || !validatePassword){
            throw new UnauthorizedException();
        }else{
            const payload: Payload = {id: userFind.id, username: userFind.username}
            return {
                accessToken: this.jwtService.sign(payload)
            };
        }
    }
}
