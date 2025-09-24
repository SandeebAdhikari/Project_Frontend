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

export type Film = {
  film_id: number;
  title: string;
  description: string;
  release_year: number;
  rating: string;
  rental_duration: number;
  language: string;
  length: number;
  rental_rate: number;
  category: string;
  actors: string[] | string | null;
  total_copies: number;
  rented_out: number;
  available: number;
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
