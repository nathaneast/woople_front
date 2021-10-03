interface Props {
  index: number;
  title: string;
  desc: string;
  author: string;
  redirectUrl: string;
  imagePath: string;
  onShowItemDetail: (isOnModal: boolean, contentsKey: number | null) => void;
}

function ItemCard({ index, title, author, desc, imagePath, redirectUrl, onShowItemDetail }: Props) {
  return (
    <article onClick={() => onShowItemDetail(true, index)}>
      <section>
        mock image
        <div
          style={{ width: '200px', height: '200px', backgroundColor: 'green' }}
        ></div>
      </section>

      <section>
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
      </section>

      <section>
        <button>
          <a href={redirectUrl} target="_blank" rel="noopner noreferrer">
            링크이동
          </a>
        </button>
      </section>
    </article>
  );
}

export default ItemCard;
