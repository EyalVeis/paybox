import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Todo } from '../../../../common-interfaces/todo';
import { TodoItem } from './schemas/todo.schema';
import { TodosGateway } from './todos.gateway';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class TodosService {

  constructor(
    @InjectModel(TodoItem.name) private readonly todoModel: Model<TodoItem>,
    private readonly todosGateway: TodosGateway,
    private readonly notificationsGateway: NotificationsGateway) {
  }


  async create(todo: Todo): Promise<Todo> {
    const createdTodo: Todo = await this.todosGateway.create(todo);

    const currentTime: number = new Date().getTime();
    const todoTime: number = (new Date(todo.date)).getTime();
    const timeDifference: number = todoTime - currentTime;

    if (timeDifference <= 0) {
      console.log('The deadline for the todo has already passed.');
      return null;
    }

    setTimeout(async () => {
      const currentTodo = await this.todosGateway.get(createdTodo.id);
      await this.notificationsGateway.sendNotification(currentTodo.todo);
    }, timeDifference);

    return createdTodo;
  }

  async edit(id: string, newTodo: string): Promise<Todo> {
    const updatedTodo = await this.todosGateway.edit(id, newTodo);
    if (!updatedTodo) {
      console.log('The required todo was not found');
    }
    console.log(`Todo with id=${id} was updated successfully, the new todo is: ${newTodo}.`);
    return updatedTodo;
  }

  async delete(id: string): Promise<Todo> {
    const deletedTodo = this.todosGateway.delete(id);
    console.log(`Todo with id=${id} was deleted successfully.`);
    return deletedTodo;
  }
}
