import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from 'react-redux';
import React from 'react';
import store from './redux/configureStore';
import api from './api/connectDB'

import './App.css';
import { AppRoutes } from './components/Routes';
import * as types from "./redux/actions/actionTypes";
import { Header } from './components/Header';


class App extends React.Component {
  async componentDidMount() {
    await api.getAllItems().then(items => {
      const products = items.data.data;
      store.subscribe(() => this.forceUpdate())
      store.dispatch({ type: types.SET_PRODUCTS, products: products })
    });

  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header/>
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </Provider>

    );
  }
}

export default App;
