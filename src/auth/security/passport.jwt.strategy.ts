import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import passport from "passport";
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from "../auth.service";
import { User } from "../entity/user.entity";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private authService: AuthService
    ){
        super({
            jwtFormRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'), 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: "SECRET_KEY",
        })
    }

    async validate(payload: Payload, done: VerifiedCallback): Promise<any>{
        const user = await this.authService.tokenValidateUser(payload);

        if(!user){
            return done(new UnauthorizedException({message: "user does not exist!"}), false)
        }else{
            return done(null, user)
        }
    }
}

