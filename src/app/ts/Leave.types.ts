export type Leave = {
  id?: string | number;
  userId: string | number;
  typeOfLeave: string;
  comments?: string;
  startDate: string;
  endDate: string;
};

export type LeavesByDate = {
  id?: string | number;
  userId: string | number;
  typeOfLeave: string;
  comments?: string;
  startDate: string;
  endDate: string;
  startSpan: number;
  endSpan: number;
};

export type LeavesByDateList = {
  [id: string]: LeavesByDate[];
};
