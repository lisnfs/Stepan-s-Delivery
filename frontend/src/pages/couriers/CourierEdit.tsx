import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {
    getChosenDeliveryPoint,
    getDeliveryPoints,
    isLoading,
    Thunks as deliveryPointsThunks
} from '@store/deliveryPoints';
import {getChosenCourier, Thunks as couriersThunks} from '@store/couriers';

interface Props {
    match: any;
    isLoading: boolean;
    chosenCourier: any;
    onEditCourier: any;
    onGetCourier: any;
}

interface State {
    courier: any;
}

class CourierEditComponent extends React.Component<Props, State> {

    courier;

    state = {
        courier: {},
    };

    componentDidMount() {
        this.props.onGetCourier(this.props.match.params.id);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.courier;
        item[name] = value;
        this.setState({courier: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.courier;
        this.props.onEditCourier(item);
    }

    render() {
        if (this.props.isLoading) {
            return (<p>Loading</p>);
        }
        this.courier = this.props.chosenCourier ?
            this.props.chosenCourier : this.state.courier;
        const title = <h2>Редактирование пользователя</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="name">Имя</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={this.courier.name || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="name"
                            />
                            <Label for="username">Логин</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                value={this.courier.username || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="username"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Сохранить</Button>{' '}
                            <Button color="secondary" tag={Link} to="/couriers">Назад</Button>
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
        chosenCourier: getChosenCourier(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onEditCourier: (courier) => {
        dispatch(couriersThunks.updateCourier(courier));
    },
    onGetCourier: (id) => {
        dispatch(couriersThunks.getCourier(id));
    },
});

export const CourierEdit = connect(mapStateToProps, mapDispatchToProps)(CourierEditComponent);
