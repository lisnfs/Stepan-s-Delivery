import React from 'react';
import {DispatchThunk, RootState} from '@store';
import {Thunks as authenticationThunks} from '@store/authentication';
import {connect} from 'react-redux';
import {AppNavBar} from '../common/AppNavBar';
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';
import * as alertActions from '@store/alerts/alerts.actions';
import {USER_ROLE, USER_ROLE_TYPE} from '../../constants';

interface Props {
    logout: any;
}

interface State {

}

class HomePageComponent extends React.Component<Props, State> {
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
    };

    render() {
        return (
            <div>
                <AppNavBar/>
                <Container fluid>
                    {this.links()}
                </Container>
                <Button id="logout"
                        color="danger"
                    onClick={this.handleLogout}
                >
                    Выйти
                </Button>
            </div>
        );
    }

    links() {
        switch (localStorage.getItem(USER_ROLE)) {
            case USER_ROLE_TYPE.ROLE_ADMIN:
                return (
                    <React.Fragment>
                        <Button color="link">
                            <Link to="/dishes">
                                Блюда
                            </Link>
                        </Button>
                        <Button color="link">
                            <Link to="/orders">
                                Заказы
                            </Link>
                        </Button>
                        <Button color="link">
                            <Link to="/couriers">
                                Пользователи
                            </Link>
                        </Button>
                    </React.Fragment>
                );
            case USER_ROLE_TYPE.ROLE_CLIENT:
                return (
                    <React.Fragment>
                        <Button color="link">
                            <Link to="/dishes">
                                Блюда
                            </Link>
                        </Button>
                        <Button color="link">
                            <Link to="/orders">
                                Заказы
                            </Link>
                        </Button>
                    </React.Fragment>
                );
            case USER_ROLE_TYPE.ROLE_COURIER:
                return (
                    <React.Fragment>
                        <Button color="link">
                            <Link to="/orders">
                                Открытые заказы
                            </Link>
                        </Button>
                        <Button color="link">
                            <Link to="/orders">
                                Выполненные заказы
                            </Link>
                        </Button>
                    </React.Fragment>
                );
            default:
                return (<Button color="link">
                    <Link to="/patients">
                        Шо
                    </Link>
                </Button>);
        }


    }
}

const mapStateToProps = (state: RootState) => {
    return {};
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    logout: () => {
        dispatch(authenticationThunks.logout());
    }
});

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);

