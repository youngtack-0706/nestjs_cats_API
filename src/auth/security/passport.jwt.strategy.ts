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
        
        // var JwtStrategy = require('passport-jwt').Strategy,
        //     ExtractJwt = require('passport-jwt').ExtractJwt;
        // var opts = undefined;
        // opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
        // opts.secretOrKey = "SECRET_KEY";
        // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        //     User.findOne({id: jwt_payload.id}, function(err, user) {
        //         if (err) {
        //             return done(err, false);
        //         }
        //         if (user) {
        //             done(null, user);
        //         } else {
        //             done(null, false);
        //             // or you could create a new account
        //         }
        //     });
        // }));

        if(!user){
            return done(new UnauthorizedException({message: "user does not exist!"}), false)
        }else{
            return done(null, user)
        }
    }
}

