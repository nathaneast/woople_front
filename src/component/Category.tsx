import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { categoryState } from "../atom";

const Category = () => {
  const [category, setCategory] = useRecoilState(categoryState)

  const onClickCategory = useCallback((e) => {
    if (e.target.tagName === 'LI') {
      const targetCategory = e.target.dataset.name;

      if (category !== targetCategory) {
        setCategory(targetCategory);
      }
    }
  }, [category, setCategory]);

  // const onFetchItemList = useCallback(() => {
  //   // TODO: api 요청

  //   // setItemList((prevList) => [...prevList]);
  //   setItemList((prevList) => [
  //     ...prevList,
  //   ]);
  // }, [setItemList]);

  // useEffect(() => {
  //   onFetchItemList();
  // }, [currentCategory, onFetchItemList]);

  console.log({ category });

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
