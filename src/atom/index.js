import { atom } from 'recoil';

const mockData = [
  {
    image: 'image',
    url: 'https://www.naver.com',
    title: 'mock title',
    desc: 'mock desc',
  },
];

export const user = atom({
  key: 'user',
  default: '',
});

export const itemList = atom({
  key: 'itemList',
  default: mockData,
});
