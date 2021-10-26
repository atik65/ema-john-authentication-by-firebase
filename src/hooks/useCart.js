import { useState, useEffect } from "react";
import { getStoredCart } from "../utilities/fakedb";

const useCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = getStoredCart();
    const keys = Object.keys(savedCart);

    fetch("https://desolate-citadel-48279.herokuapp.com//products", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(keys),
    })
      .then((data) => data.json())
      .then((products) => {
        console.log(products);

        if (products.length) {
          const storedCart = [];
          for (const key in savedCart) {
            const addedProduct = products.find(
              (product) => product.key === key
            );
            if (addedProduct) {
              // set quantity
              const quantity = savedCart[key];
              addedProduct.quantity = quantity;
              storedCart.push(addedProduct);
            }
          }
          setCart(storedCart);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return [cart, setCart];
};

export default useCart;
