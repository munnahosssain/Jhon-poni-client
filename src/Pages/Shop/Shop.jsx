import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/utilities";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("products.json")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // console.log(products);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];
    // step 1:get id of the addedProduct.
    for (const id in storedCart) {
      // step 2: get product from products state by using id.
      const addedProducts = products.find(product => product.id === id);
      if (addedProducts) {
        const quantity = storedCart[id];
        // step 3: add quantity.
        addedProducts.quantity = quantity;
        // step 4: add the added product to the saved cart.
        savedCart.push(addedProducts);
      }
    }
    setCart(savedCart);
  }, [products]);

  const handleAddToCart = product => {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  };

  return (
    <div className="flex lg:mx-48 mt-12">
      <div className="grid lg:grid-cols-3 md:grid-cols-2">
        {products.map(product => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div
        style={{ position: "static", top: "20px" }}
        className="mt-14 lg:flex-1 h-8"
      >
        <Cart cart={cart} />
      </div>
    </div>
  );
};

export default Shop;
