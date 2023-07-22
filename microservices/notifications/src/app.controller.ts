import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { SendNotificationDto } from './dtos/send-notification.dto';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Post()
  sendNotification(@Body() notification: SendNotificationDto) {
    return this.appService.notify(notification);
  }
}
