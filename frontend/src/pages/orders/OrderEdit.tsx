import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenOrder, getOrders, isLoading, Thunks as orderssThunks} from '@store/orders';

interface Props {
    match: any;
    orderss: any;
    isLoading: boolean;
    onGetOrders: any;
    onEditOrders: any;
    onCreateOrders: any;
    chosenOrders: any;
}

interface State {
    orders: any;
}

class OrderEditComponent extends React.Component<Props, State> {

    orders;

    state = {
        orders: {
            id: 0,
            fullName: undefined,
            experience: undefined,
            workingNumber: undefined,
            cellPhone: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new') {
            this.props.onGetOrders(this.props.match.params.id);
            console.log('got orders', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.orders;
        item[name] = value;
        this.setState({orders: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.orders;
        if (item.id && item.id !== 0) {
            this.props.onEditOrders(item);
        } else {
            this.props.onCreateOrders(item);
        }
    }

    render() {
        if (this.props.orderss.isLoading) {
            return (<p>Loading</p>);
        }
        this.orders = this.state.orders.id || this.props.chosenOrders ?
            this.props.chosenOrders : this.state.orders;
        const title = <h2>{this.orders.id ? 'Edit Orders' : 'Add Orders'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="fullName">Full Name</Label>
                            <Input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={this.orders.fullName || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="name"
                            />
                            <Label for="career">Career</Label>
                            <Input
                                type="text"
                                name="career"
                                id="career"
                                value={this.orders.career || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="career"
                            />
                            <Label for="workingNumber">Working number</Label>
                            <Input
                                type="text"
                                name="workingNumber"
                                id="workingNumber"
                                value={this.orders.workingNumber || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="workingNumber"
                            />
                            <Label for="experience">Experience</Label>
                            <Input
                                type="number"
                                name="experience"
                                id="experience"
                                value={this.orders.experience || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="experience"
                            />
                            <Label for="cellPhone">Cell Phone</Label>
                            <Input
                                type="number"
                                name="cellPhone"
                                id="cellPhone"
                                value={this.orders.cellPhone || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="cellPhone"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/orderss">Cancel</Button>
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
        orders: getOrders(state),
        chosenOrders: getChosenOrder(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreateOrders: (orders) => {
        dispatch(orderssThunks.createOrder(orders));
    },
    onEditOrders: (orders) => {
        dispatch(orderssThunks.updateOrder(orders));
    },
    onGetOrders: (id) => {
        dispatch(orderssThunks.getOrder(id));
    },
});

export const OrderEdit = connect(mapStateToProps, mapDispatchToProps)(OrderEditComponent);
