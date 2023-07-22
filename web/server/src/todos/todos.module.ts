import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoItem, TodoSchema } from './schemas/todo.schema';
import { TodosGateway } from './todos.gateway';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoSchema }])],
  controllers: [TodosController],
  providers: [
    TodosService,
    TodosGateway,
    NotificationsGateway
  ]
})
export class TodosModule {
}
