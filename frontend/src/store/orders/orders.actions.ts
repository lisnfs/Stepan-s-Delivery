import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Order} from '../../models/Order';
import {DishInOrder} from '../../models/DishInOrder';

export const START_FETCHING_ORDERS = '[ORDERS] START_FETCHING_ORDERS';
export const FINISH_FETCHING_ORDERS = '[ORDERS] FINISH_FETCHING_ORDERS';
export const FAULT_FETCHING_ORDERS = '[ORDERS] FAULT_FETCHING_ORDERS';

export const START_FETCHING_ORDER = '[ORDERS] START_FETCHING_ORDER';
export const FINISH_FETCHING_ORDER = '[ORDERS] FINISH_FETCHING_ORDER';
export const FAULT_FETCHING_ORDER = '[ORDERS] FAULT_FETCHING_ORDER';

export const CREATE_ORDER = '[ORDERS] CREATE_ORDER';

export const UPDATE_ORDER = '[ORDERS] UPDATE_ORDER';
export const DELETE_ORDER = '[ORDERS] DELETE_ORDER';

export const CREATE_DISH_IN_ORDER = '[DISH_IN_ORDER] CREATE_DISH_IN_ORDER';

export const UPDATE_DISH_IN_ORDER = '[DISH_IN_ORDERS] UPDATE_DISH_IN_ORDER';
export const DELETE_DISH_IN_ORDER = '[DISH_IN_ORDERS] DELETE_DISH_IN_ORDER';

export const CAN_DELETE_ORDER = '[ORDERS] CAN_DELETE_ORDER';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingOrders: () => createAction(START_FETCHING_ORDERS),
    startFetchingOrder: () => createAction(START_FETCHING_ORDER),
    createOrder: (order: Order) => createAction(CREATE_ORDER, order),
    finishFetchingOrders: (payload: any) => createAction(FINISH_FETCHING_ORDERS, payload),
    finishFetchingOrder: (payload: any) => createAction(FINISH_FETCHING_ORDER, payload),
    updateOrder: (order: Order) => createAction(UPDATE_ORDER, order),
    deleteOrder: (id: number) => createAction(DELETE_ORDER, id),

    createDishInOrder: (dishInOrder: DishInOrder) => createAction(CREATE_DISH_IN_ORDER, dishInOrder),
    updateDishInOrders: (dishInOrder: DishInOrder) => createAction(UPDATE_DISH_IN_ORDER, dishInOrder),
    deleteDishInOrders: (id: number) => createAction(DELETE_DISH_IN_ORDER, id),
};

export const Thunks = {
    getOrders: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingOrders());

            const promise = axios.get(`${API_BASE_URL}/orders/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingOrders(response.data));
                }
            );
        };
    },
    getOrder: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingOrder());
            const promise = axios.get(`${API_BASE_URL}/orders/${id}`, getConfig());
            promise.then(response => {
                    console.log('response order', response);
                    dispatch(Actions.finishFetchingOrder(response.data));
                }
            );
        };
    },
    createOrder: (order: Order) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createOrder(order));
            axios.post(`${API_BASE_URL}/orders/`, order, getConfig());
        };
    },
    updateOrder: (order: Order) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updateOrder(order));
            axios.post(`${API_BASE_URL}/orders/update`, order, getConfig());
        };
    },
    deleteOrder: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deleteOrder(id));
            axios.delete(`${API_BASE_URL}/orders/${id}`, getConfig());
        };
    },
    createDishInOrder: (dishInOrder: DishInOrder) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createDishInOrder(dishInOrder));
            axios.post(`${API_BASE_URL}/dishInOrders/${dishInOrder.order_id}`, dishInOrder, getConfig());
        };
    },
    updateDishInOrders: (dishInOrder: DishInOrder) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updateDishInOrders(dishInOrder));
            axios.post(`${API_BASE_URL}/dishInOrders/update`, dishInOrder, getConfig());
        };
    },
    deleteDishInOrders: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deleteDishInOrders(id));
            axios.delete(`${API_BASE_URL}/dishInOrders/${id}`, getConfig());
        };
    }

};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
