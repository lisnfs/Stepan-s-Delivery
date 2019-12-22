import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getDeliveryPoints, isLoading, Thunks as deliveryPointsThunks} from '@store/deliveryPoints';
import {connect} from 'react-redux';

interface Props {
    getDeliveryPoints: any;
    deliveryPoints: any;
    isLoading: boolean;
    deleteDeliveryPoint: any
}

interface State {

}

class DeliveryPointListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getDeliveryPoints();
    }

    render() {
        const deliveryPointList = this.props.deliveryPoints.map(deliveryPoint => {
            return (
                <tr key={deliveryPoint.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{deliveryPoint.address}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{deliveryPoint.phone}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/deliveryPoints/' + deliveryPoint.id}
                            >
                                Изменить
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deleteDeliveryPoint(deliveryPoint.id)}
                            >
                                Удалить
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavBar/>
                <Container fluid>
                    <div className="float-right">
                        <Button
                            color="success"
                            tag={Link}
                            to="/deliveryPoints/new "
                        >
                            Добавить пункт выдачи
                        </Button>
                    </div>
                    <h3>Пункты выдачи</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Адрес</th>
                            <th>Рабочий номер</th>
                        </tr>
                        </thead>
                        <tbody>
                        {deliveryPointList}
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
        deliveryPoints: getDeliveryPoints(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getDeliveryPoints: () => {
        dispatch(deliveryPointsThunks.getDeliveryPoints());
    },
    deleteDeliveryPoint: (id: number) => {
        dispatch(deliveryPointsThunks.deleteDeliveryPoint(id))
    }
});

export const DeliveryPointsList = connect(mapStateToProps, mapDispatchToProps)(DeliveryPointListComponent);
