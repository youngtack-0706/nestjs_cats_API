import { Repository } from "typeorm";
import { CustomRepository } from "./config/decoraotr";
import { User } from "./entity/user.entity";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    
}