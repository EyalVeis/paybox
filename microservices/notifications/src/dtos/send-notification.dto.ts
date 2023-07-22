import { IsString } from 'class-validator';

import { Notification } from '../../../../common-interfaces/notification';

export class SendNotificationDto implements Notification {
  @IsString()
  notification: string;
}
