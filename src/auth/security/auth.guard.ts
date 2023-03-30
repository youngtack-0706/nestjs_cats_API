import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt'){
    // canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>{
    //     return super.canActivate(context);
    // }
    canActivate(context: ExecutionContext): any {
        return super.canActivate(context);
    }
}