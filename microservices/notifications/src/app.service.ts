import { Injectable } from '@nestjs/common';

import { Notification } from '../../../common-interfaces/notification';

@Injectable()
export class AppService {
  notify(notification: Notification): Notification {
    console.log(notification);
    return notification;
  }
}
