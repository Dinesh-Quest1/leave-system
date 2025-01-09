export interface User {
  id?: number | string;
  basicInfo: {
    firstName: string;
    lastName: string;
    email?: string;
    phoneNumber?: string | number;
    status?: boolean;
  };
  primaryContactInfo: {
    address?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string | number;
  };
  secondaryContactInfo?: {
    address?: string;
    street?: string;
    city?: string;
    state?: string;
    pincode?: string | number;
    usePrimaryContact?: [false];
  };
}

export type UsersById = {
  [id: string]: User[];
};
