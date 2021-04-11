import React from "react";
//import data from "./data.json";
import Filter from "./components/Filter";
import Products from "./components/Products";
import Cart from "./components/Cart";
import store from './store';
//Redux
import { Provider } from 'react-redux';

class App extends React.Component {
  render() {
    return (
      //Redux
      <Provider store={store}>
        <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products />
            </div>
            <div className="sidebar">
              <Cart />
            </div>
          </div>
        </main>
        <footer>All rights reserved</footer>
      </div>
      </Provider>
      
    );
  }
}

export default App;
