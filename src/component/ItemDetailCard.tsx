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

  const onClickDelete = useCallback(() => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      requestApi
        .delete(id)
        .then((res) => {
          console.log(res);
          setContentsList((prevList: any) =>
            prevList.filter((item: any) => item._id !== id),
          );
          alert('삭제를 완료 하였습니다');
          onHide(null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [requestApi, id, setContentsList, onHide]);

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
        <Modal.Title>상세보기</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <section className="grid-container grid grid-cols-5 mb-2">
          <span className="font-bold col-span-1">이미지:</span>
          <img src={metaImage} className="mb-2 col-span-3 w-100 h-100" />
        </section>

        <section>
          <div
            className="grid-container grid grid-cols-5 mb-2"
            style={{ color: 'gray' }}
          >
            <label className="font-bold mr-1 col-span-1">메타 타이틀</label>
            <p className="col-span-4">{metaTitle.substring(0, 80)}...</p>
          </div>
          <div
            className="grid-container grid grid-cols-5 mb-2"
            style={{ color: 'gray' }}
          >
            <label className="font-bold mr-1 col-span-1">메타 설명</label>
            <p className="col-span-4">{metaDesc.substring(0, 80)}...</p>
          </div>
        </section>

        <section>
          <div className="grid-container grid grid-cols-5">
            <label className="font-bold mr-1 col-span-1">타이틀</label>
            <p className="col-span-4">{postTitle}</p>
          </div>
          <div className="grid-container grid grid-cols-5">
            <label className="font-bold mr-1 col-span-1">설명</label>
            <p className="col-span-4">{postDesc}</p>
          </div>
          <div className="grid-container grid grid-cols-5">
            <label className="font-bold mr-1 col-span-1">작성자</label>
            <p className="col-span-4">{author}</p>
          </div>
          <div className="grid-container grid grid-cols-5">
            <label className="font-bold mr-1 col-span-1">카테고리</label>
            <p className="col-span-4">{category}</p>
          </div>
          <div className="grid-container grid grid-cols-5">
            <label className="font-bold mr-1 col-span-1">날짜</label>
            <p className="col-span-4">{createdAt}</p>
          </div>
          <div className="grid-container grid grid-cols-5">
            <label className="font-bold mr-1 col-span-1">좋아요</label>
            <p className="col-span-4">{like}</p>
          </div>
        </section>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="success" disabled={isPushedLike} onClick={onClickLike}>
          좋아요
        </Button>
        <Button variant="danger" onClick={onClickDelete}>
          삭제
        </Button>
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
