import { Repository } from "typeorm";
import { CustomRepository } from "../config/decorator";
import { User } from "../entity/user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    
}