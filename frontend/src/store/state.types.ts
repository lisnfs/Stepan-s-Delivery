import {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import {AlertState} from '@store/alerts';
import {AuthenticationState} from '@store/authentication';
import {RegistrationState} from '@store/registration';
import {OrdersState} from '@store/orders';
import {DishesState} from '@store/dishes';
import {CouriersState} from '@store/couriers';
import {DeliveryPointsState} from '@store/deliveryPoints';

export interface RootState {
    alert: AlertState;
    auth: AuthenticationState;
    registration: RegistrationState;
    orders: OrdersState;
    dishes: DishesState;
    couriers: CouriersState;
    deliveryPoints: DeliveryPointsState;
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
