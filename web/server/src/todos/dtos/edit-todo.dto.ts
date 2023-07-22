import { IsString } from 'class-validator';

export class EditTodoDto {
  @IsString()
  todo: string;
}
