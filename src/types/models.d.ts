export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
