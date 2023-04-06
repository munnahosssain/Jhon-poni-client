import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart }) => {
  const navigate = useNavigate();
  let total = 0;
  let quantity = 0;
  let totalShipping = 0;
  // console.log(cart);
  for (const product of cart) {
    product.quantity = product.quantity || 1;
    total = total + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
    // show total quantity.
    quantity = quantity + product.quantity;
  }

  const tax = (total + totalShipping / 100) * 0.15;
  const grandTotal = total + totalShipping + tax;

  const checkout = () => {
    navigate("/orders");
  };

  return (
    <div className="bg-red-600 text-white p-4 rounded-xl">
      <h2 className="font-bold text-2xl mb-2">Checkout Summary</h2>
      <h1 className="my-2">Selected Items {quantity}</h1>
      <p>Total Price: ${total}</p>
      <p className="my-2">Total Shipping {totalShipping.toFixed(2)}</p>
      <p>TAX: {tax.toFixed(2)}</p>
      <h6 className="font-bold text-sm mt-2">
        Payable Total {grandTotal.toFixed(2)}
      </h6>
      <button onClick={checkout}>checkout</button>
    </div>
  );
};

export default Cart;
