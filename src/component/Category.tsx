import { useCallback } from 'react';
import styled from 'styled-components';

interface LiItemProps {
  readonly isFocus: boolean;
}

const LiItem = styled.li<LiItemProps>`
  cursor: pointer;
  color: ${(props) => (props.isFocus ? 'red' : 'black')};
`;

interface Props {
  category: string;
  setCategory: (val: string) => void;
}

function Category({ category, setCategory }: Props) {
  const onClickCategory = useCallback(
    (e) => {
      if (e.target.tagName === 'LI') {
        const targetCategory = e.target.dataset.name;

        if (category !== targetCategory) {
          setCategory(targetCategory);
        }
      }
    },
    [category, setCategory],
  );

  return (
    <nav className="mb-3">
      <ul onClick={onClickCategory} className="flex justify-center gap-x-10">
        <LiItem data-name="all" isFocus={category === 'all'}>
          all
        </LiItem>
        <LiItem data-name="morning" isFocus={category === 'morning'}>
          Morning
        </LiItem>
        <LiItem data-name="afternoon" isFocus={category === 'afternoon'}>
          Afternoon
        </LiItem>
        <LiItem data-name="night" isFocus={category === 'night'}>
          Night
        </LiItem>
      </ul>
    </nav>
  );
}

export default Category;
