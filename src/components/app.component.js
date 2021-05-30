import React from 'react';
import Approuting from './app.routing';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { store } from '../store';
import { Provider } from 'react-redux';
const App = (props) => {
    return (
        <div>
            <ToastContainer />
            <Provider store={store}>
                <Approuting />
            </Provider>
        </div>
    )
}

export default App;