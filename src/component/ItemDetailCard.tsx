import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

interface Props {
  show: boolean;
  author: string;
  date: string;
  redirectUrl: string;
  category: string;
  title: string;
  imagePath: string;
  desc: string;
  onHide: (isOnModal: boolean, contentsKey: number | null) => void;
}

// TODO: onClick 함수 변경
function ItemDetailCard({
  show,
  author,
  date,
  redirectUrl,
  title,
  imagePath,
  desc,
  category,
  onHide,
}: Props) {
  return (
    <Modal show={show} onHide={() => onHide(false, null)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <section>
          mock image
          <div
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'orange',
            }}
          ></div>
        </section>
        <section>
          <div>
            <label>타이틀</label>
            <p>{title}</p>
          </div>
          <div>
            <label>작성자</label>
            <p>{author}</p>
          </div>
          <div>
            <label>카테고리</label>
            <p>{category}</p>
          </div>
          <div>
            <label>날짜</label>
            <p>{date}</p>
          </div>
          <div>
            <label>설명</label>
            <p>{desc}</p>
          </div>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary">
          <a href={redirectUrl} target="_blank" rel="noopner noreferrer" style={{ color: "black"}}>
            링크이동
          </a>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ItemDetailCard;
