import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getOrders, isLoading, Thunks as ordersThunks} from '@store/orders';
import {connect} from 'react-redux';

interface Props {
    getOrders: any;
    orders: any;
    isLoading: boolean;
    deleteOrder: any
}

interface State {

}

class OrderListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getOrders();
    }

    render() {
        const orderList = this.props.orders.map(order => {
            return (
                <tr key={order.id}>
                    {/*<td style={{whiteSpace: 'nowrap'}}>{order.fullName}</td>*/}
                    {/*<td style={{whiteSpace: 'nowrap'}}>{order.career}</td>*/}
                    {/*<td style={{whiteSpace: 'nowrap'}}>{order.experience}</td>*/}
                    {/*<td style={{whiteSpace: 'nowrap'}}>{order.workingNumber}</td>*/}
                    {/*<td style={{whiteSpace: 'nowrap'}}>{order.cellPhone}</td>*/}
                    <td>
                        <ButtonGroup>
                            {/*<Button*/}
                            {/*    size="sm"*/}
                            {/*    color="primary"*/}
                            {/*    tag={Link}*/}
                            {/*    to={'/orders/' + order.id}*/}
                            {/*>*/}
                            {/*    Edit*/}
                            {/*</Button>*/}
                            {/*<Button size="sm"*/}
                            {/*        color="danger"*/}
                            {/*        onClick={() => this.props.deleteOrder(order.id)}*/}
                            {/*>*/}
                            {/*    Delete*/}
                            {/*</Button>*/}
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavBar/>
                <Container fluid>
                    {/*<div className="float-right">*/}
                    {/*    <Button*/}
                    {/*        color="success"*/}
                    {/*        tag={Link}*/}
                    {/*        to="/orders/new "*/}
                    {/*    >*/}
                    {/*        Add Doctor*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                    <h3>Заказы</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Время создания</th>
                            <th>Клиент</th>
                            <th>Курьер</th>
                            <th>Стоимость</th>
                            <th>Статус</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orderList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoading: isLoading(state),
        orders: getOrders(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getOrders: () => {
        dispatch(ordersThunks.getOrders());
    },
    deleteOrder: (id: number) => {
        dispatch(ordersThunks.deleteOrder(id))
    }
});

export const OrdersList = connect(mapStateToProps, mapDispatchToProps)(OrderListComponent);
