import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';

import { CreateTodoDto } from './dtos/create-todo.dto';
import { TodosService } from './todos.service';
import { EditTodoDto } from './dtos/edit-todo.dto';
import { Todo } from '../../../../common-interfaces/todo';

@Controller('/api/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

  @Post()
  createTodoItem(@Body() body: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(body);
  }

  @Put('/:id')
  editTodoItem(@Param('id') id: string, @Body() body: EditTodoDto): Promise<Todo> {
    return this.todosService.edit(id, body.todo);
  }

  @Delete('/:id')
  deleteTodoItem(@Param('id') id: string): Promise<Todo> {
    return this.todosService.delete(id);
  }
}
