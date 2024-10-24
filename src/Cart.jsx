import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { FaTimes } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";
import PayWithPaystack from "./Paywithpaystack";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { CartContext } from "./Context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@chakra-ui/react"; // Import Chakra UI components

export default function Cart() {
  const navigate = useNavigate();
  const toast = useToast();
  const { cart, removeFromCart, updateCartItemQuantity, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    house_address: "",
    city: "",
    state: "",
    country: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hooks

  // Fetch product data including imageUrl from backend
  useEffect(() => {
    axios
      .get("https://allureserver.onrender.com/api/products")
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setProducts(res.data.products);
          console.log("Fetched products:", res.data.products); // Log the fetched products here
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

  const handlePaystackSuccess = () => {
    onOpen();
    clearCart();
  };

  // Send cart data along with the product image URL in the order
  const handleSubmitOrder = (e) => {
    e.preventDefault();

    // Map cart products to include imageUrl for each item
    const orderProducts = cart.map((cartItem) => {
      const product = products.find((p) => p._id === cartItem.productId);
      return {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        size: cartItem.size,
        imageUrl: product.images, // Select the first image
      };
    });

    const orderData = {
      ...formData,
      products: orderProducts,
      totalAmount: calculateTotal(),
      orderDate: new Date(),
    };

    // Send order data to backend
    axios
      .post("https://allureserver.onrender.com/api/orders", orderData)
      .then((res) => {
        toast({
          title: "Order placed successfully",
          position: "top-right",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        clearCart(); // Clear the cart after order is placed
        onClose(); // Close the modal after submitting
        navigate("/");
      })
      .catch((err) => {
        console.error("Failed to place order:", err);
      });
  };

  return (
    <div className="cartitems">
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
                    src={product.images} // Cloudinary URL for the image
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

          {/* Paystack Payment */}
          <PayWithPaystack
            totalAmount={calculateTotal()}
            onSuccess={handlePaystackSuccess}
          />
        </div>
      </div>

      {/* Modal for Shipping Details Form */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter Shipping Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmitOrder}>
              <Input
                placeholder="Full Name"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                required
                mb={3} // Margin bottom
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
                required
                mb={3}
              />
              <Input
                type="text"
                placeholder="House Address"
                value={formData.house_address}
                onChange={(e) =>
                  setFormData({ ...formData, house_address: e.target.value })
                }
                required
                mb={3}
              />
              <Input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                required
                mb={3}
              />
              <Input
                type="text"
                placeholder="State"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                required
                mb={3}
              />
              <Input
                type="text"
                placeholder="Country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                required
                mb={3}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitOrder}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
