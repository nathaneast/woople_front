import { useEffect, useState, useCallback, useMemo } from 'react';

import { useToggle } from '../hooks';
import { requestApi } from '../api';

import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import ItemForm from './ItemForm';

// const itemListMockData: any = [
//   {
//     key: 1,
//     // id: "jonadan@google.com",
//     author: 'jonandan',
//     date: '2021-09-09',
//     category: 'morning',
//     // like: 13,
//     redirectUrl: 'https://www.naver.com',
//     title: 'mock title',
//     imagePath: 'imageUrl',
//     desc: 'mock desc',
//   },
//   {
//     key: 2,
//     // id: "jonadan@google.com",
//     author: 'jonandan',
//     date: '2021-09-09',
//     category: 'morning',
//     // like: 13,
//     redirectUrl: 'https://www.naver.com',
//     title: 'mock title',
//     imagePath: 'imageUrl',
//     desc: 'mock desc',
//   },
//   {
//     key: 3,
//     // id: "jonadan@google.com",
//     author: 'jonandan',
//     date: '2021-09-09',
//     category: 'night',
//     // like: 13,
//     redirectUrl: 'https://www.naver.com',
//     title: 'mock title',
//     imagePath: 'imageUrl',
//     desc: 'mock desc',
//   },
//   {
//     key: 4,
//     // id: "jonadan@google.com",
//     author: 'jonandan',
//     date: '2021-09-09',
//     category: 'night',
//     // like: 13,
//     redirectUrl: 'https://www.naver.com',
//     title: 'mock title',
//     imagePath: 'imageUrl',
//     desc: 'mock desc',
//   },
// ];

interface ItemProps {
  key: number;
  author: string;
  date: string;
  url: string;
  postTitle: string;
  metaImage: string;
  postDesc: string;
  category: string;
  like: number;
}

interface Props {
  category: string;
  isShowItemForm: boolean;
  toggleItemForm: () => void;
}

function ItemList({ category, isShowItemForm, toggleItemForm }: Props) {
  const contentsDetailDefault = useMemo(
    () => ({
      key: 0,
      author: '',
      date: '',
      redirectUrl: '',
      postTitle: '',
      metaImage: '',
      postDesc: '',
      category: '',
    }),
    [],
  );
  const [contentsList, setContentsList] = useState([]);
  const [contentsDetail, setContentsDetail] = useState(contentsDetailDefault);

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

  const onFetchList = useCallback(() => {
    requestApi
      .list(category)
      .then((res) => {
        setContentsList(res);
        console.log(res, 'list');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setContentsList, category]);

  useEffect(() => {
    onFetchList();
  }, [category]);

  return (
    <div className="d-flex justify-center">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
        {contentsList.length > 0 &&
          contentsList.map((item: ItemProps, index: number) => (
            <ItemCard
              key={item.key}
              index={index}
              title={item.postTitle}
              author={item.author}
              desc={item.postDesc}
              onShowItemDetail={onHandleDetailModal}
              redirectUrl={item.url}
              imagePath={item.metaImage}
              like={item.like}
            />
          ))}
      </main>

      {isShowDetailModal && contentsDetail && (
        <ItemDetailCard
          show={isShowDetailModal}
          author={contentsDetail.author}
          date={contentsDetail.date}
          redirectUrl={contentsDetail.redirectUrl}
          title={contentsDetail.postTitle}
          imagePath={contentsDetail.metaImage}
          desc={contentsDetail.postDesc}
          category={contentsDetail.category}
          onHide={onHandleDetailModal}
        />
      )}

      {isShowItemForm && (
        <ItemForm show={isShowItemForm} onHide={toggleItemForm} />
      )}
    </div>
  );
}

export default ItemList;
