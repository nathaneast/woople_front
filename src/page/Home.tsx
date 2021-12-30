import { useState } from 'react';
import { useToggle } from '../hooks';

import Category from '../component/Category';
import Header from '../component/Header';
import ItemList from '../component/ItemList';

function Home() {
  const [category, setCategory] = useState('all');
  const [isShowItemForm, toggleItemForm] = useToggle(false);

  return (
    <>
      <Header toggleItemForm={toggleItemForm} />
      <Category category={category} setCategory={setCategory} />
      <ItemList
        category={category}
        isShowItemForm={isShowItemForm}
        toggleItemForm={toggleItemForm}
      />
    </>
  );
}

export default Home;
