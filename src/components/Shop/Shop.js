import React, { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { addToDb } from "../../utilities/fakedb";
import "./Shop.css";
import useCart from "../../hooks/useCart";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [page, setPage] = useState(1);
  // products to be rendered on the UI
  const [displayProducts, setDisplayProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);

  const size = 10;

  useEffect(() => {
    setLoading(true);
    const url = `https://desolate-citadel-48279.herokuapp.com//products?page=${page}&&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setDisplayProducts(data.products);

        const pagNum = Math.ceil(data.count / size);
        setPageNumber(pagNum);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
      });
  }, [page]);

  const handleAddToCart = (product) => {
    const exists = cart.find((pd) => pd.key === product.key);
    let newCart = [];
    if (exists) {
      const rest = cart.filter((pd) => pd.key !== product.key);
      exists.quantity = exists.quantity + 1;
      newCart = [...rest, product];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    // save to local storage (for now)
    addToDb(product.key);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;

    const matchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

    setDisplayProducts(matchedProducts);
  };

  return (
    <>
      <div className="search-container" id="shop-top">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search Product"
        />
      </div>
      <div className="shop-container">
        {loading ? (
          <h1 className="text-center mt-5">
            <div
              class="spinner-border text-primary"
              style={{ width: "110px", height: "110px" }}
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>{" "}
          </h1>
        ) : (
          <div className="product-container">
            {displayProducts.map((product) => (
              <Product
                key={product.key}
                product={product}
                handleAddToCart={handleAddToCart}
              ></Product>
            ))}

            <div className="my-3">
              {[...Array(pageNumber).keys()].map((num) => {
                return (
                  <button
                    className="btn btn-outline-success mx-4"
                    key={num}
                    onClick={() => setPage(num)}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="cart-container">
          <Cart cart={cart}>
            <Link to="/review">
              <button className="btn-regular">Review Your Order</button>
            </Link>
          </Cart>
        </div>
      </div>
    </>
  );
};

export default Shop;
