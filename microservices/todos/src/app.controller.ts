import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { AppService } from './app.service';
import { EditTodoDto } from './dtos/edit-todo.dto';
import { CreateTodoDto } from './dtos/create-todo.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post()
  createTodoItem(@Body() body: CreateTodoDto) {
    return this.appService.create(body);
  }

  @Get('/:id')
  getTodoItem(@Param('id') id: string) {
    return this.appService.get(id);
  }

  @Put('/:id')
  editTodoItem(@Param('id') id: string, @Body() body: EditTodoDto) {
    return this.appService.edit(id, body.todo);
  }

  @Delete('/:id')
  deleteTodoItem(@Param('id') id: string) {
    return this.appService.delete(id);
  }
}
