import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, maxLength, MinLength } from "class-validator";

export class CreateNewProfileDto {

  @ApiProperty()
  @IsString({ message: "Please use text" })
  @IsNotEmpty({ message: "Username cannot be empty" })
  username: string;

  @ApiProperty()
  @IsString({ message: "Please use text" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  @IsEmail(undefined, { message: "Please enter valid email" })
  email: string;

  @ApiProperty()
  @IsString({ message: "Please use text" })
  @MinLength(4, { message: 'Minimal length is 4' })
  @MaxLength(42, { message: 'Maximal length is 4' })
  @IsNotEmpty({ message: "Password cannot be empty" })
  password: string;
}
