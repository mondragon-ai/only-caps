export type LineItemProps = {
  id: string;
  url: string;
  title: string;
  sku: string;
  variants: string[];
  img: string;
  price: number;
  cost: number;
  quantity: number;
};

export type CustomerProps = {
  id: number;
  name: string;
  first_name: string;
  last_name: string;
  address: {
    line1: string;
    city: string;
    state: string;
    country: string;
    zip: string;
  };
  email: string;
};

export type OrderProps = {
  id: string;
  order_name: number;
  name: string;
  status: string;
  total: number;
  delivery: string;
  date: string;
  line_items: LineItemProps[];
  shipping: number;
  customer: CustomerProps;
};
