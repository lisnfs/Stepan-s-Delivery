import * as couriersActions from '@store/couriers/couriers.actions';
import {Courier} from '@models';

export interface CouriersState {
    couriers: Courier[];
    newCourier: any;
    chosenCourier: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: CouriersState = {
    couriers: [],
    newCourier: {},
    chosenCourier: {},
    isLoading: false,
    canDelete: false,
};

export const couriersReducer = (
    state = initialState,
    action: couriersActions.Actions
): CouriersState => {
    switch (action.type) {
        case couriersActions.START_FETCHING_COURIERS:
            return {...state, isLoading: true};
        case couriersActions.FINISH_FETCHING_COURIERS:
            return {
                ...state,
                couriers: action.payload,
                isLoading: false,
            };
        case couriersActions.START_FETCHING_COURIER:
            return {
                ...state,
                isLoading: true,
            };
        case couriersActions.FINISH_FETCHING_COURIER:
            const courier = action.payload;
            console.log('courier', courier);
            return {
                ...state,
                chosenCourier: courier,
                isLoading: false,
            };
        case couriersActions.CREATE_COURIER:
            return {...state};
        case couriersActions.UPDATE_COURIER:
            return {
                ...state,
                chosenCourier: initialState.chosenCourier,
                couriers: state.couriers.map(
                    courier =>
                        courier.id === action.payload.id ?
                            action.payload : courier
                )
            };
        case couriersActions.DELETE_COURIER:
            return {
                ...state,
                couriers: state.couriers.filter(
                    actor =>
                        actor.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
