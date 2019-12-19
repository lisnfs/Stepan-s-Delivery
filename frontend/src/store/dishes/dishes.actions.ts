import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Dish} from '../../models/Dish';

export const START_FETCHING_DISHES = '[DISHES] START_FETCHING_DISHES';
export const FINISH_FETCHING_DISHES = '[DISHES] FINISH_FETCHING_DISHES';
export const FAULT_FETCHING_DISHES = '[DISHES] FAULT_FETCHING_DISHES';

export const START_FETCHING_DISH = '[DISHES] START_FETCHING_DISH';
export const FINISH_FETCHING_DISH = '[DISHES] FINISH_FETCHING_DISH';
export const FAULT_FETCHING_DISH = '[DISHES] FAULT_FETCHING_DISH';

export const CREATE_DISH = '[DISHES] CREATE_DISH';

export const UPDATE_DISH = '[DISHES] UPDATE_DISH';
export const DELETE_DISH = '[DISHES] DELETE_DISH';

export const CAN_DELETE_DISH = '[DISHES] CAN_DELETE_DISH';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingDishes: () => createAction(START_FETCHING_DISHES),
    startFetchingDish: () => createAction(START_FETCHING_DISH),
    createDish: (dish: Dish) => createAction(CREATE_DISH, dish),
    finishFetchingDishes: (payload: any) => createAction(FINISH_FETCHING_DISHES, payload),
    finishFetchingDish: (payload: any) => createAction(FINISH_FETCHING_DISH, payload),
    updateDish: (dish: Dish) => createAction(UPDATE_DISH, dish),
    deleteDish: (id: number) => createAction(DELETE_DISH, id),
};

export const Thunks = {
    getDishes: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDishes());

            const promise = axios.get(`${API_BASE_URL}/dishes/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingDishes(response.data));
                }
            );
        };
    },
    getDish: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDish());
            const promise = axios.get(`${API_BASE_URL}/dishes/${id}`, getConfig());
            promise.then(response => {
                    console.log('response dish', response);
                    dispatch(Actions.finishFetchingDish(response.data));
                }
            );
        };
    },
    createDish: (dish: Dish) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.createDish(dish));
            axios.post(`${API_BASE_URL}/dishes/`, dish, getConfig());
        };
    },
    updateDish: (dish: Dish) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.updateDish(dish));
            axios.post(`${API_BASE_URL}/dishes/update`, dish, getConfig());
        };
    },
    deleteDish: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.deleteDish(id));
            axios.delete(`${API_BASE_URL}/dishes/${id}`, getConfig());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
