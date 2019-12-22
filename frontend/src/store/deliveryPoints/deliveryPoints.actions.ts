import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {DeliveryPoint} from '../../models/DeliveryPoint';

export const START_FETCHING_DELIVERY_POINTS = '[DELIVERY_POINTS] START_FETCHING_DELIVERY_POINTS';
export const FINISH_FETCHING_DELIVERY_POINTS = '[DELIVERY_POINTS] FINISH_FETCHING_DELIVERY_POINTS';
export const FAULT_FETCHING_DELIVERY_POINTS = '[DELIVERY_POINTS] FAULT_FETCHING_DELIVERY_POINTS';

export const START_FETCHING_DELIVERY_POINT = '[DELIVERY_POINTS] START_FETCHING_DELIVERY_POINT';
export const FINISH_FETCHING_DELIVERY_POINT = '[DELIVERY_POINTS] FINISH_FETCHING_DELIVERY_POINT';
export const FAULT_FETCHING_DELIVERY_POINT = '[DELIVERY_POINTS] FAULT_FETCHING_DELIVERY_POINT';

export const CREATE_DELIVERY_POINT = '[DELIVERY_POINTS] CREATE_DELIVERY_POINT';

export const UPDATE_DELIVERY_POINT = '[DELIVERY_POINTS] UPDATE_DELIVERY_POINT';
export const DELETE_DELIVERY_POINT = '[DELIVERY_POINTS] DELETE_DELIVERY_POINT';

export const CAN_DELETE_DELIVERY_POINT = '[DELIVERY_POINTS] CAN_DELETE_DELIVERY_POINT';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingDeliveryPoints: () => createAction(START_FETCHING_DELIVERY_POINTS),
    startFetchingDeliveryPoint: () => createAction(START_FETCHING_DELIVERY_POINT),
    createDeliveryPoint: (deliveryPoint: DeliveryPoint) => createAction(CREATE_DELIVERY_POINT, deliveryPoint),
    finishFetchingDeliveryPoints: (payload: any) => createAction(FINISH_FETCHING_DELIVERY_POINTS, payload),
    finishFetchingDeliveryPoint: (payload: any) => createAction(FINISH_FETCHING_DELIVERY_POINT, payload),
    updateDeliveryPoint: (deliveryPoint: DeliveryPoint) => createAction(UPDATE_DELIVERY_POINT, deliveryPoint),
    deleteDeliveryPoint: (id: number) => createAction(DELETE_DELIVERY_POINT, id),
};

export const Thunks = {
    getDeliveryPoints: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDeliveryPoints());

            const promise = axios.get(`${API_BASE_URL}/deliveryPoints/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingDeliveryPoints(response.data));
                }
            );
        };
    },
    getDeliveryPoint: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDeliveryPoint());
            const promise = axios.get(`${API_BASE_URL}/deliveryPoints/${id}`, getConfig());
            promise.then(response => {
                    console.log('response deliveryPoint', response);
                    dispatch(Actions.finishFetchingDeliveryPoint(response.data));
                }
            );
        };
    },
    createDeliveryPoint: (deliveryPoint: DeliveryPoint) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createDeliveryPoint(deliveryPoint));
            axios.post(`${API_BASE_URL}/deliveryPoints/`, deliveryPoint, getConfig());
        };
    },
    updateDeliveryPoint: (deliveryPoint: DeliveryPoint) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updateDeliveryPoint(deliveryPoint));
            axios.post(`${API_BASE_URL}/deliveryPoints/update`, deliveryPoint, getConfig());
        };
    },
    deleteDeliveryPoint: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deleteDeliveryPoint(id));
            axios.delete(`${API_BASE_URL}/deliveryPoints/${id}`, getConfig());
        };
    }

};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
