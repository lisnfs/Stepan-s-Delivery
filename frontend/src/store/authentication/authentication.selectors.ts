import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getAuth = (state: RootState) => state.auth;

export const getLoggingIn = createSelector(
    getAuth,
    authState => authState.loggingIn,
);
