import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import { hashPassword } from '@/utils/util';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { mongo } from 'mongoose';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';


@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<Users>
  ) { }

  async register(createUserDto: CreateUserDto) {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new BadRequestException('Email already exists');
    }
    return await this.userModel.create(
      {...createUserDto, username: createUserDto.username, password: await hashPassword(createUserDto.password), codeId: uuid(), codeExpired: dayjs().add(1, 'hour').toDate() }
    )
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    return await this.userModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne({ _id: updateUserDto._id }, updateUserDto).exec();
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: new mongo.ObjectId(id) }).exec();
  }

  async deleteAll() {
    return await this.userModel.deleteMany({}).exec();
  }
}
