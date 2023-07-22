import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Todo } from '../../../../../common-interfaces/todo';

@Schema()
export class TodoItem implements Todo {
  @Prop()
  date: string;

  @Prop()
  id: string;

  @Prop()
  todo: string;
}

export const TodoSchema = SchemaFactory.createForClass(TodoItem);
