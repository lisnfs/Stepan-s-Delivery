import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getRegistrationState = (state: RootState) => state.registration;

export const getRegistering = createSelector(
    getRegistrationState,
    state => state.registering,
);
