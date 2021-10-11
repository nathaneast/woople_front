import { useEffect, useState, useCallback, useMemo } from 'react';

import { useToggle } from '../hooks';

import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import ItemForm from './ItemForm';

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
  isShowItemForm: boolean;
  onHandleItemForm: () => void;
}

function ItemList({ category, isShowItemForm, onHandleItemForm }: Props) {
  // FIXME: 디테일 빈값 대신 상태지정 방법 고려
  const contentsDetailDefault = useMemo(() => ({
      key: 0,
      author: '',
      date: '',
      redirectUrl: '',
      title: '',
      imagePath: '',
      desc: '',
      category: '',
    }), []);

  const [contentsList, setContentsList] = useState([]);
  const [contentsDetail, setContentsDetail] = useState(contentsDetailDefault);

  //TODO: useBoll ts적용
  const [isShowDetailModal, toggleDetailModal] = useToggle(false);

  const onHandleDetailModal = useCallback(
    (contentsKey: number | null) => {
      toggleDetailModal();

      if (typeof contentsKey === 'number') {
        setContentsDetail(contentsList[contentsKey]);
      } else {
        setContentsDetail(contentsDetailDefault);
      }
    },
    [toggleDetailModal, contentsList, setContentsDetail, contentsDetailDefault],
  );

  // TODO: 아이템리스트 요청
  useEffect(() => {
    setContentsList(itemListMockData);
  }, [category]);

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

      {isShowDetailModal && contentsDetail && (
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

      {isShowItemForm && (
        <ItemForm show={isShowItemForm} onHide={onHandleItemForm} />
      )}
    </main>
  );
}

export default ItemList;
