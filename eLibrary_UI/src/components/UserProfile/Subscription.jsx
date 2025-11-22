import "../../pages/UserProfilePage.css";
const API_URL = import.meta.env.VITE_BACKEND_URL;
const Subscription = ({ subscriptionPlan, activeSubscriptionPlan }) => {
  const handlePayment = async (id) => {
    try {
      const response = await fetch(`${API_URL}/payment/create-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ planId: id }),
      });
      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('currentPlanId', id);
        sessionStorage.setItem('paymentUrl', data.result.paymentUrl);
        window.open(data.result.paymentUrl, "_blank");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  return (
    <main className="profile-main">
      <div className="profile-header">
        <h1>Subscription</h1>
      </div>
      {subscriptionPlan.map((plan) => (
        <div key={plan.id} className="subscription-wrapper">
          <div className="plan-card">
            <div className="plan-badge">Best Value</div>
            <h2 className="plan-title">{plan.name}</h2>
            <p className="plan-subtitle">
              Unlock the full potential of your reading journey
            </p>

            <h3 className="plan-price">
              {plan.price}đ<span>/month</span>
            </h3>

            <div className="plan-divider"></div>

            <ul className="plan-features">
              <li>
                <span className="check-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                Increased Borrowing ({plan.maxBorrowNumbers} books)
              </li>
              <li>
                <span className="check-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                Extended Due Dates ({plan.maxBorrowDays} days)
              </li>
              <li>
                <span className="check-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                Premium Support
              </li>
              <li>
                <span className="check-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                No Late Fees
              </li>
              <li>
                <span className="check-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
                Early Access to New Arrivals
              </li>
            </ul>

            <button className="subscribe-btn" 
            disabled={activeSubscriptionPlan.includes(plan.name)}
            onClick={() => activeSubscriptionPlan == plan.name ? null : handlePayment(plan.id)}>
              {activeSubscriptionPlan.includes(plan.name) ? 'You had this plan' : 'Subscribe Now'}
            </button>
          </div>
        </div>

      ))}
    </main>
  );
};
export default Subscription;