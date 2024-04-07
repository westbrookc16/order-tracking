export interface History {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  orderId: number;
  status: string;
  userId: string;
  notes: string;
  user: User;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  name: string;
  clientId: number;
  isAdmin: boolean;
}
