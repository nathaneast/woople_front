import { useRecoilValue } from 'recoil';

import { user } from '../atom';

const Header = () => {
  const userName: string = useRecoilValue(user);
  console.log({ userName });

  return (
    <header>
      <nav>
        <ul>
          {userName ? (
            <>
              <li>글쓰기</li>
              <li>로그아웃</li>
              <li>{userName}</li>
            </>
          ) : (
            <button>
              <li>로그인</li>
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
