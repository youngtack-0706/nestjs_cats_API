import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './security/auth.guard';

@Controller('auth')
export default class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post('/register')
    async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO): Promise<any>{
        return this.authService.registerUser(userDTO);
    }


    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any>{
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer'+jwt.accessToken);
        return res.json(jwt);
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard)
    isAuthenticated(@Req() req: Request): any{
        const user: any = req.user;
        return user;
    }

}
