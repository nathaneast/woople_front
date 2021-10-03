import { useState } from "react";

import Category from '../component/Category';
import Header from '../component/Header';
import ItemList from '../component/ItemList';

const Home = () => {
  const [category, setCategory] = useState("all");

  return (
    <>
      <Header />
      <Category 
        category={category}
        setCategory={setCategory}
      />
      <ItemList />
    </>
  );
};

export default Home;
