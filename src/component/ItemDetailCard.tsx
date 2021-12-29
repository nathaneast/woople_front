import { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import produce from 'immer';

import { useToggle } from '../hooks';
import { requestApi } from '../api';

interface Props {
  show: boolean;
  author: string;
  createdAt: string;
  url: string;
  postTitle: string;
  metaTitle: string;
  metaDesc: string;
  metaImage: string;
  postDesc: string;
  category: string;
  like: number;
  id: string;
  onHide: (contentsKey: number | null) => void;
  setContentsList: (prevList: any) => void;
  setContentsDetail: (prev: any) => void;
}

// TODO: onClick 함수 변경
function ItemDetailCard({
  show,
  author,
  url,
  postTitle,
  category,
  createdAt,
  postDesc,
  metaTitle,
  metaDesc,
  metaImage,
  like,
  id,
  onHide,
  setContentsList,
  setContentsDetail,
}: Props) {
  const [isPushedLike, onHandlePushedLike] = useToggle(false);

  const onClickLike = useCallback(() => {
    requestApi
      .like(id)
      .then((res) => {
        setContentsList((prevList: any) => {
          const targetIndex = prevList.findIndex(
            (item: any) => item._id === id,
          );
          const updatedContesList = produce(prevList, (draft: any) => {
            ++draft[targetIndex].like;
          });
          return updatedContesList;
        });

        setContentsDetail((prev: any) => {
          const updatedDetail = produce(prev, (draft: any) => {
            ++draft.like;
          });
          return updatedDetail;
        });

        onHandlePushedLike();
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setContentsDetail, onHandlePushedLike, setContentsList]);

  return (
    <Modal show={show} onHide={() => onHide(null)} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <img
            src={metaImage}
            style={{
              width: '150px',
              height: '150px',
            }}
          />
        </div>

        <section>
          <div className="d-flex">
            <label className="mr-2">메타 타이틀</label>
            <p>{metaTitle}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">메타 설명</label>
            <p>{metaDesc.substring(0, 100)}...</p>
          </div>
        </section>

        <section>
          <div className="d-flex">
            <label className="mr-2">타이틀</label>
            <p>{postTitle}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">작성자</label>
            <p>{author}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">카테고리</label>
            <p>{category}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">날짜</label>
            <p>{createdAt}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">설명</label>
            <p>{postDesc}</p>
          </div>
          <div className="d-flex">
            <label className="mr-2">좋아요</label>
            <p>{like}</p>
          </div>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" disabled={isPushedLike} onClick={onClickLike}>
          좋아요
        </Button>
        <Button variant="danger">삭제</Button>
        <Button variant="primary">
          <a
            href={url}
            target="_blank"
            rel="noopner noreferrer"
            style={{ color: 'black' }}
          >
            링크 이동
          </a>
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ItemDetailCard;
