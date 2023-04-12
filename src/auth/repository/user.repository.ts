import { Repository } from "typeorm";
import { CustomRepository } from "../config/decorator";
import { User } from "../../domain/user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    
}