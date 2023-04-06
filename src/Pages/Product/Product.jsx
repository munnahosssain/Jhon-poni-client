import React from "react";

const Product = props => {
  const handleAddToCart = props.handleAddToCart;
  const { img, name, price, ratings } = props.product;

  return (
    <div className="card w-96 glass m-5">
      <figure>
        <img src={img} alt="car!" />
      </figure>
      <div className="card-body text-start">
        <p>Price: {price}</p>
        <p>Ratings: {ratings} stars</p>
        <h4 className="card-title text-xl">{name}</h4>
        <button
          className="btn btn-wide"
          onClick={() => handleAddToCart(props.product)}
        >
          Add to cart
          {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" shake /> */}
        </button>
      </div>
    </div>
  );
};

export default Product;
