import React from "react";
import PaystackPop from "@paystack/inline-js"; // Import the Paystack library
import { useToast } from "@chakra-ui/react"; // For notifications (optional)

const PayWithPaystack = ({ totalAmount }) => {
  const toast = useToast();

  // Function to handle payment initiation
  const initiatePayment = () => {
    const paystack = new PaystackPop();
    const useremail = localStorage.getItem("email");
    if (!useremail) {
      toast({
        title: "User not logged in!",
        description: "Please log in to proceed with the payment.",
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      return; // Stop further execution if user is not logged in
    }
    const verifyPayment = async (reference) => {
      try {
        const response = await fetch(
          "https://allureserver.onrender.com/api/verify-payment",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reference }),
          }
        );

        const result = await response.json();

        if (result.status === "success") {
          console.log("Payment verified:", result);
          toast({
            title: "Payment verified successfully!",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Payment verification failed ke.",
            status: "error",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error verifying payment: ", error);
        toast({
          title: "Error verifying payment!",
          description: error.message,
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    paystack.newTransaction({
      // key: "pk_live_391e2beeec3dd66d2febb43f9b0d4d0483546ead",
      key: "pk_test_391fbce264d08ac84a8c7a4472cc926aa9a1bc8b",
      email: useremail,
      amount: totalAmount * 100, // Amount in kobo (5000 NGN)
      currency: "NGN", // Specify the currency
      onSuccess: (transaction) => {
        toast({
          title: "Payment successful!",
          //   description: `Transaction reference: ${transaction.reference}`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });

        // Verify payment on your backend here if necessary
        verifyPayment(transaction.reference);
      },
      onCancel: () => {
        // Payment canceled callback
        toast({
          title: "Payment canceled!",
          status: "warning",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        // Payment error callback
        toast({
          title: "Payment error!",
          description: error.message,
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  // Optional: Function to verify the payment via your backend
  return (
    <div>
      <button onClick={initiatePayment} className="font-semibold">
        Pay Now
      </button>
    </div>
  );
};

export default PayWithPaystack;
