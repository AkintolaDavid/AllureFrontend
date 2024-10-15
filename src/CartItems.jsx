import React, { useContext } from "react";
// import remove_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "./Context/ShopContext";
export default function CartItems() {
  const {
    getTotalCartAmount,
    all_product,
    addtoCart,
    removefromCart,
    cartItem,
  } = useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitem_format_main">
        <p>Product</p>
        <p className="cartitem_format_main_title">Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItem[e.id] > 0) {
          return (
            <div>
              <div className="cartitem_format cartitem_format_main">
                <img src={e.image} className="cartitem_image" alt="" />
                <p className="cartitem_name">{e.name}</p>
                <p className="cartitem_price">${e.new_price}</p>
                <button className="cartitem_quantity">{cartItem[e.id]}</button>
                <p>${e.new_price * cartItem[e.id]}</p>
                <span>DAVIDREMOVEBTN</span>
                {/* <img
                  src={remove_icon}
                  onClick={() => {
                    removefromCart(e.id);
                  }}
                  className="removeicon"
                  alt=""
                /> */}
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitemsdown">
        <div className="cartitemtotal">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitem-total-items">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitem-total-items">
              <p>Shipping Fee</p>
              <p>free</p>
            </div>
            <hr />
            <div className="cartitem-total-items">
              <h3>Total</h3>
              <p>${getTotalCartAmount()}</p>
            </div>
          </div>
          <button>Proceed To Checkout</button>
        </div>
        <div className="cartitems-promo">
          <p>If you have a promo enter it here</p>
          <div className="cartitem_promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
