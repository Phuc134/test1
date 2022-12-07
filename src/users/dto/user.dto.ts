import { IsString, MaxLength, MinLength, Matches } from 'class-validator';
export class UserDTO {
  name: string;
  email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  password: string;
  typeUser: number;
}
