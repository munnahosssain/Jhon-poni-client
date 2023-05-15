import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/utilities";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const { totalProducts } = useLoaderData();

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  // const pageNumber = [];
  // for (let i = 0; i < totalPages.length; i++) {
  //   const pageNumber = push(i);
  // }

  const pageNumber = [...Array(totalPages).keys()];
  const options = [9, 12, 15];

  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  }

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then(res => res.json())
  //     .then(data => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
      // .then(res => res.json())
      // .then(data => setProducts(data));
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  // console.log(totalProducts);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);

    fetch("http://localhost:5000/productsById", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then(res => res.json())
      .then(cartProducts => {
        // setProducts(data)
        const savedCart = [];
        // step 1:get id of the addedProduct.
        for (const id in storedCart) {
          // step 2: get product from products state by using id.
          const addedProducts = cartProducts.find(
            product => product._id === id
          );
          if (addedProducts) {
            const quantity = storedCart[id];
            // step 3: add quantity.
            addedProducts.quantity = quantity;
            // step 4: add the added product to the saved cart.
            savedCart.push(addedProducts);
          }
        }
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = product => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <>
      <div className="flex lg:mx-48 mt-12">
        <div className="grid lg:grid-cols-3 md:grid-cols-2">
          {products.map(product => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
        <div
          style={{ position: "static", top: "20px" }}
          className="mt-14 lg:flex-1 h-8"
        >
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="proceed-link" to="/orders">
              <button className="btn-proceed">Review Order</button>
            </Link>
          </Cart>
        </div>
      </div>
      {/* Pagination */}
      <div className="text-center my-5">
        <p>{currentPage + 1}</p>
        {pageNumber.map(number => (
          <button
            className={`mx-2 btn btn-sm currentPage === number ? "bg-white" : ""`}
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
