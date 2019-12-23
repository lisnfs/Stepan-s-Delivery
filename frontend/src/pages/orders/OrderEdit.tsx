import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label, Table, ButtonGroup} from 'reactstrap';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk, history} from '@store';
import {getChosenOrder, getOrders, isLoading, Thunks as ordersThunks} from '@store/orders';
import {getDeliveryPoints, Thunks as deliveryPointsThunks} from '@store/deliveryPoints';
import {getDishes, Thunks as dishesThunks} from '@store/dishes';
import {debuglog} from 'util';
import {ACCESS_TOKEN, USER_ROLE} from '../../constants';
import {Actions as alertActions} from '@store/alerts';
import {Thunks} from '@store/authentication';
import {DishInOrder} from '../../models/DishInOrder';
import {Order} from '../../models/Order';

interface Props {
    match: any;
    orders: any;
    dishes: any;
    isLoading: boolean;
    onGetOrder: any;
    onEditOrder: any;
    onCreateOrder: any;
    chosenOrder: any;
    deliveryPoints: any;
    getDeliveryPoints: any;
    getDishes: any;
    createDishInOrder: any;
    deleteDishInOrders: any;
}

interface State {
    chosenOrder: any;
}

class OrderEditComponent extends React.Component<Props, State> {

    chosenOrder;

    state = {
        chosenOrder: {
            id: 0,
            client_id: 1,
            address_id: 1,
            dishInOrders: []
        },

    };

    componentDidMount() {
        this.props.getDeliveryPoints();
        this.props.getDishes();
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new ') {
            this.props.onGetOrder(this.props.match.params.id);
            console.log('got orders', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.chosenOrder;
        item[name] = value;
        this.setState({chosenOrder: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.chosenOrder;
        if (item.id && item.id !== 0) {
            this.props.onEditOrder(item);
        } else {
            this.props.onCreateOrder(item);
        }
    }

    createDishInOrder(id: number) {
        const dishInOrder = {

            count: 1,
            dish_id: id,
            order_id: this.props.chosenOrder.id,
        };
        this.props.createDishInOrder(dishInOrder);
    }

    render() {
        if (this.props.orders.isLoading) {
            return (<p>Loading</p>);
        }


        this.chosenOrder = this.props.chosenOrder ?
            this.props.chosenOrder : this.state.chosenOrder;
        debugger;

        const isCreated = this.chosenOrder.id;

        console.log(this.chosenOrder);


        let dishInOrderList = [<tr>
            <td style={{whiteSpace: 'nowrap'}}>
                Добавьте пункт заказа
            </td>
            <td style={{whiteSpace: 'nowrap'}}>
            </td>
            <td>
            </td>
        </tr>];
        if (this.chosenOrder.dishInOrders) {

            dishInOrderList = (this.chosenOrder.dishInOrders as DishInOrder[]).map(dishInOrder => {

                const dish = this.props.dishes.find(dish => dish.id === dishInOrder.dish_id);
                // console.log(dish);
                // debugger;
                return (
                    <tr key={dishInOrder.id}>
                        <td style={{whiteSpace: 'nowrap'}}>
                            {dish ? dish.name : null}
                        </td>
                        <td style={{whiteSpace: 'nowrap'}}>
                            {dishInOrder.count || 0}
                        </td>
                        <td>
                            <ButtonGroup>
                                <Button
                                    size="sm"
                                    color="primary"
                                    tag={Link}
                                    to={'/orders/' + dishInOrder.order_id + '/' + dishInOrder.id}
                                >
                                    Изменить
                                </Button>
                                <Button
                                    size="sm"
                                    color="danger"
                                    onClick={() => this.props.deleteDishInOrders(dishInOrder.id)}
                                >
                                    Удалить
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                );
            });

        }

        const dishList = this.props.dishes
            .filter(dish => !((this.chosenOrder.dishInOrders as DishInOrder[]) || [])
                .find(dishInOrder => dishInOrder.dish_id === dish.id))
            .map(dish => {
                return (
                    <tr key={dish.id}>
                        <td style={{whiteSpace: 'nowrap'}}>{dish.name}</td>
                        <td style={{whiteSpace: 'nowrap'}}>{dish.cost}</td>
                        <td>
                            <ButtonGroup>
                                <Button
                                    size="sm"
                                    color="primary"
                                    onClick={() => this.createDishInOrder(dish.id)}
                                >
                                    Добавить
                                </Button>
                            </ButtonGroup>
                        </td>
                    </tr>
                );
            });

        const title = <h2>{this.chosenOrder.id ? 'Изменение заказа' : 'Добавление заказа'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="address_id">Выберите адресс выдачи:</Label>
                            <Input
                                type="select"
                                name="address_id"
                                id="address_id"
                                value={this.chosenOrder.address_id || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }>
                                {
                                    this.props.deliveryPoints
                                        .map(deliveryPoint => <option
                                            key={deliveryPoint.id}
                                            value={deliveryPoint.id}>{deliveryPoint.address}</option>
                                        )
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Сохранить</Button>{' '}
                            <Button color="secondary" tag={Link} to="/orders">Назад</Button>
                        </FormGroup>
                    </Form>
                    {isCreated ?
                        <React.Fragment>
                            <h3>Выбранные блюда</h3>
                            <Table className="mt-4">
                                <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Количество</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dishInOrderList}
                                </tbody>
                            </Table>
                        </React.Fragment> : ''}
                    {isCreated ?
                        <React.Fragment>
                            <h3>Блюда</h3>
                            <Table className="mt-4">
                                <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Цена</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dishList}
                                </tbody>
                            </Table>
                        </React.Fragment> : ''}

                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: isLoading(state),
        orders: getOrders(state),
        chosenOrder: getChosenOrder(state),
        deliveryPoints: getDeliveryPoints(state),
        dishes: getDishes(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreateOrder: (orders) => {
        dispatch(ordersThunks.createOrder(orders));
    },
    onEditOrder: (orders) => {
        dispatch(ordersThunks.updateOrder(orders));
    },
    onGetOrder: (id) => {
        dispatch(ordersThunks.getOrder(id));
    },
    getDeliveryPoints: () => {
        dispatch(deliveryPointsThunks.getDeliveryPoints());
    },
    getDishes: () => {
        dispatch(dishesThunks.getDishes());
    },
    createDishInOrder: (orders) => {
        dispatch(ordersThunks.createDishInOrder(orders));
    },
    deleteDishInOrders: (orders) => {
        dispatch(ordersThunks.deleteDishInOrders(orders));
    },
});

export const OrderEdit = connect(mapStateToProps, mapDispatchToProps)(OrderEditComponent);
