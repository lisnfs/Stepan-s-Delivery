import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenDish, getDishes, isLoading, Thunks as doctorsThunks} from '@store/dishes';
import {Dish} from '../../models/Dish';

interface Props {
    match: any;
    dishes: any;
    isLoading: boolean;
    onGetDish: any;
    onEditDish: any;
    onCreateDish: any;
    chosenDish: any;
}

interface State {
    dish: Dish;
}

class DishEditComponent extends React.Component<Props, State> {

    dish;

    state = {
        dish: {
            id: 0,
            ingredients: undefined,
            cost: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new') {
            this.props.onGetDish(this.props.match.params.id);
            console.log('got Dish', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.dish;
        item[name] = value;
        this.setState({dish: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.dish;
        if (item.id && item.id !== 0) {
            this.props.onEditDish(item);
        } else {
            this.props.onCreateDish(item);
        }
    }

    render() {
        if (this.props.dishes.isLoading) {
            return (<p>Loading</p>);
        }
        this.dish = this.state.dish.id || this.props.chosenDish ?
            this.props.chosenDish : this.state.dish;
        const title = <h2>{this.dish.id ? 'Изменить блюдо' : 'Добавить блюдо'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="name">Название</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={this.dish.name || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                            />
                            <Label for="ingredients">Описание</Label>
                            <Input
                                type="ingredients"
                                name="ingredients"
                                id="ingredients"
                                value={this.dish.ingredients || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                            />

                            <Label for="cost">Стоимость</Label>
                            <Input
                                type="number"
                                name="cost"
                                id="cost"
                                value={this.dish.cost || 0}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">{this.dish.id ? 'Сохранить' : 'Добавить'}</Button>{' '}
                            <Button color="secondary" tag={Link} to="/dishes">Назад</Button>
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
        dishes: getDishes(state),
        chosenDish: getChosenDish(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreateDish: (dish) => {
        dispatch(doctorsThunks.createDish(dish));
    },
    onEditDish: (dish) => {
        dispatch(doctorsThunks.updateDish(dish));
    },
    onGetDish: (id) => {
        dispatch(doctorsThunks.getDish(id));
    },
});

export const DishEdit = connect(mapStateToProps, mapDispatchToProps)(DishEditComponent);
