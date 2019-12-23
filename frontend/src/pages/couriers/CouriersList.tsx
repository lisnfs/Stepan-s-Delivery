import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getCouriers, isLoading, Thunks as couriersThunks} from '@store/couriers';
import {connect} from 'react-redux';

interface Props {
    getCouriers: any;
    couriers: any;
    isLoading: boolean;
    deleteCourier: any
}

interface State {

}

class CourierListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getCouriers();
    }

    render() {

        const courierList = this.props.couriers.map(courier => {
            return (
                <tr key={courier.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{courier.name}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{courier.cost}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/couriers/' + courier.id}
                            >
                                Изменить
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deleteCourier(courier.id)}
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
                    </div>
                    <h3>Курьеры</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Ник</th>
                            <th>Почта</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courierList}
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
        couriers: getCouriers(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getCouriers: () => {
        dispatch(couriersThunks.getCouriers());
    },
    deleteCourier: (id: number) => {
        dispatch(couriersThunks.deleteCourier(id))
    }
});

export const CouriersList = connect(mapStateToProps, mapDispatchToProps)(CourierListComponent);
