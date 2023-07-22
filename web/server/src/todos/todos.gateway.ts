import * as http from 'http';
import { RequestOptions } from 'http';

import { Todo } from '../../../../common-interfaces/todo';

export class TodosGateway {
  private readonly urlPath: string = 'http://localhost:3001/api';

  async create(todo: Todo): Promise<Todo> {
    const postData: string = JSON.stringify(todo);
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

  async get(todoId: string): Promise<Todo> {
    const options: RequestOptions = {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    };
    const url: string = `${this.urlPath}/${todoId}`;

    return this.createHttpRequest(options, url);
  }

  async edit(id: string, newTodo: string): Promise<Todo> {
    const putData: string = JSON.stringify({ todo: newTodo });
    const options: RequestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(putData)
      }
    };
    const url = `${this.urlPath}/${id}`;

    return this.createHttpRequest(options, url, putData);
  }

  delete(id: string): Promise<Todo> {
    const options: RequestOptions = {
      method: 'DELETE',
      headers: {
        'accept': 'application/json'
      }
    };
    const url = `${this.urlPath}/${id}`;

    return this.createHttpRequest(options, url);
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
