import { useEffect, useState, useCallback, ReactElement } from 'react';

interface Props {
  index: number;
  category: string;
  author: string;
  date: string;
  redirectUrl: string;
  title: string;
  imagePath: string;
  desc: string;
  onShowItemDetail: (isOnModal: boolean, contentsKey: number | null) => void,
}

// TODO: onClick 함수 변경
function ItemDetailCard({
  index,
  author,
  date,
  category,
  redirectUrl,
  title,
  imagePath,
  desc,
  onShowItemDetail
}: Props) {
  return (
  <article onClick={() => onShowItemDetail(true, index)}>
    <section>
      mock image
      <div style={{ width: "200px", height: "200px", backgroundColor: "orange" }}></div>
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

    <section>
      <button>
        <a href={redirectUrl} target="_blank" rel="noopner noreferrer">링크이동</a>
      </button>
    </section>
  </article>);
}

export default ItemDetailCard;
