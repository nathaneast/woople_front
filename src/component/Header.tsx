import { NavDropdown } from 'react-bootstrap';

interface Props {
  toggleItemForm: () => void;
}

const Header = ({ toggleItemForm }: Props) => {
  return (
    <>
      <header className="flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div>
            <h1 className="p-4 text-4xl">WOOPLE</h1>
          </div>
        </div>

        <NavDropdown
          title="MENU"
          id="collasible-nav-dropdown"
          className="absolute right-1 md:hidden"
        >
          <NavDropdown.Item onClick={toggleItemForm}>글쓰기</NavDropdown.Item>
        </NavDropdown>
        <ul className="absolute right-5 hidden md:block">
          <li onClick={toggleItemForm} className="cursor-pointer font-bold">
            글쓰기
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
