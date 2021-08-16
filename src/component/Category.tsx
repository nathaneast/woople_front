import { useEffect, useState, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { itemList } from '../atom';

const Category = () => {
  const [currentCategory, setCurrentCategory] = useState('all');
  const setItemList = useSetRecoilState(itemList);

  const onClickCategory = useCallback((e) => {
    if (e.target.tagName === 'LI') {
      const targetCategory = e.target.dataset.name;

      if (currentCategory !== targetCategory) {
        setCurrentCategory(targetCategory);
      }
    }
  }, [currentCategory]);

  const onFetchItemList = useCallback(() => {
    // TODO: api 요청

    // setItemList((prevList) => [...prevList]);
    setItemList((prevList) => [
      ...prevList,
    ]);
  }, [setItemList]);

  useEffect(() => {
    onFetchItemList();
  }, [currentCategory, onFetchItemList]);

  console.log(currentCategory, 'category');

  return (
    <section>
      <nav>
        <ul onClick={onClickCategory}>
          <li data-name="all">전체</li>
          <li data-name="morning">아침</li>
          <li data-name="afternoon">점심</li>
          <li data-name="night">저녁</li>
        </ul>
      </nav>
    </section>
  );
};

export default Category;
