import { useEffect, useState, useCallback, useMemo } from 'react';

import { useToggle } from '../hooks';
import { requestApi } from '../api';
import { ContentsDetailType } from '../service/types';

import ItemCard from './ItemCard';
import ItemDetailCard from './ItemDetailCard';
import ItemForm from './ItemForm';

interface Props {
  category: string;
  isShowItemForm: boolean;
  toggleItemForm: () => void;
}

function ItemList({ category, isShowItemForm, toggleItemForm }: Props) {
  const contentsDetailDefault = useMemo(
    () => ({
      _id: '',
      author: '',
      createdAt: '',
      url: '',
      postTitle: '',
      metaImage: '',
      metaTitle: '',
      metaDesc: '',
      postDesc: '',
      category: {
        name: '',
      },
      like: 0,
    }),
    [],
  );
  const [contentsList, setContentsList] = useState([]);
  const [contentsDetail, setContentsDetail] = useState(contentsDetailDefault);

  const [isShowDetailModal, toggleDetailModal] = useToggle(false);
  const [isLoading, toggleLoading] = useToggle(false);

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
    toggleLoading();

    requestApi
      .list(category)
      .then((res) => {
        console.log(res, 'list');
        setContentsList(res);
        toggleLoading();
      })
      .catch((error) => {
        toggleLoading();
        console.error(error);
      });
  }, [setContentsList, category, toggleLoading]);

  useEffect(() => {
    onFetchList();
  }, [category]);

  return (
    <div className="d-flex justify-center">
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          contentsList.map((item: ContentsDetailType, index: number) => (
            <ItemCard
              key={item._id}
              index={index}
              title={item.postTitle}
              author={item.author}
              desc={item.postDesc}
              onShowItemDetail={onHandleDetailModal}
              url={item.url}
              imagePath={item.metaImage}
              like={item.like}
            />
          ))
        )}
      </main>

      {isShowDetailModal && contentsDetail && (
        <ItemDetailCard
          id={contentsDetail._id}
          show={isShowDetailModal}
          author={contentsDetail.author}
          createdAt={contentsDetail.createdAt}
          url={contentsDetail.url}
          postTitle={contentsDetail.postTitle}
          postDesc={contentsDetail.postDesc}
          metaTitle={contentsDetail.metaTitle}
          metaDesc={contentsDetail.metaDesc}
          metaImage={contentsDetail.metaImage}
          like={contentsDetail.like}
          category={contentsDetail.category.name}
          onHide={onHandleDetailModal}
          setContentsList={setContentsList}
          setContentsDetail={setContentsDetail}
        />
      )}

      {isShowItemForm && (
        <ItemForm
          show={isShowItemForm}
          onHide={toggleItemForm}
          onListReRender={onFetchList}
        />
      )}
    </div>
  );
}

export default ItemList;
