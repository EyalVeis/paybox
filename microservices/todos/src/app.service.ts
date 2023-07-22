import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { TodoItem } from './schemas/todo.schema';
import { Todo } from '../../../common-interfaces/todo';

@Injectable()
export class AppService {
  constructor(@InjectModel(TodoItem.name) private readonly todoModel: Model<TodoItem>) {
  }

  async create(todo: Todo): Promise<Todo> {
    const createdTodo = await this.todoModel.create(todo);
    console.log(`A new todo was created successfully: ${createdTodo}`);

    return {
      ...todo,
      id: createdTodo._id.toString()
    };
  }

  async get(id: string): Promise<Todo> {
    if (!this.isIdValid(id)) {
      console.log('The todo id is not valid.');
      return null;
    }

    const todo = await this.todoModel.findById(id).lean().exec();
    return todo;
  }

  async edit(id: string, newTodo: string) {
    if (!this.isIdValid(id)) {
      console.log('The todo id is not valid.');
      return null;
    }

    const updatedTodo = await this.todoModel
      .findOneAndUpdate(
        { _id: id },
        { todo: newTodo }
      ).lean();
    if (!updatedTodo) {
      console.log('The required todo was not found');
    }
    console.log(`Todo with id=${id} was updated successfully, the new todo is: ${newTodo}.`);
    return updatedTodo;
  }

  async delete(id: string) {
    if (!this.isIdValid(id)) {
      console.log('The id is not valid.');
      return null;
    }

    const deletedTodo = await this.todoModel
      .findByIdAndRemove({ _id: id })
      .lean()
      .exec();
    console.log(`Todo with id=${id} was deleted successfully.`);
    return deletedTodo;
  }

  private isIdValid(id: string): boolean {
    return (id.match(/^[0-9a-fA-F]{24}$/) != null);
  }
}
