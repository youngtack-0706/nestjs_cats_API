import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from './config/typeOrmExModule';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: {expiresIn: "300s"},
    })            
  ],
  exports: [TypeOrmExModule],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
