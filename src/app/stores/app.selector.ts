import { createFeatureSelector, createSelector } from '@ngrx/store';

const appStore = createFeatureSelector<any>('app');

export const getUsers = createSelector(appStore, (state): any[] => state.users);

export const getLeaves = createSelector(
  appStore,
  (state): any[] => state?.leaves
);
