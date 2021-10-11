import { useCallback } from 'react';

interface Props {
  category: string,
  setCategory: (val: string) => void,
};

function Category ({ category, setCategory } : Props) {
  const onClickCategory = useCallback((e) => {
    if (e.target.tagName === 'LI') {
      const targetCategory = e.target.dataset.name;

      if (category !== targetCategory) {
        setCategory(targetCategory);
      }
    }
  }, [category, setCategory]);

  return (
    <section>
      <nav>
        <ul onClick={onClickCategory}>
          <li data-name="all">all</li>
          <li data-name="morning">Morning</li>
          <li data-name="afternoon">Afternoon</li>
          <li data-name="night">Night</li>
        </ul>
      </nav>
    </section>
  );
};

export default Category;
