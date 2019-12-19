import {createSelector} from 'reselect';
import {RootState} from '@store';

export const getCouriersState = (state: RootState) => state.couriers;

export const isLoading = createSelector(
    getCouriersState,
    state => state.isLoading,
);

export const getCouriers = createSelector(
    getCouriersState,
    state => state.couriers,
);


export const getChosenCourier = createSelector(
    getCouriersState,
    state => state.chosenCourier,
);
