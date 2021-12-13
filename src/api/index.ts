import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: (url: string, body: object) =>
    instance.post(url, body).then(responseBody),
  delete: (url: string) => instance.delete(url).then(responseBody),
};

/* 
apis

GET: posts
// params: category

GET: post/{id}

POST: post
POST: post/url

DELETE: post/{id}


*/
