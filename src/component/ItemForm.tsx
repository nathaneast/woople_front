import { useState, useCallback } from 'react';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { useToggle } from '../hooks';
import { requestApi } from '../api';

interface Props {
  show: boolean;
  onHide: () => void;
  onListReRender: () => void;
}

function ItemForm({ show, onHide, onListReRender }: Props) {
  const [inputs, setInputs] = useState({
    url: '',
    author: '',
    category: '',
    title: '',
    desc: '',
  });
  const [metaData, setMetaData] = useState({
    metaTitle: '',
    metaImage: '',
    metaDesc: '',
  });

  const [isConfirmUrl, toggleConfirmUrl] = useToggle(false);

  const onHandleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setInputs],
  );

  const onCheckYoutubeUrlSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (!inputs.url) {
        alert('url 값을 입력 해주세요');
        return;
      }

      if (inputs.url.search('youtube') === -1) {
        alert('유튜브 url을 입력 해주세요');
        return;
      }

      // TODO: 요청 -> 성공 res ->
      // 메타데이터  setState, 렌더링
      // err -> alert

      requestApi
        .confirmYoutubeUrl(inputs.url)
        .then((res) => {
          console.log({ res });
          const { title, description, image } = res;
          setMetaData({
            metaTitle: title,
            metaImage: image,
            metaDesc: description,
          });
          toggleConfirmUrl();
        })
        .catch((err) => {
          console.error(err, err.response);
          alert(err.response.data);
        });
    },
    [toggleConfirmUrl, inputs.url, requestApi, setMetaData],
  );

  const onValidateForm = useCallback(() => {
    const onErrorProcess = (message: string): string => {
      alert(message);
      return message;
    };
    const { url, author, category, title, desc } = inputs;

    if (!isConfirmUrl) {
      return onErrorProcess('url 검사 버튼을 눌러 주세요');
    }

    const isInputsNullCheck: boolean = [
      url,
      author,
      category,
      title,
      desc,
    ].every((item: string) => item);

    if (!isInputsNullCheck) {
      return onErrorProcess('빈 값을 모두 입력 해주세요');
    }

    return '';
  }, [isConfirmUrl, inputs]);

  const onCreateBody = useCallback(() => {
    const { url, author, category, title: postTitle, desc: postDesc } = inputs;
    const { metaTitle, metaImage, metaDesc } = metaData;

    return {
      url,
      author,
      category,
      postTitle,
      postDesc,
      metaTitle,
      metaImage,
      metaDesc,
    };
  }, [inputs, metaData]);

  const onCreateSubmit = useCallback(() => {
    const resultErrorMessage: string = onValidateForm();

    if (!resultErrorMessage) {
      requestApi
        .create(onCreateBody())
        .then((res) => {
          console.log(res);
          alert('게시글 작성이 완료 되었습니다');
          onListReRender();
          onHide();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [onValidateForm, requestApi, onCreateBody, onHide, onListReRender]);

  return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>글 작성 </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div className="grid-container grid grid-cols-5 mb-2">
            <label className="font-bold col-span-1">URL</label>
            <input
              name="url"
              type="text"
              className="col-span-3 rounded-md"
              placeholder="유튜브 url만 입력 가능"
              value={inputs.url}
              onChange={onHandleChange}
              disabled={isConfirmUrl}
            />
            <Button
              variant="danger"
              className="col-span-1"
              onClick={onCheckYoutubeUrlSubmit}
              disabled={isConfirmUrl}
            >
              검사
            </Button>
          </div>

          {isConfirmUrl && (
            <section>
              <div className="grid-container grid grid-cols-5 mb-2">
                <span className="font-bold col-span-1">이미지:</span>
                <img
                  src={metaData.metaImage}
                  alt="metaCardImage"
                  className="mb-2 col-span-3 w-100"
                />
              </div>
              <div
                className="grid-container grid grid-cols-5 mb-2"
                style={{ color: 'gray' }}
              >
                <span className="font-bold col-span-1">타이틀:</span>
                <p className="col-span-3">
                  {metaData.metaTitle.substring(0, 80)}...
                </p>
              </div>
              <div
                className="grid-container grid grid-cols-5 mb-2"
                style={{ color: 'gray' }}
              >
                <span className="font-bold col-span-1">설명:</span>
                <p className="col-span-3">
                  {metaData.metaDesc.substring(0, 80)}...
                </p>
              </div>
            </section>
          )}

          <div className="grid-container grid grid-cols-5 mb-2">
            <label className="font-bold col-span-1">작성자</label>
            <input
              type="text"
              name="author"
              className="col-span-3 rounded-md"
              value={inputs.author}
              onChange={onHandleChange}
            />
          </div>

          <div className="grid-container grid grid-cols-5 mb-2">
            <label className="font-bold col-span-1">제목</label>
            <input
              type="text"
              name="title"
              className="col-span-3 rounded-md"
              value={inputs.title}
              onChange={onHandleChange}
            />
          </div>

          <div className="grid-container grid grid-cols-5 mb-2">
            <label className="font-bold col-span-1">카테고리</label>
            <select
              name="category"
              className="rounded-md"
              onChange={onHandleChange}
            >
              <option value="">선택</option>
              <option value="morning">morning</option>
              <option value="afternoon">afternoon</option>
              <option value="night">night</option>
            </select>
          </div>

          <div className="grid-container grid grid-cols-5 mb-2">
            <label className="font-bold col-span-1">설명</label>
            <textarea
              // type="text"
              name="desc"
              className="col-span-3 rounded-md"
              value={inputs.desc}
              onChange={onHandleChange}
            />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" variant="primary" onClick={onCreateSubmit}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ItemForm;
