import { Button, Card } from 'react-bootstrap';
import styled from 'styled-components';

const CardWrapper = styled(Card)`
  cursor: pointer;
  &:hover {
    border: 3px solid orange;
  }
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
    <CardWrapper
      className="flex justify-center flex-col "
      style={{ width: '300px' }}
      onClick={() => onShowItemDetail(index)}
    >
      <Card.Img variant="top" src={imagePath} />

      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <div className="flex">
            <label className="font-bold mr-2">설명</label>
            <p>{desc}</p>
          </div>
          <div className="flex">
            <label className="font-bold mr-2">작성자</label>
            <p>{author}</p>
          </div>
          <div className="flex">
            <label className="font-bold mr-2">좋아요</label>
            <p>{like}</p>
          </div>
        </Card.Text>

        <div className="flex justify-center flex-col">
          <Button>
            <a href={url} target="_blank" rel="noopener noreferrer">
              링크 이동
            </a>
          </Button>
        </div>
      </Card.Body>
    </CardWrapper>
  );
}

export default ItemCard;
