import { useState } from 'react';

import { useToggle } from '../hooks';

import Category from '../component/Category';
import Header from '../component/Header';
import ItemList from '../component/ItemList';

function Home() {
  const [category, setCategory] = useState('all');
  const [isShowItemForm, onHandleItemForm] = useToggle(false);

  return (
    <>
      <Header onHandleItemForm={onHandleItemForm} />
      <Category category={category} setCategory={setCategory} />
      <ItemList category={category} isShowItemForm={isShowItemForm} onHandleItemForm={onHandleItemForm} />
    </>
  );
}

export default Home;
