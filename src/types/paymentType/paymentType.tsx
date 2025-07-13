export type PaymentMethodType = "Bkash" | "Nagad" | "Rocket" | "Upay" | "Card";

export type CoinPriceOption = {
  coins: number;
  price: number;
};

export const coinPrices: CoinPriceOption[] = [
  { coins: 10, price: 1 },
  { coins: 150, price: 10 },
  { coins: 500, price: 20 },
  { coins: 1000, price: 35 },
];

export type PaymentType =
  | {
      user_email: string;
      payment_type: "purchase";
      payment_info: CoinPriceOption;
      payment_method: PaymentMethodType;
    }
  | {
      user_email: string;
      payment_type: "withdraw";
      payment_info: number;
      payment_method: PaymentMethodType;
    };

export type PaymentFromDBType = {
  _id: string;
  user_email: string;
  coins: number;
  price: number;
  payment_method: PaymentMethodType;
  payment_type: "purchase" | "withdraw";
  created_at: string;
};
