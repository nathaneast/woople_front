import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardSection = styled.section`
  cursor: pointer;
  &:hover {
    border: 2px solid orange;
  }
`;

interface Props {
  index: number;
  title: string;
  desc: string;
  author: string;
  redirectUrl: string;
  imagePath: string;
  onShowItemDetail: (contentsKey: number | null) => void;
}

function ItemCard({
  index,
  title,
  author,
  desc,
  imagePath,
  redirectUrl,
  onShowItemDetail,
}: Props) {
  return (
    <article className="flex justify-center flex-col">
      <CardSection onClick={() => onShowItemDetail(index)}>
        <div>
          <div
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'green',
            }}
          >
            mock image
          </div>
        </div>

        <div>
          <div>
            <label>타이틀</label>
            <p>{title}</p>
          </div>
          <div>
            <label>설명</label>
            <p>{desc}</p>
          </div>
          <div>
            <label>작성자</label>
            <p>{author}</p>
          </div>
        </div>
      </CardSection>

      <div>
        <Button onClick={() => console.log('링크 이동')}>링크 이동</Button>
      </div>
    </article>
  );
}

export default ItemCard;
