import { Controller, Get, Post, Body, Param, Delete, Put, Query, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { mongo } from 'mongoose';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Public } from '@/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.register(createUserDto);
  }

  @Public()
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto);
  }

  @Delete('all')
  async deleteAll() {
    return await this.usersService.deleteAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (mongo.ObjectId.isValid(id)) {
      return await this.usersService.remove(id);
    }
  }


}
