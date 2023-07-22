import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoItem, TodoSchema } from './schemas/todo.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/paybox'),
    MongooseModule.forFeature([{ name: TodoItem.name, schema: TodoSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
