import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  list: () => instance.get('/posts').then(responseBody),
  create: () => instance.post(`/post`).then(responseBody),
  confirmUrl: (urlItem: string) =>
    instance.post(`/post/url`, urlItem).then(responseBody),
  detail: (id: string) => instance.get(`/post/${id}`).then(responseBody),
  delete: (id: string) => instance.delete(`/post/${id}`).then(responseBody),
  like: (id: string) => instance.patch(`/post/like/${id}`).then(responseBody),
};
