import { RecoilRoot, useRecoilValue } from 'recoil';

import { user } from "./atom";
import Header from './component/Header';

function App() {
  // const userName: string = useRecoilValue(user);
  // console.log({userName})

  return (
    <RecoilRoot>
      <div className="App">
        <Header />
        <div>카테고리</div>
        <div>목록 렌더링</div>
      </div>
    </RecoilRoot>
  );
}

export default App;
