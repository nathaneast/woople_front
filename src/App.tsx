import { useRecoilState } from 'recoil';

import { userState, itemListState } from './atom/index';
import Header from './component/Header';
import Category from './component/Category';
import ItemList from './component/ItemList';
import Login from './component/Login';

function App() {
  const [user, setUser] = useRecoilState(userState);
  const { name: userName, isLogIn } = user;
  const [itemList, setItemList] = useRecoilState(itemListState);

  return (
    <>
      {isLogIn ? (
        <div>
          <Header userName={userName} />
          <Category />
          <ItemList />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
