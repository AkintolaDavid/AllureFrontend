import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { HiOutlineLogout } from "react-icons/hi";
const AdminPage = () => {
  const [customizes, setCustomizes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchCustomizes = async () => {
      const token = localStorage.getItem("adminToken");

      try {
        console.log(token);
        const response = await axios.get(
          "https://allureserver.onrender.com/api/customizes",
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCustomizes(response.data);
      } catch (err) {
        setError("Failed to fetch customizations");
        console.error("Error fetching customizations:", err);
      }
    };

    fetchCustomizes(); // Fetch customizations when the component mounts
  }, []); // No dependencies, fetch only once
  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove the token from localStorage
    toast({
      title: "Admin logged out successfully",
      // description: "You have signed in successfully!",
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
  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full justify-end">
        {" "}
        <button
          onClick={handleLogout}
          className="p-2 bg-red-400 flex text-white items-center gap-1 text-2xl rounded-md mt-2 mr-2"
        >
          <HiOutlineLogout /> Logout
        </button>
      </div>

      <div className="h-[50px] flex w-[80%] sm:w-[60%] rounded-md border-[1px] mb-7  mt-4">
        <button
          // onClick={handleToggleprofile}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffa2c4] text-white"
        >
          Customization Orders
        </button>
        <button
          onClick={handleuploadproduct}
          className="flex items-center justify-center px-4 rounded-[4px] py-2 border-[#EEEEEE] w-[50%] bg-[#ffffff] text-[#000000]"
        >
          Upload product
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex flex-col gap-4 w-full overflow-auto">
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                UserId
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                BUDGET
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Engraving
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Jewelry Type
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Material Type
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Engraving Text
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Engraving Part
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                More Info
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Font Style
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Fullname
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Email
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Phone Number
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Images
              </th>
            </tr>
          </thead>
          <tbody>
            {customizes.map((customItem, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.userId}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.BUDGET}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.engraving}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.jewelryType}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.materialType}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.engravingText}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.engravingPart}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.moreInfo}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.fontStyle}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.fullname}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.email}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.phonenumber}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {customItem.images}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminPage;
