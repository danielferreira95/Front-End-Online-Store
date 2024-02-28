import { ReactNode } from 'react';

export type CategoryType = {
  id: string,
  name: string,
  selected: boolean,
};

export type ProductType = {
  name: ReactNode;
  id: string,
  title: string,
  thumbnail: string,
  price: number,
};

export type ProductListProps = {
  categoryId: string;
};
