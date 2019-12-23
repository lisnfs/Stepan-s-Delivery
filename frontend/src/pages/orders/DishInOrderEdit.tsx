import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenDish, getDishes, isLoading, Thunks as doctorsThunks} from '@store/dishes';
import {Dish} from '../../models/Dish';
import {getChosenDishInOrder, getOrders, Thunks as ordersThunks} from '@store/orders';

interface Props {
    match: any;
    dishes: any;
    orders: any;
    isLoading: boolean;
    onGetDishInOrder: any;
    onUpdateDishInOrders: any;
    chosenDishInOrder: any;
    getDishInOrder: any;
}

interface State {
    dishInOrder: Dish;
}

class DishInOrderEditComponent extends React.Component<Props, State> {

    dishInOrder;

    state = {
        dishInOrder: {
        },
    };

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.dishInOrder;
        item[name] = value;
        this.setState({dishInOrder: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.dishInOrder;
        this.props.onUpdateDishInOrders(item);
    }

    componentDidMount() {
        this.props.onGetDishInOrder(this.props.match.params.id);
    }

    render() {
        this.dishInOrder =  this.props.getDishInOrder ?
            this.props.getDishInOrder : null;

        if (!this.dishInOrder.id) {
            return (<p>Loading</p>);
        }


        const dish = this.props.dishes.find(dish => dish.id === this.dishInOrder.dish_id);
        return (
            <div>
                <AppNavBar/>
                <Container>
                    <h2>Изменить пунк заказа</h2>
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="name">Название блюда</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                disabled
                                value={dish.name || ''}
                            />
                            <Label for="ingredients">Описание</Label>
                            <Input
                                type="ingredients"
                                name="ingredients"
                                id="ingredients"
                                disabled
                                value={dish.ingredients || ''}
                            />
                            <Label for="cost">Стоимость</Label>
                            <Input
                                type="number"
                                name="cost"
                                id="cost"
                                disabled
                                value={dish.cost || 0}
                            />
                            <Label for="count">Количество</Label>
                            <Input
                                type="number"
                                min="1"
                                name="count"
                                id="count"
                                value={this.dishInOrder.count}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary"
                                    type="submit">{this.dishInOrder.id ? 'Сохранить' : 'Добавить'}</Button>{' '}
                            <Button color="secondary" tag={Link}
                                    to={'/orders/' + this.dishInOrder.order_id}>Назад</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: isLoading(state),
        dishes: getDishes(state),
        orders: getOrders(state),
        chosenDish: getChosenDish(state),
        getDishInOrder: getChosenDishInOrder(state)
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onUpdateDishInOrders: (id) => {
        dispatch(ordersThunks.updateDishInOrder(id));
    },
    onGetDishInOrder: (id) => {
        dispatch(ordersThunks.getDishInOrder(id));
    }
});

export const DishInOrderEdit = connect(mapStateToProps, mapDispatchToProps)(DishInOrderEditComponent);
