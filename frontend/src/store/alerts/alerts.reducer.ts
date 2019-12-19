import * as alertActions from './alerts.actions';
import {AlertItem} from '../../models/AlertItem';

export interface AlertState {
    alert: AlertItem;
}

const initialState: AlertState = {
    alert: {type: '', message: undefined},
};

export const alertsReducer = (
    state = initialState,
    action: alertActions.Actions
): AlertState => {
    switch (action.type) {
        case alertActions.CLEAR:
            return {
                ...state,
                alert: {}
            };
        case alertActions.ERROR:
            console.log(' alertActions.ERROR action.payload', action.payload);
            return {
                ...state,
                alert: {
                    type: 'alert-danger',
                    message: action.payload,
                }
            };
        case alertActions.SUCCESS:
            console.log(' alertActions.SUCCESS action.payload', action.payload);
            return {
                ...state,
                alert: {
                    type: 'alert-success',
                    message: action.payload,
                }
            };
        default:
            return state;
    }
};
