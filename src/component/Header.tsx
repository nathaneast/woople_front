type HeaderProps = {
  userName: string;
};

const Header = ({ userName }: HeaderProps) => {
  console.log(userName, 'Header');

  return (
    <header>
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
    </header>
  );
};

export default Header;
