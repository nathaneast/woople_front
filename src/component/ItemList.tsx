import { useEffect, useState, useCallback } from 'react';

// import { useBool } from '../hooks'; 

// import ItemDetailCard from './ItemDetailCard';
import ItemCard from './ItemCard';

const itemListMockData: any = [
  {
    key: 1,
    // id: "jonadan@google.com",
    author: 'jonandan',
    date: '2021-09-09',
    category: 'morning',
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
    category: 'morning',
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
    category: 'night',
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
  category: string;
};

interface Props {
  category: string,
};

function ItemList ({ category } : Props) {
  const [contentsList, setContentsList] = useState([]);
  const [contentsDetail, setContentsDetail] = useState(null);

  //TODO: useBoll ts적용
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);

  const onHandleDetailModal = useCallback((isOnModal: boolean, contentsKey: number | null) => {
    setIsShowDetailModal(isOnModal);
    isOnModal && typeof contentsKey === 'number' ? setContentsDetail(contentsList[contentsKey]) : setContentsDetail(null);
  }, [setIsShowDetailModal, contentsList, setContentsDetail]);

  useEffect(() => {
    setContentsList(itemListMockData);
  }, [category]);

  console.log({contentsDetail, isShowDetailModal})

  return (
  <main>
    {contentsList.length && contentsList.map((item: ItemProps, index: number) => (
      <ItemCard 
        key={item.key}
        index={index}
        title={item.title}
        author={item.author}
        desc={item.desc}
        onShowItemDetail={onHandleDetailModal}
        redirectUrl={item.redirectUrl}
        imagePath={item.imagePath}
      />

      // <ItemDetailCard 
      // key={item.key}
      // index={index}
      // author={item.author}
      // date={item.date}
      // redirectUrl={item.redirectUrl}
      // title={item.title}
      // imagePath={item.imagePath}
      // desc={item.desc}
      // category={item.category}
      // onShowItemDetail={onHandleDetailModal}
      // />
    ))}
  </main>
  );
};

export default ItemList;
