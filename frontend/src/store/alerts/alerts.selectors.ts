import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getAlertState = (state: RootState) => state.alert;

export const getAlert = createSelector(
    getAlertState,
    alertState => alertState.alert,
);
