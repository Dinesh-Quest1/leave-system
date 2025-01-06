import { createReducer, on } from '@ngrx/store';
import {
  addLeave,
  addUser,
  loadLeave,
  loadUser,
  updateLeave,
  updateUser,
} from './app.action';

export const initialState = {
  users: [],
  leaves: [],
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
  })
);
