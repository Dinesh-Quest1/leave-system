import { SnackBar } from './global.types';
import { Leave } from './Leave.types';
import { User } from './User.types';

export type StoreState = {
  users: User[] | null;
  leaves: Leave[] | null;
  loading: boolean;
  snackBar: SnackBar;
};
