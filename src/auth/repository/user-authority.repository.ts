import { Repository } from "typeorm";
import { CustomRepository } from "../config/decorator";
import { UserAuthority } from "../../domain/user-authority.entity";

@CustomRepository(UserAuthority)
export class UserAuthorityRepository extends Repository<UserAuthority>{
    
}