import { useEffect, useState, useCallback, ReactElement } from 'react';

interface Props {
  index: number;
  author: string;
  date: string;
  redirectUrl: string;
  title: string;
  imagePath: string;
  desc: string;
  onShowItemDetail: (isOnModal: boolean, contentsKey: number | null) => void,
}

function ItemCard({
  index,
  author,
  date,
  redirectUrl,
  title,
  imagePath,
  desc,
  onShowItemDetail
}: Props) {
  return <article onClick={() => onShowItemDetail(true, index)}>ItemCard</article>;
}

export default ItemCard;
