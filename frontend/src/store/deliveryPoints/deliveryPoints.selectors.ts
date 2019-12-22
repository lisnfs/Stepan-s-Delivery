import {createSelector} from 'reselect';
import {RootState} from '@store';

export const getDeliveryPointsState = (state: RootState) => state.deliveryPoints;

export const isLoading = createSelector(
    getDeliveryPointsState,
    state => state.isLoading,
);

export const getDeliveryPoints = createSelector(
    getDeliveryPointsState,
    state => state.deliveryPoints,
);


export const getChosenDeliveryPoint = createSelector(
    getDeliveryPointsState,
    state => state.chosenDeliveryPoint,
);
