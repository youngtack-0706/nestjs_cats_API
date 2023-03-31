import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import { UserRepository } from "./repository/user.repository";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService{
    // constructor(
    //     @InjectRepository(User)
    //     private readonly userRepositroy: Repository<User>
    // ){}
    constructor(
        private userRepositroy: UserRepository,
    ){}

    async findByFileds(options: FindOneOptions<User>): Promise<User| undefined>{
        return await this.userRepositroy.findOne(options);
    }

    async save(userDTO: UserDTO): Promise<User| undefined>{
        console.log("before transfrom password: ",userDTO.password);
        await this.transformPassword(userDTO);
        console.log("after transfrom password: ",userDTO.password);
        return await this.userRepositroy.save(userDTO);
    }

    async transformPassword(user: UserDTO): Promise<void>{
        user.password = await bcrypt.hash(
            user.password, 10,
        );
        return Promise.resolve();
    }
}