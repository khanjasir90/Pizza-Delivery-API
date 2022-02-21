import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userSchema, UserSchemas } from './schemas/user-schemas';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { resourceLimits } from 'worker_threads';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchemas.name)
    private readonly userModel: Model<UserSchemas>,
    private jwtService: JwtService,
  ) {}

  async createUser(userObj) {
    try {
      const { name, email, address, password } = userObj;
      const userExist = await this.userModel.findOne({ email: email }).exec();
      if (userExist != null)
        throw new BadRequestException('User Already Exist');
      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(userObj.password, saltOrRounds);
      return await new this.userModel({
        name: userObj.name,
        email: userObj.email,
        address: userObj.address,
        password: hashPassword,
      }).save();
    } catch (e) {
      throw new BadRequestException('Some Error Occurred');
    }
  }

  async validateUser(userObj) {
    const user = await this.userModel.findOne({ email: userObj.email });
    console.log(user);
    const hashedPassword = await bcrypt.hash(userObj.password, 10);
    if (user && bcrypt.compare(user.password, hashedPassword)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll() {
    return await this.userModel.find({}).exec();
  }
}
