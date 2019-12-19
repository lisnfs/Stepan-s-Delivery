import {createSelector} from 'reselect';
import {RootState} from '@store';

export const getDishesState = (state: RootState) => state.dishes;

export const isLoading = createSelector(
    getDishesState,
    state => state.isLoading,
);

export const getDishes = createSelector(
    getDishesState,
    state => state.dishes,
);


export const getChosenDish = createSelector(
    getDishesState,
    state => state.chosenDish,
);
