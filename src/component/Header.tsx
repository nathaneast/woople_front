interface Props {
  toggleItemForm: any;
}

const Header = ({ toggleItemForm }: Props) => {
  return (
    <header>
      <div>
        <h1>WOOPLE</h1>
      </div>
      <ul>
        <li onClick={toggleItemForm}>글쓰기</li>
      </ul>
    </header>
  );
};

export default Header;
