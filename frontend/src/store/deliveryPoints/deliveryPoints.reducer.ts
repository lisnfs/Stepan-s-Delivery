import * as deliveryPointsActions from '@store/deliveryPoints/deliveryPoints.actions';
import {DeliveryPoint} from '../../models/DeliveryPoint';

export interface DeliveryPointsState {
    deliveryPoints: DeliveryPoint[];
    newDeliveryPoint: any;
    chosenDeliveryPoint: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: DeliveryPointsState = {
    deliveryPoints: [],
    newDeliveryPoint: {},
    chosenDeliveryPoint: {},
    isLoading: false,
    canDelete: false,
};

export const deliveryPointsReducer = (
    state = initialState,
    action: deliveryPointsActions.Actions
): DeliveryPointsState => {
    switch (action.type) {
        case deliveryPointsActions.START_FETCHING_DELIVERY_POINTS:
            return {...state, isLoading: true};
        case deliveryPointsActions.FINISH_FETCHING_DELIVERY_POINTS:
            return {
                ...state,
                deliveryPoints: action.payload,
                isLoading: false,
            };
        case deliveryPointsActions.START_FETCHING_DELIVERY_POINT:
            return {
                ...state,
                isLoading: true,
            };
        case deliveryPointsActions.FINISH_FETCHING_DELIVERY_POINT:
            const doctor = action.payload;
            console.log('doctor', doctor);
            return {
                ...state,
                chosenDeliveryPoint: doctor,
                isLoading: false,
            };
        case deliveryPointsActions.CREATE_DELIVERY_POINT:
            return {...state};
        case deliveryPointsActions.UPDATE_DELIVERY_POINT:
            return {
                ...state,
                chosenDeliveryPoint: initialState.chosenDeliveryPoint,
                deliveryPoints: state.deliveryPoints.map(
                    deliverypoint =>
                        deliverypoint.id === action.payload.id ?
                            action.payload : deliverypoint
                )
            };
        case deliveryPointsActions.DELETE_DELIVERY_POINT:
            return {
                ...state,
                deliveryPoints: state.deliveryPoints.filter(
                    deliverypoint =>
                        deliverypoint.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
