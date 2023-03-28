import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
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

    async validateUser(userDTO: UserDTO): Promise<string | undefined>{
        let userFind: UserDTO = await this.userService.findByFileds({
            where: {
                username: userDTO.username,
            }
        });

        const validatePassword = await bcrypt.compare(userDTO.password, userFind.password);
        
        if(!userFind || !validatePassword){
            throw new UnauthorizedException();
        }else{
            return "login success";
        }
    }
}
