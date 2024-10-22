import React, { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

// Assets for check and uncheck icons
import checkIcon from "./assets/cards/check.png";
import uncheckIcon from "./assets/cards/uncheck.png";
import paystackLogo from "./assets/paystack.png";
import flutterwaveLogo from "./assets/flutterwave.png";

import Header from "./Header";

export default function PaymentComponent() {
  const location = useLocation();
  const { amount } = location.state; // Amount passed through location.state
  const [selectedMethod, setSelectedMethod] = useState(null); // Track selected method
  const [loading, setLoading] = useState(false); // Loading state for button
  const toast = useToast();
  const token = localStorage.getItem("token"); // Ensure a valid token is set in localStorage

  // Paystack Payment Initialization
  const initiatePaystackPayment = async () => {
    setLoading(true);

    const paymentPayload = {
      amount: amount, // Convert amount to kobo (if using Paystack)
    };

    try {
      const response = await axios.post(
        ${process.env.REACT_APP_BASE_URL}/payment/paystack/initialize,
        paymentPayload,
        {
          headers: {
            Authorization: Bearer ${token},
          },
        }
      );

      if (response.data.status) {
        toast({
          title: "Payment initiated",
          description: "Redirecting to Paystack payment page.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        window.location.href = response.data.data[0].url; // Redirect to Paystack payment page
      } else {
        toast({
          title: "Payment failed",
          description: response.data.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(
        "Error initiating Paystack payment:",
        error.response?.data || error.message
      );
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Flutterwave Payment Initialization
  const initiateFlutterwavePayment = async () => {
    setLoading(true);

    const paymentPayload = {
      amount: amount, // Convert amount to kobo (if using Flutterwave)
    };

    try {
      const response = await axios.post(
        ${process.env.REACT_APP_BASE_URL}/payment/flw/initialize,
        paymentPayload,
        {
          headers: {
            Authorization: Bearer ${token},
          },
        }
      );

      if (response.data.status) {
        toast({
          title: "Payment initiated",
          description: "Redirecting to Flutterwave payment page.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        window.location.href = response.data.data.url; // Redirect to Flutterwave payment page
      } else {
        toast({
          title: "Payment failed",
          description: response.data.message || "An error occurred.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error(
        "Error initiating Flutterwave payment:",
        error.response?.data || error.message
      );
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] w-[100%] h-[100%]">
      <Header />
      <div className="w-[95%] flex items-center mb-[2.5%] mt-[2.5%] ml-[2.5%] text-[20px] font-semibold pt-1">
        <Link to="/wallet" className="flex items-center gap-2.5">
          <FaArrowLeftLong className="text-xl" /> Back
        </Link>
      </div>
      <div className="flex justify-between ml-[2.5%] mr-[4%]">
        <div className="w-[70%] bg-[#ffffff] h-[auto]">
          {/* Paystack Method Selection */}
          <div
            onClick={() => setSelectedMethod("paystack")}
            className="payment-method-option"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #E0E0E0",
              paddingLeft: "15px",
              height: "100px",
            }}
          >
            <img
              src={selectedMethod === "paystack" ? checkIcon : uncheckIcon}
              alt="check"
              className="h-[18px] w-[18px] mr-3"
            />
            <img
              src={paystackLogo}
              alt="Paystack logo"
              className="h-[46px] w-[46px] rounded-full mr-4"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[18px] text-[#243656] font-semibold">
                Fund wallet with Paystack
              </span>
              <span className="text-[14px] text-[#243656] font-normal">
                Pay with Card, Bank Transfer
              </span>
            </div>
          </div>

          {/* Flutterwave Method */}
          <div
            onClick={() => setSelectedMethod("flutterwave")}
            className="payment-method-option"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #E0E0E0",
              paddingLeft: "15px",
              height: "100px",
            }}
          >
            <img
              src={selectedMethod === "flutterwave" ? checkIcon : uncheckIcon}
              alt="check"
              className="h-[18px] w-[18px] mr-3"
            />
            <img
              src={flutterwaveLogo}
              alt="Flutterwave logo"
              className="h-[46px] w-[46px] rounded-full mr-4"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[18px] text-[#243656] font-semibold">
                Fund wallet with Flutterwave
              </span>
              <span className="text-[14px] text-[#243656] font-normal">
                Pay with Card, Bank Transfer, and USSD
              </span>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="w-[25%]">
          <div className="flex flex-col items-center justify-center bg-white w-[370px] h-[200px] text-[20px] font-medium gap-4 rounded-[8px]">
            <div className="flex justify-between w-[70%]">
              <span className="text-[#5D5F5F]">Subtotal</span>
              <span>₦{amount}</span>
            </div>
            <div className="flex justify-between w-[70%]">
              <span className="text-[#5D5F5F]">Total</span>
              <span>₦{amount}</span>
            </div>
            <button
              onClick={() => {
                if (!selectedMethod) {
                  toast({
                    title: "Payment method required",
                    description:
                      "Please select a payment method before proceeding.",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                  });
                  return;
                }
                // Trigger appropriate payment function based on the selected method
                if (selectedMethod === "paystack") {
                  initiatePaystackPayment();
                } else if (selectedMethod === "flutterwave") {
                  initiateFlutterwavePayment();
                }
              }}
              disabled={loading || !selectedMethod}
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#4263EB",
                color: "white",
                border: "none",
                borderRadius: "8px",
              }}
              className="h-[43px] w-[300px] bg-[#4263EB] text-[16px] text-white rounded-[8px] mt-10"
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}