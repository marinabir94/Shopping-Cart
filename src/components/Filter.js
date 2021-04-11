import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";
//{this.props.filteredProducts.length} 
class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>LOADING...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
        {this.props.filteredProducts.length} Products
        </div>
        <div className="filter-sort">
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(event) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                event.target.value
              )
            }
          >
            <option value="newer">Newer to older</option>
            <option value="lower-higher">Lower to higher price</option>
            <option value="higher-lower">Higher to lower price</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select
            value={this.props.size}
            onChange={(event) =>
              this.props.filterProducts(
                this.props.products, 
                event.target.value
              )
            }
          >
            <option value="">ALL</option>
            <option value="XS">XS</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>
    );
  }
}

//Redux
export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
