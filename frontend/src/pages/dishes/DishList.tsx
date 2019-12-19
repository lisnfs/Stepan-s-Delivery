import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getDishes, isLoading, Thunks as dishesThunks} from '@store/dishes';
import {connect} from 'react-redux';

interface Props {
    getDishes: any;
    dishes: any;
    isLoading: boolean;
    deleteOrder: any
}

interface State {

}

class DishListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getDishes();
    }

    render() {
        const dishList = this.props.dishes.map(dish => {
            return (
                <tr key={dish.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{dish.name}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{dish.cost}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/dishes/' + dish.id}
                            >
                                Изменить
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deleteOrder(dish.id)}
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
                            to="/dishes/new "
                        >
                            Добавить блюдо
                        </Button>
                    </div>
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
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoading: isLoading(state),
        dishes: getDishes(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getDishes: () => {
        dispatch(dishesThunks.getDishes());
    },
    deleteDish: (id: number) => {
        dispatch(dishesThunks.deleteDish(id))
    }
});

export const DishesList = connect(mapStateToProps, mapDispatchToProps)(DishListComponent);
