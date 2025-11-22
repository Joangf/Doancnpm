import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_BACKEND_URL;
import TickingFail from "../utils/TickingFail";
import TickingSuccess from "../utils/TickingSuccess";
const handlePaymentSuccess = async (setPaymentStatus) => {
  const planId = sessionStorage.getItem('currentPlanId');
  const paymentUrl = sessionStorage.getItem('paymentUrl');
  if (!planId || !paymentUrl) {
    setPaymentStatus(false);
    return;
  }
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
    return () => {
      sessionStorage.removeItem('currentPlanId');
      sessionStorage.removeItem('paymentUrl');
    };
    
  }, []);
  return (
    <>
      <TickingSuccess isVisible={paymentStatus === true} message="Payment successful" />
      <TickingFail isVisible={paymentStatus === false} message="Payment failed" />
    </>
  );
};
export default Payment;