import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from './config/typeOrmExModule';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtStrategy } from './dto/passport.jwt.strategy';
import { UserAuthorityRepository } from './repository/user-authority.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, UserAuthorityRepository]),
    JwtModule.register({
      secret: "SECRET_KEY",
      signOptions: {expiresIn: "300s"},
    }),
    PassportModule            
  ],
  exports: [TypeOrmExModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
