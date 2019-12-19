import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Courier} from '@models';

export const START_FETCHING_COURIERS = '[COURIERS] START_FETCHING_COURIERS';
export const FINISH_FETCHING_COURIERS = '[COURIERS] FINISH_FETCHING_COURIERS';
export const FAULT_FETCHING_COURIERS = '[COURIERS] FAULT_FETCHING_COURIERS';

export const START_FETCHING_COURIER = '[COURIERS] START_FETCHING_COURIER';
export const FINISH_FETCHING_COURIER = '[COURIERS] FINISH_FETCHING_COURIER';
export const FAULT_FETCHING_COURIER = '[COURIERS] FAULT_FETCHING_COURIER';

export const CREATE_COURIER = '[COURIERS] CREATE_COURIER';

export const UPDATE_COURIER = '[COURIERS] UPDATE_COURIER';
export const DELETE_COURIER = '[COURIERS] DELETE_COURIER';

export const CAN_DELETE_COURIER = '[COURIERS] CAN_DELETE_COURIER';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingCouriers: () => createAction(START_FETCHING_COURIERS),
    startFetchingCourier: () => createAction(START_FETCHING_COURIER),
    createCourier: (courier: Courier) => createAction(CREATE_COURIER, courier),
    finishFetchingCouriers: (payload: any) => createAction(FINISH_FETCHING_COURIERS, payload),
    finishFetchingCourier: (payload: any) => createAction(FINISH_FETCHING_COURIER, payload),
    updateCourier: (courier: Courier) => createAction(UPDATE_COURIER, courier),
    deleteCourier: (id: number) => createAction(DELETE_COURIER, id),
};

export const Thunks = {
    getCouriers: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingCouriers());

            const promise = axios.get(`${API_BASE_URL}/couriers/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingCouriers(response.data));
                }
            );
        };
    },
    getCourier: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingCourier());
            const promise = axios.get(`${API_BASE_URL}/couriers/${id}`, getConfig());
            promise.then(response => {
                    console.log('response courier', response);
                    dispatch(Actions.finishFetchingCourier(response.data));
                }
            );
        };
    },
    createCourier: (courier: Courier) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createCourier(courier));
            axios.post(`${API_BASE_URL}/couriers/`, courier, getConfig());
        };
    },
    updateCourier: (courier: Courier) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updateCourier(courier));
            axios.post(`${API_BASE_URL}/couriers/update`, courier, getConfig());
        };
    },
    deleteCourier: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deleteCourier(id));
            axios.delete(`${API_BASE_URL}/couriers/${id}`, getConfig());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
