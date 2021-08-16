import { useRecoilValue } from 'recoil';

import { user } from './atom';
import Header from './component/Header';
import Category from './component/Category';
import ItemList from './component/ItemList';

function App() {
  const userName: string = useRecoilValue(user);
  console.log(userName, 'app');

  return (
    <div className="App">
      <Header userName={userName} />
      <Category />
      <ItemList userName={userName} />
    </div>
  );
}

export default App;
