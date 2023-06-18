import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Form of email is not correct' })
  readonly email: string

  @ApiProperty({ example: '12345', description: 'Password' })
  @IsString({ message: 'Password should be a string' })
  @Length(4, 16, { message: 'Not less than 4 and non bigger then 16' })
  readonly password: string
}