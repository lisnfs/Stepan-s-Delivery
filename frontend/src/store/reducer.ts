import {combineReducers, Reducer} from 'redux';
import {RootState} from './state.types';
import {alertsReducer} from '@store/alerts';
import {authenticationReducer} from '@store/authentication';
import {registrationReducer} from '@store/registration';
import {ordersReducer} from '@store/orders';
import {dishesReducer} from '@store/dishes';
import {couriersReducer} from '@store/couriers';
import {deliveryPointsReducer} from '@store/deliveryPoints';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
    alert: alertsReducer,
    auth: authenticationReducer,
    registration: registrationReducer,
    orders: ordersReducer,
    dishes: dishesReducer,
    couriers: couriersReducer,
    deliveryPoints: deliveryPointsReducer,

});
