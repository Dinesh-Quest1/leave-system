export interface Leave {
  userId: string | number;
  typeOfLeave: string;
  comments?: string;
  startDate: string;
  endDate: string;
}
