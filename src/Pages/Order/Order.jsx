import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";
import ReviewItems from "../ReviewItems/ReviewItems";
import { removeFromDb } from "../../utilities/utilities";

const Order = () => {
  const savedCart = useLoaderData();
  const [cart, setCart] = useState(savedCart);

  const handleRemoveToCart = id => {
    const remaining = cart.filter(product => product !== id);
    setCart(remaining);
    removeFromDb(id);
  };

  return (
    <div className="flex lg:mx-48 justify-center">
      <div>
        {cart.map(product => (
          <ReviewItems
            key={product.id}
            product={product}
            handleRemoveToCart={handleRemoveToCart}
          />
        ))}
      </div>
      <div>
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Order;
