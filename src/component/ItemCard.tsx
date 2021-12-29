import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const CardSection = styled.section`
  cursor: pointer;
  &:hover {
    border: 2px solid orange;
  }
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

interface Props {
  index: number;
  title: string;
  desc: string;
  author: string;
  url: string;
  imagePath: string;
  like: number;
  onShowItemDetail: (contentsKey: number | null) => void;
}

function ItemCard({
  index,
  title,
  author,
  desc,
  imagePath,
  url,
  onShowItemDetail,
  like,
}: Props) {
  return (
    <article className="flex justify-center flex-col">
      <CardSection onClick={() => onShowItemDetail(index)}>
        <div>
          <Image src={imagePath} />
        </div>

        <div>
          <div className="d-flex">
            <label className="mr-2">타이틀</label>
            <p>{title}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">설명</label>
            <p>{desc}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">작성자</label>
            <p>{author}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">좋아요</label>
            <p>{like}</p>
          </div>
        </div>
      </CardSection>

      <div>
        <Button>
          <a href={url} target="_blank" rel="noopener noreferrer">
            링크 이동
          </a>
        </Button>
      </div>
    </article>
  );
}

export default ItemCard;
