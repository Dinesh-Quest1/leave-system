import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../ts/User.types';
import { Leave } from '../ts/Leave.types';
import { SnackBar } from '../ts/global.types';

const appStore = createFeatureSelector<any>('app');

export const getUsers = createSelector(
  appStore,
  (state): User[] => state.users
);

export const getLeaves = createSelector(
  appStore,
  (state): Leave[] => state?.leaves
);

export const getLoadingState = createSelector(
  appStore,
  (state): boolean => state.loading
);

export const getSnackBarState = createSelector(
  appStore,
  (state): SnackBar => state.snackBar
);
