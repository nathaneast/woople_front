import { Dispatch, SetStateAction, useEffect, useState, useCallback } from 'react';

// import { useBool } from '../hooks'; 

import ItemCard from './ItemCard';

const itemListMockData: any = [
  {
    key: 1,
    // id: "jonadan@google.com",
    author: 'jonandan',
    date: '2021-09-09',
    // like: 13,
    redirectUrl: 'https://www.naver.com',
    title: 'mock title',
    imagePath: 'imageUrl',
    desc: 'mock desc',
  },
  {
    key: 2,
    // id: "jonadan@google.com",
    author: 'jonandan',
    date: '2021-09-09',
    // like: 13,
    redirectUrl: 'https://www.naver.com',
    title: 'mock title',
    imagePath: 'imageUrl',
    desc: 'mock desc',
  },
  {
    key: 3,
    // id: "jonadan@google.com",
    author: 'jonandan',
    date: '2021-09-09',
    // like: 13,
    redirectUrl: 'https://www.naver.com',
    title: 'mock title',
    imagePath: 'imageUrl',
    desc: 'mock desc',
  },
];

// type ShowDetail = [boolean, () => void, (value: boolean) => void];

// interface ShowDetailType {
//   (val: boolean): ShowDetail
// };

interface ItemProps {
  key: number;
  author: string;
  date: string;
  redirectUrl: string;
  title: string;
  imagePath: string;
  desc: string;
};

interface Props {
  category: string,
};

function ItemList ({ category } : Props) {
  const [contentsList, setContentsList] = useState([]);
  const [contentsDetail, setContentsDetail] = useState(null);

  //TODO: useBoll ts적용
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);

  const onHandleDetailMdoal = useCallback((isOnModal: boolean, contentsKey: number | null) => {
    setIsShowDetailModal(isOnModal);
    isOnModal && typeof contentsKey === 'number' ? setContentsDetail(contentsList[contentsKey]) : setContentsDetail(null);
  }, [setIsShowDetailModal, contentsList, setContentsDetail]);

  useEffect(() => {
    setContentsList(itemListMockData);
  }, [category]);

  return (
  <main>
    {contentsList.length && contentsList.map((item: ItemProps, index: number) => (
      <ItemCard 
      key={item.key}
      index={index}
      author={item.author}
      date={item.date}
      redirectUrl={item.redirectUrl}
      title={item.title}
      imagePath={item.imagePath}
      desc={item.desc}
      onShowItemDetail={onHandleDetailMdoal}
      />
    ))}
  </main>
  );
};

export default ItemList;
