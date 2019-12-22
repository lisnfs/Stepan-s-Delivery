import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenDeliveryPoint, getDeliveryPoints, isLoading, Thunks as deliveryPointsThunks} from '@store/deliveryPoints';

interface Props {
    match: any;
    deliveryPoints: any;
    isLoading: boolean;
    onGetDeliveryPoint: any;
    onEditDeliveryPoint: any;
    onCreateDeliveryPoint: any;
    chosenDeliveryPoint: any;
}

interface State {
    deliveryPoint: any;
}

class DeliveryPointEditComponent extends React.Component<Props, State> {

    deliveryPoint;

    state = {
        deliveryPoint: {
            id: 0,
            fullName: undefined,
            experience: undefined,
            workingNumber: undefined,
            cellPhone: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new ') {
            debugger;
            this.props.onGetDeliveryPoint(this.props.match.params.id);
            console.log('got deliveryPoints', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.deliveryPoint;
        item[name] = value;
        this.setState({deliveryPoint: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.deliveryPoint;
        if (item.id && item.id !== 0) {
            this.props.onEditDeliveryPoint(item);
        } else {
            this.props.onCreateDeliveryPoint(item);
        }
    }

    render() {
        if (this.props.deliveryPoints.isLoading) {
            return (<p>Loading</p>);
        }
        this.deliveryPoint = this.state.deliveryPoint.id || this.props.chosenDeliveryPoint ?
            this.props.chosenDeliveryPoint : this.state.deliveryPoint;
        const title = <h2>{this.deliveryPoint.id ? 'Редактирование пункта выдачи' : 'Добавление пункта выдачи'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="fullName">Адрес</Label>
                            <Input
                                type="text"
                                name="address"
                                id="address"
                                value={this.deliveryPoint.address || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="address"
                            />
                            <Label for="phone">Рабочий номер</Label>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                value={this.deliveryPoint.phone || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="phone"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Сохранить</Button>{' '}
                            <Button color="secondary" tag={Link} to="/deliveryPoints">Назад</Button>
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
        deliveryPoints: getDeliveryPoints(state),
        chosenDeliveryPoint: getChosenDeliveryPoint(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreateDeliveryPoint: (deliveryPoints) => {
        dispatch(deliveryPointsThunks.createDeliveryPoint(deliveryPoints));
    },
    onEditDeliveryPoint: (deliveryPoints) => {
        dispatch(deliveryPointsThunks.updateDeliveryPoint(deliveryPoints));
    },
    onGetDeliveryPoint: (id) => {
        dispatch(deliveryPointsThunks.getDeliveryPoint(id));
    },
});

export const DeliveryPointEdit = connect(mapStateToProps, mapDispatchToProps)(DeliveryPointEditComponent);
