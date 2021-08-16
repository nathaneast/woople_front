import { atom } from 'recoil';


export const user = atom({
  key: 'user',
  default: '',
});

export const itemList = atom({
  key: 'itemList',
  default: [],
});
