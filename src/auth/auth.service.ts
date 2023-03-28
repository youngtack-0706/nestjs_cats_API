import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

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

    async validateUser(userDTO: UserDTO): Promise<UserDTO | undefined>{
        let userFind: UserDTO = await this.userService.findByFileds({
            where: {
                username: userDTO.username,
            }
        });
        if(!userFind || userDTO.password !== userFind.password){
            throw new UnauthorizedException();
        }else{
            return userFind;
        }
    }
}
