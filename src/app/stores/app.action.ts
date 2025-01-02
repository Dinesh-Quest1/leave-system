import { createAction } from '@ngrx/store';

const ADD_USER = 'ADD USER';
const UPDATE_USER = 'UPDATE USER';
const ADD_LEAVE = 'ADD LEAVE';
const UPDATE_LEAVE = 'UPDATE LEAVE';

export const addUser = createAction(ADD_USER);

export const updateUser = createAction(UPDATE_USER);

export const addLeave = createAction(ADD_LEAVE);

export const updateLeave = createAction(UPDATE_LEAVE);
