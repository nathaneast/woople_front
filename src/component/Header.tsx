interface Props {
  onHandleItemForm: any;
}

const Header = ({ onHandleItemForm }: Props) => {
  return (
    <header>
      <div>
        <h1>WOOPLE</h1>
      </div>
      <ul>
        <li onClick={onHandleItemForm}>글쓰기</li>
      </ul>
    </header>
  );
};

export default Header;
