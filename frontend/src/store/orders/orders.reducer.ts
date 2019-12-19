import * as ordersActions from '@store/orders/orders.actions';
import {Order} from '../../models/Order';

export interface OrdersState {
    orders: Order[];
    newOrder: any;
    chosenOrder: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: OrdersState = {
    orders: [],
    newOrder: {},
    chosenOrder: {},
    isLoading: false,
    canDelete: false,
};

export const ordersReducer = (
    state = initialState,
    action: ordersActions.Actions
): OrdersState => {
    switch (action.type) {
        case ordersActions.START_FETCHING_ORDERS:
            return {...state, isLoading: true};
        case ordersActions.FINISH_FETCHING_ORDERS:
            return {
                ...state,
                orders: action.payload,
                isLoading: false,
            };
        case ordersActions.START_FETCHING_ORDER:
            return {
                ...state,
                isLoading: true,
            };
        case ordersActions.FINISH_FETCHING_ORDER:
            const doctor = action.payload;
            console.log('doctor', doctor);
            return {
                ...state,
                chosenOrder: doctor,
                isLoading: false,
            };
        case ordersActions.CREATE_ORDER:
            return {...state};
        case ordersActions.UPDATE_ORDER:
            return {
                ...state,
                chosenOrder: initialState.chosenOrder,
                orders: state.orders.map(
                    order =>
                        order.id === action.payload.id ?
                            action.payload : order
                )
            };
        case ordersActions.DELETE_ORDER:
            return {
                ...state,
                orders: state.orders.filter(
                    order =>
                        order.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
