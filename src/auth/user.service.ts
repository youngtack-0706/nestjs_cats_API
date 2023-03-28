import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import { UserRepository } from "./user.repository";

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

    async save(user: UserDTO): Promise<User| undefined>{
        return await this.userRepositroy.save(user);
    }
}