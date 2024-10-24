import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { HiOutlineLogout } from "react-icons/hi";

const Cartorders = () => {
  const [customizes, setCustomizes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchCustomizes = async () => {
      try {
        const response = await axios.get(
          "https://allureserver.onrender.com/api/getorders"
        );
        const allProducts = response.data.orders;
        console.log(allProducts);
        setCustomizes(allProducts);
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", err);
      }
    };

    fetchCustomizes();
  }, []); // No dependencies, fetch only once

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    toast({
      title: "Admin logged out successfully",
      position: "top-right",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/adminrequestotp"); // Redirect to OTP verification page
  };

  const handleuploadproduct = () => {
    navigate("/uploadproduct");
  };

  const handlecartorders = () => {
    navigate("/cartorders");
  };
  const handlecustomize = () => {
    navigate("/adminpage");
  };
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-end">
        <button
          onClick={handleLogout}
          className="p-2 bg-red-400 flex text-white items-center gap-1 text-2xl rounded-md mt-2 mr-2"
        >
          <HiOutlineLogout /> Logout
        </button>
      </div>

      <div className="h-[50px] flex w-[80%] sm:w-[60%] rounded-md border-[1px] mb-7 mt-4">
        <button
          onClick={handlecustomize}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffffff] text-[#000000]"
        >
          Customization Orders
        </button>
        <button
          onClick={handleuploadproduct}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffffff] text-[#000000]"
        >
          Upload product
        </button>
        <button
          onClick={handlecartorders}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffa2c4] text-white"
        >
          Cart Product Orders
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex flex-col gap-4 w-full overflow-auto">
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                House address
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                City
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                State
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Country
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Products
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Total Amount
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Order Date
              </th>
            </tr>
          </thead>
          <tbody>
            {customizes.map((customItem, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.customerName}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.customerEmail}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.house_address}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.city}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.state}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.country}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.products.map((product, idx) => (
                    <div key={idx} style={{ marginBottom: "8px" }}>
                      <p>Product ID: {product.productId}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Size: {product.size}</p>
                      <img
                        src={product.imageUrl[0]} // Accessing the first image URL
                        alt={`Product ${product.productId}`}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
                  ))}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.totalAmount}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {new Date(customItem.orderDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cartorders;
