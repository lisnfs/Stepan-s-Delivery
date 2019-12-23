import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Order} from '../../models/Order';
import {DishInOrder} from '../../models/DishInOrder';
export const ORDER_CLEAN = '[ORDERS] ORDER_CLEAN';

export const START_FETCHING_ORDERS = '[ORDERS] START_FETCHING_ORDERS';
export const FINISH_FETCHING_ORDERS = '[ORDERS] FINISH_FETCHING_ORDERS';
export const FAULT_FETCHING_ORDERS = '[ORDERS] FAULT_FETCHING_ORDERS';

export const START_FETCHING_ORDER = '[ORDERS] START_FETCHING_ORDER';
export const FINISH_FETCHING_ORDER = '[ORDERS] FINISH_FETCHING_ORDER';
export const FAULT_FETCHING_ORDER = '[ORDERS] FAULT_FETCHING_ORDER';

export const CREATE_ORDER = '[ORDERS] CREATE_ORDER';

export const UPDATE_ORDER = '[ORDERS] UPDATE_ORDER';
export const DELETE_ORDER = '[ORDERS] DELETE_ORDER';

export const START_FETCHING_DISH_IN_ORDER = '[DISH_IN_ORDERS] START_FETCHING_DISH_IN_ORDER';
export const FINISH_FETCHING_DISH_IN_ORDER = '[DISH_IN_ORDERS] FINISH_FETCHING_DISH_IN_ORDER';
export const FAULT_FETCHING_DISH_IN_ORDER = '[DISH_IN_ORDERS] FAULT_FETCHING_DISH_IN_ORDER';

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
    clean: () => createAction(ORDER_CLEAN),
    startFetchingOrders: () => createAction(START_FETCHING_ORDERS),
    startFetchingOrder: () => createAction(START_FETCHING_ORDER),
    createOrder: (order: Order) => createAction(CREATE_ORDER, order),
    finishFetchingOrders: (payload: any) => createAction(FINISH_FETCHING_ORDERS, payload),
    finishFetchingOrder: (payload: any) => createAction(FINISH_FETCHING_ORDER, payload),
    updateOrder: (order: Order) => createAction(UPDATE_ORDER, order),
    deleteOrder: (id: number) => createAction(DELETE_ORDER, id),


    startFetchingDishInOrder: () => createAction(START_FETCHING_DISH_IN_ORDER),
    finishFetchingDishInOrder: (payload: any) => createAction(FINISH_FETCHING_DISH_IN_ORDER, payload),

    createDishInOrder: (dishInOrder: DishInOrder) => createAction(CREATE_DISH_IN_ORDER, dishInOrder),
    updateDishInOrder: (dishInOrder: DishInOrder) => createAction(UPDATE_DISH_IN_ORDER, dishInOrder),
    deleteDishInOrder: (id: number) => createAction(DELETE_DISH_IN_ORDER, id),
};

export const Thunks = {
    clearOrder: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.clean());
        };
    },
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
            axios.post(`${API_BASE_URL}/orders/`, order, getConfig())
                .then(order => {
                    debugger;
                    dipatch(Actions.createOrder(order.data as Order));
                });
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

    getDishInOrder: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDishInOrder());
            const promise = axios.get(`${API_BASE_URL}/dishInOrders/${id}`, getConfig());
            promise.then(response => {
                    console.log('response dishInOrders', response);
                    dispatch(Actions.finishFetchingDishInOrder(response.data));
                }
            );
        };
    },
    createDishInOrder: (dishInOrder: DishInOrder) => {
        return (dipatch: Dispatch) => {
            axios.post(`${API_BASE_URL}/dishInOrders`, dishInOrder, getConfig())
                .then(dishInOrder => {
                    dipatch(Actions.createDishInOrder(dishInOrder.data as DishInOrder));
                });
        };
    },
    updateDishInOrder: (dishInOrder: DishInOrder) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updateDishInOrder(dishInOrder));
            axios.post(`${API_BASE_URL}/dishInOrders/update`, dishInOrder, getConfig());
        };
    },
    deleteDishInOrders: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deleteDishInOrder(id));
            axios.delete(`${API_BASE_URL}/dishInOrders/${id}`, getConfig());
        };
    }

};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
