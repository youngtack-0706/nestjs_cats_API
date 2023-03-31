import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "../entity/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector
    ){}

    canActivate(context: ExecutionContext): any {
        const roles = this.reflector.get<string[]> ('roles', context.getHandler)

        if(!roles){
            return true;
        }else{
            const request = context.switchToHttp().getRequest();
            const user = request.user as User;

            return user && user.authorities && user.authorities.some(role => roles.includes(role))
        }
    } 
}