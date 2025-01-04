import { createAction, props } from '@ngrx/store';

const ADD_USER = 'ADD USER';
const LOAD_USER = 'LOAD USER';
const UPDATE_USER = 'UPDATE USER';
const ADD_LEAVE = 'ADD LEAVE';
const LOAD_LEAVE = 'LOAD LEAVE';
const UPDATE_LEAVE = 'UPDATE LEAVE';

export const addUser = createAction(ADD_USER, props<any>());

export const loadUser = createAction(LOAD_USER, props<any>());

export const updateUser = createAction(UPDATE_USER, props<any>());

export const addLeave = createAction(ADD_LEAVE, props<any>());

export const loadLeave = createAction(LOAD_LEAVE, props<any>());

export const updateLeave = createAction(UPDATE_LEAVE, props<any>());
