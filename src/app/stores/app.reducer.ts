import { createReducer, on } from '@ngrx/store';
import {
  addLeave,
  addUser,
  loadLeave,
  loadUser,
  snackBar,
  startLoader,
  stopLoader,
  updateLeave,
  updateUser,
} from './app.action';

export const initialState = {
  users: [],
  leaves: [],
  loading: false,
  snackBar: null,
};

export const AppReducer = createReducer(
  initialState,
  on(loadUser, (state: any, action: any) => {
    return { ...state, users: action.value || [] };
  }),
  on(addUser, (state: any, action: any) => {
    return { ...state, users: [...state.users, action.value] };
  }),
  on(loadLeave, (state: any, action: any) => {
    return { ...state, leaves: action.value };
  }),
  on(addLeave, (state: any, action: any) => {
    return { ...state, leaves: [...state.leaves, action.value] };
  }),
  on(updateUser, (state, action: any) => {
    return { ...state };
  }),
  on(updateLeave, (state, action: any) => {
    return { ...state };
  }),
  on(startLoader, (state) => {
    return { ...state, loading: true };
  }),
  on(stopLoader, (state) => {
    return { ...state, loading: false };
  }),
  on(snackBar, (state, action: any) => {
    return {
      ...state,
      snackBar: action?.message ? { message: action?.message } : null,
    };
  })
);
