import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Order} from '../../models/Order';

export const START_FETCHING_ORDERS = '[ORDERS] START_FETCHING_ORDERS';
export const FINISH_FETCHING_ORDERS = '[ORDERS] FINISH_FETCHING_ORDERS';
export const FAULT_FETCHING_ORDERS = '[ORDERS] FAULT_FETCHING_ORDERS';

export const START_FETCHING_ORDER = '[ORDERS] START_FETCHING_ORDER';
export const FINISH_FETCHING_ORDER = '[ORDERS] FINISH_FETCHING_ORDER';
export const FAULT_FETCHING_ORDER = '[ORDERS] FAULT_FETCHING_ORDER';

export const CREATE_ORDER = '[ORDERS] CREATE_ORDER';

export const UPDATE_ORDER = '[ORDERS] UPDATE_ORDER';
export const DELETE_ORDER = '[ORDERS] DELETE_ORDER';

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
    }

};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
