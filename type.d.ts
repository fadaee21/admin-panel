export interface AuthContextValue {
  login: (string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
}
export type Children = {
  children: ReactNode;
};
export type LoginInput = {
  email: string;
  password: string;
};
export interface UserRoot {
  status: string;
  message: any;
  data: Data;
}

export interface UserData {
  user: User;
  token: string;
}

export interface UserEdit {
  name: string;
  email: string;
  cellphone: string;
  password: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
  cellphone: string;
  created_at: string;
}

export interface Links {
  first: string;
  last: string;
  prev: any;
  next: string;
}
export interface Link {
  url?: string;
  label: string;
  active: boolean;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface UserListType {
  users: User[];
  links: Links;
  meta: Meta;
}
export interface UserListRoot {
  status: string;
  message: any;
  data: UserListType;
}

export interface Image {
  id: number;
  product_id: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  category_id: number;
  primary_image: string;
  primary_image_blurDataURL: string;
  status_value: number;
  status: string;
  price: number;
  quantity: number;
  description: string;
  is_sale: boolean;
  sale_price: number;
  date_on_sale_from: string;
  date_on_sale_to: string;
  images: Image[];
}

export interface ProductRoot {
  products: Product[];
  links: Links;
  meta: Meta;
}
