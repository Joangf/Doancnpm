import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_BACKEND_URL;
import TickingFail from "./components/TickingFail";
import TickingSuccess from "./components/TickingSuccess";
const handlePaymentSuccess = async (setPaymentStatus) => {
  const planId = localStorage.getItem('currentPlanId');
  const idUser = localStorage.getItem('idUser');
  const authToken = localStorage.getItem('authToken');
  try {
    const response = await fetch(`${API_URL}/subscriptions/subscribe`, {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({
        userId: idUser,
        planId: planId,
      })
    });
    if (response.ok) {
      setPaymentStatus(true);
      localStorage.removeItem('currentPlanId');
    }
    else {
      setPaymentStatus(false);
    }
  } catch (error) {
    console.error("Error fetching subscription plans:", error);
    setPaymentStatus(false);
  }
};
const redirectToHome = () => {
  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
};
const Payment = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  useEffect(() => {
    handlePaymentSuccess(setPaymentStatus);
    redirectToHome();
  }, []);
  return (
    <>
      <TickingSuccess isVisible={paymentStatus === true} message="Payment successful" />
      <TickingFail isVisible={paymentStatus === false} message="Payment failed" />
    </>
  );
};
export default Payment;