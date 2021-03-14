import React from "react";
import data from "./data.json";
import Filter from "./components/Filter";
import Products from "./components/Products";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  sortProducts = (event) => {
    console.log(event.target.value);
    const sort = event.target.value;
    this.setState({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lower-higher"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "higher-lower"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    });
  };

  filterProducts = (event) => {
    console.log("1. " + event.target.value);
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products,
      });
    } else {
      console.log("2. " + event.target.value);
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) =>
            //Get only the ones that contain the size within the array
            product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
