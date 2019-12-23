import * as ordersActions from '@store/orders/orders.actions';
import {Order} from '../../models/Order';

export interface OrdersState {
    orders: Order[];
    newOrder: any;
    chosenOrder: any;
    chosenDishInOrder: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: OrdersState = {
    orders: [],
    newOrder: {},
    chosenOrder: {},
    chosenDishInOrder: {},
    isLoading: false,
    canDelete: false,
};

export const ordersReducer = (
    state = initialState,
    action: ordersActions.Actions
): OrdersState => {
    switch (action.type) {
        case ordersActions.ORDER_CLEAN:
            return {...state, chosenOrder: {}, chosenDishInOrder: {}};
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
            const createdOrder = Object.assign({}, action.payload);
            return {
                ...state,
                chosenOrder: createdOrder};
        case ordersActions.UPDATE_ORDER:
            return {
                ...state,
                chosenOrder: action.payload,
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

        case ordersActions.CREATE_DISH_IN_ORDER:
            const or = Object.assign({}, state.chosenOrder);
            or.dishInOrders.push(action.payload);
            return {...state, chosenOrder: or};

        case ordersActions.START_FETCHING_DISH_IN_ORDER:
            return {
                ...state,
                isLoading: true,
            };
        case ordersActions.FINISH_FETCHING_DISH_IN_ORDER:
            const dishInOrder = action.payload;
            console.log('dishInOrder', dishInOrder);
            return {
                ...state,
                chosenDishInOrder: dishInOrder,
                isLoading: false,
            };
        case ordersActions.UPDATE_DISH_IN_ORDER:
            const chosenDishInOrder = action.payload;
            return {
                ...state,
                chosenDishInOrder: chosenDishInOrder
            };
        case ordersActions.DELETE_DISH_IN_ORDER:
            const dishInOrders = state.chosenOrder.dishInOrders
                .filter(dishInOrder => dishInOrder.id !== action.payload);
            const chosenOrder = Object.assign({}, state.chosenOrder);
            chosenOrder.dishInOrders = dishInOrders;
            return {
                ...state,
                chosenOrder: chosenOrder
            };
        default:
            return state;
    }
};
