import * as http from 'http';
import { RequestOptions } from 'http';

export class NotificationsGateway {
  private readonly urlPath: string = 'http://localhost:3002/api';

  async sendNotification(notification: string) {
    const postData: string = JSON.stringify({ notification: notification });
    const options: RequestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    const url: string = `${this.urlPath}`;

    return this.createHttpRequest(options, url, postData);
  }

  private createHttpRequest(options: RequestOptions, url: string, data: string = null): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const req = http.request(url, options, res => {
        let responseData = '';
        res.on('error', (err) => {
          console.error(`Response error: ${err.message}`);
        });
        res.on('data', chunk => {
          responseData += chunk;
        });
        res.on('end', () => {
          try {
            const parsedResponse = responseData.length ? JSON.parse(responseData) : '';

            if (res.statusCode >= 400) {
              throw new Error(parsedResponse.message);
            }

            console.log(`${options.method} request was sent to Todos server successfully.`);
            resolve(parsedResponse);
          } catch (err) {
            reject(err);
          }
        });
      });
      req.on('error', (err) => {
        console.error(`Request error: ${err.message}`);
        reject(err);
      });

      if (data) {
        req.write(data);
      }

      req.end();
    });
  }
}
