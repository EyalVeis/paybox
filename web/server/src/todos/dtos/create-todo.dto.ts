import { IsDateString, IsString } from 'class-validator';

import { Todo } from '../../../../../common-interfaces/todo';

export class CreateTodoDto implements Todo {
  id: string;

  @IsString()
  todo: string;

  @IsDateString()
  date: string;
}
