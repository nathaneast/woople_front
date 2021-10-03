import { atom } from 'recoil';

// export const userState = atom({
//   key: 'user',
//   default: {
//     id: 'jonadan@google.com',
//     name: 'jonadan',
//     isLogIn: true,
//   },
// });

export const itemListState = atom({
  key: 'itemList',
  default: [],
});

export const categoryState = atom({
  key: 'category',
  default: 'all',
});
