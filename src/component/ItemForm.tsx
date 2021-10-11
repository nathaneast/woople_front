import { useState, useCallback } from 'react';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { useBool } from '../hooks';


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

  const [isConfirmUrl, onHandleConfirmUrl] = useBool(false);

  const onHandleChange = useCallback((e) => {
    const { name, value } = e.target;

    console.log(name, value, 'onHandleChange')
    setInputs((prev) => ({
      ...prev,
      [name]: value
  }));
}, [setInputs]);

  const onCheckUrlSubmit = useCallback((e) => {
    e.preventDefault();
    console.log('onCheckUrlSubmit');
    
    // TODO: 요청 후 체크 로직
    onHandleConfirmUrl();
  }, [onHandleConfirmUrl]);

  const onCreateValidate = useCallback(() => {
    const onErrorProcess = (message: string): string => {
      alert(message);
      return message;
    }
    const { url, author, category, title, desc } = inputs;

    if (!isConfirmUrl) {
      return onErrorProcess('url 검사 버튼을 눌러 주세요');
    }

    const isInputsNullCheck: boolean = [url, author, category, title, desc].every((item: string) => item);
    if (!isInputsNullCheck) {
      return onErrorProcess('빈 값을 모두 입력 해주세요');
    }

    return '';
  }, [isConfirmUrl, inputs]);

  const onCreateSubmit = useCallback(() => {
    const resultErrorMessage: string = onCreateValidate();

    if (!resultErrorMessage) {
      console.log('onCreateSubmit fetch');
    }
  }, [onCreateValidate])

  console.log(inputs)

  return (
    <Modal show={show} onHide={onHide} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Form</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <div>
            <label>URL</label>
            <input name="url" type="text" value={inputs.url} onChange={onHandleChange} />
            <button onClick={onCheckUrlSubmit}>검사</button>
          </div>

          <div>
            <label>작성자</label>
            <input type="text" name="author" value={inputs.author} onChange={onHandleChange} />
          </div>

          <div>
            <label>제목</label>
            <input type="text" name="title" value={inputs.title} onChange={onHandleChange} />
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
            <input type="text" name="desc" value={inputs.desc} onChange={onHandleChange} />
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" variant="primary" onClick={onCreateSubmit}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ItemForm;
