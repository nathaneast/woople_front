import { useState, useCallback } from 'react';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { useToggle } from '../hooks';
import { requestApi } from '../api';

interface Props {
  show: boolean;
  onHide: () => void;
}

function ItemForm({ show, onHide }: Props) {
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

  const onCheckUrlSubmit = useCallback(
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
        })
        .catch((err) => console.error(err));

      toggleConfirmUrl();
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

    // TODO: youtube 포함 여부 검사

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
        })
        .catch((err) => console.error(err));
    }
  }, [onValidateForm, requestApi, onCreateBody]);

  return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div>
            <label>URL</label>
            <input
              name="url"
              type="text"
              value={inputs.url}
              onChange={onHandleChange}
              disabled={isConfirmUrl}
            />
            <Button
              variant="danger"
              onClick={onCheckUrlSubmit}
              disabled={isConfirmUrl}
            >
              검사
            </Button>
          </div>

          {isConfirmUrl && (
            <section>
              <img src={metaData.metaImage} style={{ width: '200px' }} />
              <div>
                <span>타이틀:</span>
                <p>{metaData.metaTitle}</p>
              </div>
              <div>
                <span>설명:</span>
                <p>{metaData.metaDesc}</p>
              </div>
            </section>
          )}

          <div>
            <label>작성자</label>
            <input
              type="text"
              name="author"
              value={inputs.author}
              onChange={onHandleChange}
            />
          </div>

          <div>
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={onHandleChange}
            />
          </div>

          <div>
            <label>카테고리</label>
            <select name="category" onChange={onHandleChange}>
              <option value="">선택</option>
              <option value="morning">morning</option>
              <option value="afternoon">afternoon</option>
              <option value="night">night</option>
            </select>
          </div>

          <div>
            <label>설명</label>
            <input
              type="text"
              name="desc"
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
