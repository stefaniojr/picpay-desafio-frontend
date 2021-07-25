export type CardType = {
  card_number: string;
  cvv: number;
  expiry_date: string;
};

export type CardListType = Array<CardType>;
