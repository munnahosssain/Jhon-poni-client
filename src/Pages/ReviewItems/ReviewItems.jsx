import React from "react";
import { MdDelete } from "react-icons/md";

const ReviewItems = ({ product, handleRemoveToCart }) => {
  const { _id, img, category, price, quantity } = product;
  return (
    <div className="flex justify-around items-center bg-red-600 rounded-md m-5 p-5">
      <div>
        <img className="h-24 rounded-xl" src={img} alt="" />
      </div>
      <div className=" text-white mx-12">
        <h1>{category}</h1>
        <h1 className="my-2">Price: ${price}</h1>
        <h1>Shipping charge $:{quantity}</h1>
      </div>
      <div className="bg-red-500 p-2 rounded-full cursor-pointer">
        <MdDelete onClick={() => handleRemoveToCart(_id)} size={32} />
      </div>
    </div>
  );
};

export default ReviewItems;
