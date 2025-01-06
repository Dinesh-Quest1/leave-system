import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../models/User';
import { Leave } from '../models/Leave';

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
