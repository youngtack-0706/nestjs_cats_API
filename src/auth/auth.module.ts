import { Module } from '@nestjs/common';
import AuthController from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from './config/typeOrmExModule';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  exports: [TypeOrmExModule],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
