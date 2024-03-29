import {User} from './User';
import {DishInOrder} from './DishInOrder';

export interface Order {
    id?: number;
    timeOrder?: string;
    timeDelivery?: string;
    address?: string;
    payment?: number;
    discount?: number;
    address_id?: number;
    user_id?: number;
    user?: User;
    dishInOrders?: DishInOrder[];
}
