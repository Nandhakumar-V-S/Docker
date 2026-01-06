import { createSelector } from 'reselect';
const authSelect = (state) => state.auth;

export const selectAuth = createSelector([authSelect], (auth) => auth);
export const selectCurrentAdmin = createSelector([authSelect], (auth) => auth.current);

export const isLoggedIn = createSelector([authSelect], (auth) => auth.isLoggedIn);
export const selectAuthStatus = createSelector([authSelect], (auth) => auth.authStatus);