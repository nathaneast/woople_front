import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3065',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

export const requestApi = {
  list: (category: string) =>
    instance
      .get('/posts', {
        params: {
          category,
        },
      })
      .then(responseBody),
  create: (body: object) => instance.post('/post', body).then(responseBody),
  detail: (id: string) => instance.get(`/post/${id}`).then(responseBody),
  delete: (id: string) => instance.delete(`/post/${id}`).then(responseBody),
  like: (id: string) => instance.patch(`/post/like/${id}`).then(responseBody),
  confirmYoutubeUrl: (urlItem: string) =>
    instance
      .get(`/post/youtubeUrl`, {
        params: {
          urlItem,
        },
      })
      .then(responseBody),
};
