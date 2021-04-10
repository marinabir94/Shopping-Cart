import React, { Component } from "react";
import formatCurrency from "../utils";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name:'',
        email:'',
        address: '',
        showCheckout: false
    };
  }

  //Email, Name, Address fields
  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //Clicking on Submit
  createOrder = (event) => {
      event.preventDefault();
      const order = {
          name: this.state.name,
          email: this.state.email,
          address: this.state.address,
          cartItems: this.props.cartItems
      };
      this.props.createOrder(order);
  }

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">The cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} different products in the cart
          </div>
        )}

        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title}></img>
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {formatCurrency(item.price)} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        {" "}
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce(
                        (accumulator, current) =>
                          accumulator + current.price * current.count,
                        0
                      )
                    )}
                  </div>
                  <button
                    className="button primary"
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>E-mail</label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Name</label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                        <label>Address</label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        ></input>
                      </li>
                      <li>
                          <button className='button primary' type='submit'>Checkout</button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
