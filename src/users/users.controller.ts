import { Body, Controller, Get, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard copy';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
// import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Creating of user' })
  @ApiResponse({ status: 200, type: User })
  // @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Getting of users' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersService.getAllUsers()
  }

  @ApiOperation({ summary: 'Set role to user' })
  @ApiResponse({ status: 200 })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/role')
  addRole(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto)
  }

  @ApiOperation({ summary: 'Ban user' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.usersService.ban(dto)
  }
}
