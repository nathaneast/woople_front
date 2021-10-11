import { useState } from 'react';

import { useBool } from '../hooks';

import Category from '../component/Category';
import Header from '../component/Header';
import ItemList from '../component/ItemList';

// FIXME: useBool any 타입 변경 
function Home() {
  const [category, setCategory] = useState('all');
  const [isShowItemForm, onHandleItemForm] = useBool(false);

  return (
    <>
      <Header onHandleItemForm={onHandleItemForm} />
      <Category category={category} setCategory={setCategory} />
      <ItemList category={category} isShowItemForm={isShowItemForm} onHandleItemForm={onHandleItemForm} />
    </>
  );
}

export default Home;
