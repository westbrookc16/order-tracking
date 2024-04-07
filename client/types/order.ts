export type order = {
  id: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  status: string;
  name: string | undefined;
  description: string | undefined;
  clientId: number | undefined;
  quantity: number | undefined;
  clientDueDate: Date | undefined;
  agencyDueDate: Date | undefined;
  userId: string;
};
