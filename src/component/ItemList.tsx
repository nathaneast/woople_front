import { useEffect, useState, useCallback } from 'react';

// import { useBool } from '../hooks';

// import ItemDetailCard from './ItemDetailCard';
import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';

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
}

interface Props {
  category: string;
}

function ItemList({ category }: Props) {
  const [contentsList, setContentsList] = useState([]);
  const [contentsDetail, setContentsDetail] = useState({});

  //TODO: useBoll ts적용
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);

  const onHandleDetailModal = useCallback(
    (isOnModal: boolean, contentsKey: number | null) => {
      setIsShowDetailModal(isOnModal);
      isOnModal && typeof contentsKey === 'number'
        ? setContentsDetail(contentsList[contentsKey])
        : setContentsDetail(null);
    },
    [setIsShowDetailModal, contentsList, setContentsDetail],
  );

  useEffect(() => {
    setContentsList(itemListMockData);
  }, [category]);

  console.log({ contentsDetail, isShowDetailModal });

  return (
    <main>
      {contentsList.length &&
        contentsList.map((item: ItemProps, index: number) => (
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
        ))}

      {isShowDetailModal && contentsDetail &&(
        <ItemDetailCard
          show={isShowDetailModal}
          author={contentsDetail.author}
          date={contentsDetail.date}
          redirectUrl={contentsDetail.redirectUrl}
          title={contentsDetail.title}
          imagePath={contentsDetail.imagePath}
          desc={contentsDetail.desc}
          category={contentsDetail.category}
          onHide={onHandleDetailModal}
        />
      )}
    </main>
  );
}

export default ItemList;
