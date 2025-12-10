export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Contact {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  isFavorite: boolean;
  profilePicture: string;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
}
