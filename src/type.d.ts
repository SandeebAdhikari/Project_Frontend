export type FilmBase = { film_id: number; title: string; rating: string };
export type FilmTop = FilmBase & {
  release_year: number;
  category: string;
  rented: number;
};
export type FilmList = FilmBase & {
  description: string;
  release_year: number;
  length: number;
  rental_rate: number;
  category: string;
  actors: string[] | string | null;
};
export type FilmsDetail = FilmList & {
  rental_duration: number;
  total_copies: number;
  rented_out: number;
  available: number;
  replacement_cost: number;
  categories: string[];
  actors: string[];
};

export type Rental = {
  rental_id: number;
  rental_date: string;
  inventory_id: number;
  customer_id: number;
  return_date: string | null;
  staff_id: number;
  last_update: string;
};

export type SearchableSelectProps<T> = {
  apiUrl: string;
  placeholder?: string;
  queryKey?: string;
  labelExtractor: (item: T) => string;
  onSelect?: (item: T) => void;
};

export type Actor = {
  actor_id: number;
  first_name: string;
  last_name: string;
  film_count: number;
  rental_count: number;
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  country: string;
  active: boolean;
  activeRentals: number;
  totalRentals: number;
};
