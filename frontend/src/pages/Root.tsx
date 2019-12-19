import React from 'react';
import {Provider} from 'react-redux';
import {App} from './app/App';
import {store} from '@store';

interface Props {
}

export const RootComponent: React.FunctionComponent<Props> = props => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};

export const Root = RootComponent;
