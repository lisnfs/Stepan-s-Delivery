import * as dishesActions from '@store/dishes/dishes.actions';
import {Dish} from '../../models/Dish';

export interface DishesState {
    dishes: Dish[];
    newDish: any;
    chosenDish: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: DishesState = {
    dishes: [],
    newDish: {},
    chosenDish: {},
    isLoading: false,
    canDelete: false,
};

export const dishesReducer = (
    state = initialState,
    action: dishesActions.Actions
): DishesState => {
    switch (action.type) {
        case dishesActions.START_FETCHING_DISHES:
            return {...state, isLoading: true};
        case dishesActions.FINISH_FETCHING_DISHES:
            return {
                ...state,
                dishes: action.payload,
                isLoading: false,
            };
        case dishesActions.START_FETCHING_DISH:
            return {
                ...state,
                isLoading: true,
            };
        case dishesActions.FINISH_FETCHING_DISH:
            const doctor = action.payload;
            console.log('doctor', doctor);
            return {
                ...state,
                chosenDish: doctor,
                isLoading: false,
            };
        case dishesActions.CREATE_DISH:
            return {...state};
        case dishesActions.UPDATE_DISH:
            return {
                ...state,
                chosenDish: action.payload,
                dishes: state.dishes.map(
                    doctor =>
                        doctor.id === action.payload.id ?
                            action.payload : doctor
                )
            };
        case dishesActions.DELETE_DISH:
            return {
                ...state,
                dishes: state.dishes.filter(
                    actor =>
                        actor.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
