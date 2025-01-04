export interface User {
  id: number;
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
