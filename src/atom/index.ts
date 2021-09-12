import { atom } from 'recoil';

const itemListMockData: any = [
  {
    key: 1,
    author: 'jonandan',
    date: '2021-09-09',
    like: 13,
    redirectUrl: 'https://www.naver.com',
    title: 'mock title',
    imagePath: 'imageUrl',
    desc: 'mock desc',
  },
];

export const userState = atom({
  key: 'user',
  default: {
    id: 'jonadan@google.com',
    name: 'jonadan',
    isLogIn: true,
  },
});

export const itemListState = atom({
  key: 'itemList',
  default: itemListMockData,
});

export const categoryState = atom({
  key: 'category',
  default: 'all',
});
