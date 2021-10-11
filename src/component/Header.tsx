interface Props {
  toggleItemForm: any;
}

const Header = ({ toggleItemForm }: Props) => {
  return (
    <header className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <div>
          <h1 className="p-4 text-4xl">WOOPLE</h1>
        </div>
        <ul>
          <li onClick={toggleItemForm}>글쓰기</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
