export type Leave = {
  id?: string | number;
  userId: string | number;
  typeOfLeave: string;
  comments?: string;
  startDate: string;
  endDate: string;
};
