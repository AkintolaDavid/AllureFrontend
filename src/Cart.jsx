import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { FaTimes } from "react-icons/fa";
import { ShopContext } from "./Context/ShopContext"; // Verify this is correct
import { useToast } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import PayWithPaystack from "./Paywithpaystack";
import axios from "axios"; // To fetch data from MongoDB
import { CartContext } from "./Context/CartContext";

export default function Cart() {
  const toast = useToast();
  const { cart, removeFromCart, updateCartItemQuantity } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://allureserver.onrender.com/api/products")
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
        } else {
          console.error("Expected an array but received:", res.data.products);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  const calculateTotal = () => {
    return cart.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      return product ? total + product.price * cartItem.quantity : total;
    }, 0);
  };

  const calculateTotalQuantity = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  return (
    <div className="cartitems ">
      <div className="w-[100%] flex">
        <p className="w-[30%]">Product</p>
        <p className="w-[20%]">Price</p>
        <p className="w-[20%]">Size</p>
        <p className="w-[20%]">Quantity</p>
        <p className="w-[20%] flex justify-center">Total</p>
        <p className="">Remove</p>
      </div>
      <hr />
      {Array.isArray(cart) &&
        cart.map((cartProduct) => {
          const product = products.find((p) => p._id === cartProduct.productId);
          if (!product) {
            return null;
          }

          return (
            <div key={`${cartProduct.productId}-${cartProduct.size}`}>
              <div className="cartitem_format cartitem_format_main w-[100%] flex">
                <div className="cartitemdiv w-[30%]">
                  <img
                    src={product.images}
                    className="cartitem_image"
                    alt={product.name}
                  />
                  <p className="cartitem_name">{product.name}</p>
                </div>
                <p className="cartitem_price flex items-center w-[22%]">
                  <TbCurrencyNaira />
                  {product.price}
                </p>
                <p className="cartitem_size w-[20%]">{cartProduct.size}</p>
                <p className=" w-[20%]">
                  <div className="cartitem_quantity">
                    <span
                      onClick={() => {
                        if (cartProduct.quantity > 1) {
                          updateCartItemQuantity(
                            cartProduct.productId,
                            cartProduct.size,
                            cartProduct.quantity - 1
                          );
                        }
                      }}
                      className="text-lg sm:text-xl"
                    >
                      -
                    </span>

                    <span className="text-[14px] sm:text-lg sm:mt-1 ">
                      {cartProduct.quantity}
                    </span>

                    <span
                      onClick={() => {
                        updateCartItemQuantity(
                          cartProduct.productId,
                          cartProduct.size,
                          cartProduct.quantity + 1
                        );
                      }}
                      className="text-lg sm:text-xl"
                    >
                      +
                    </span>
                  </div>
                </p>
                <p className="flex items-center w-[20%] justify-center">
                  <TbCurrencyNaira />
                  {product.price * cartProduct.quantity}
                </p>
                <FaTimes
                  onClick={() =>
                    removeFromCart(cartProduct.productId, cartProduct.size)
                  }
                  className="ml-5 cursor-pointer w-[5%]"
                />
              </div>
              <hr />
            </div>
          );
        })}

      <div className="cartitemsdown">
        <div className="cartitemtotal">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-total-items">
              <p>Subtotal</p>
              <p className="flex items-center">
                <TbCurrencyNaira />
                {calculateTotal().toFixed(2)}
              </p>
            </div>
            <hr />
            <div className="cartitem-total-items">
              <p>Total Items</p>
              <p>{calculateTotalQuantity()} items</p>
            </div>
            <hr />
            <div className="cartitem-total-items">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitem-total-items">
              <h3>Total</h3>
              <p className="flex items-center">
                <TbCurrencyNaira />
                {calculateTotal().toFixed(2)}
              </p>
            </div>
          </div>
          {/* Uncomment to include payment method */}
          <PayWithPaystack totalAmount={calculateTotal()} />
        </div>
        {/* <div className="cartitems-promo">
          <p>If you have a promo, enter it here</p>
          <div className="cartitem_promobox">
            <div className="bg-black">
              <input type="text" placeholder="promo code" />
            </div>
            <button>Submit</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}
