import {Dish} from './Dish';
import {Order} from './Order';

export interface DishInOrder {
    id?: number;
    dish_id?: number;
    order_id?: number;
    count?: number;
    dish?: Dish;
    order?: Order;
}
