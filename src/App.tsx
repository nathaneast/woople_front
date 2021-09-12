import { useRecoilValue } from 'recoil';

import { userState } from './atom/index';
import Header from './component/Header';
import Category from './component/Category';
import ItemList from './component/ItemList';
import Login from './component/Login';

function App() {
  const { name: userName, isLogIn } = useRecoilValue(userState);
  console.log({ userName, isLogIn });

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
