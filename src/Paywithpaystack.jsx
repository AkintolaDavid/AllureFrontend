import React from "react";
import PaystackPop from "@paystack/inline-js"; // Import the Paystack library
import { useToast } from "@chakra-ui/react"; // For notifications (optional)

const PayWithPaystack = ({ totalAmount, onSuccess }) => {
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
            // description: `Transaction Reference: ${reference}`,
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Payment verification failed",
            // description: result.message || "Please try again later.",
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
      key: "pk_test_391fbce264d08ac84a8c7a4472cc926aa9a1bc8b", // Test key
      email: useremail,
      amount: totalAmount * 100, // Amount in kobo (e.g., 5000 NGN)
      currency: "NGN", // Specify the currency
      onSuccess: (transaction) => {
        toast({
          title: "Payment successful!",
          // description: `Transaction reference: ${transaction.reference}`,
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });

        // Call the onSuccess prop with transaction details
        onSuccess({ reference: transaction.reference });

        // Verify payment on your backend
        verifyPayment(transaction.reference);
      },
      onCancel: () => {
        toast({
          title: "Payment canceled!",
          status: "warning",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
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

  return (
    <div>
      <button onClick={initiatePayment} className="font-semibold">
        Pay Now
      </button>
    </div>
  );
};

export default PayWithPaystack;
