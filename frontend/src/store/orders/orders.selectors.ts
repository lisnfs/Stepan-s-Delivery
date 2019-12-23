import {createSelector} from 'reselect';
import {RootState} from '@store';

export const getOrdersState = (state: RootState) => state.orders;

export const isLoading = createSelector(
    getOrdersState,
    state => state.isLoading,
);

export const getOrders = createSelector(
    getOrdersState,
    state => state.orders,
);


export const getChosenOrder = createSelector(
    getOrdersState,
    state => state.chosenOrder,
);

export const getChosenDishInOrder = createSelector(
    getOrdersState,
    state => state.chosenDishInOrder,
);
