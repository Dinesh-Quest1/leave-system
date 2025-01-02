import { createReducer, on } from '@ngrx/store';
import { addLeave, addUser, updateLeave, updateUser } from './app.action';
import { mockList } from '../constants/mockData';

export const initialState = {
  users: mockList,
  leaves: [],
};

export const AppReducer = createReducer(
  initialState,
  on(addUser, (state: any, action: any) => {
    return { ...state, users: [...state.users, action.value] };
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
