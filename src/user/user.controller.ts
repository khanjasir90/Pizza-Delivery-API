import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth-guard';
import { LocalAuth } from './local-auth';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return this.userService.findAll();
  }

  @Post('signup')
  async signup(@Body() body) {
    return await this.userService.createUser(body);
  }

  @Post('login')
  async login(@Body() body) {
    console.log(body);
    return await this.userService.login(body);
  }
}
