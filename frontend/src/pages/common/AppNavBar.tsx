import React from 'react';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import {Link} from 'react-router-dom';

interface Props {
}

interface State {
    open: boolean;
}

class AppNavBarComponent extends React.Component<Props, State> {
    state = {
        open: false,
    };

    toggle = () => {
        this.setState({
            open: !this.state.open
        });
        console.log('state', this.state);
    };

    render() {
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand tag={Link} to="/">
                    К разделам
                </NavbarBrand>
                <Collapse isOpen={this.state.open} navbar>
                    <Nav
                        className="ml-auto"
                        navbar
                    >
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export const AppNavBar = AppNavBarComponent;
