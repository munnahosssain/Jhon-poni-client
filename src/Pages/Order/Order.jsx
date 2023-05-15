import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItems from "../ReviewItems/ReviewItems";
import { deleteShoppingCart, removeFromDb } from "../../utilities/utilities";

const Order = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleRemoveToCart = id => {
    const remaining = cart.filter(product => product._id !== id);
    console.log(remaining);
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="flex lg:mx-48 justify-center">
      <div>
        {cart.map(product => (
          <ReviewItems
            key={product._id}
            product={product}
            handleRemoveToCart={handleRemoveToCart}
          />
        ))}
      </div>
      <div>
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link className="proceed-link" to="/checkout">
            <button className="btn-proceed">Proceed Checkout</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Order;
