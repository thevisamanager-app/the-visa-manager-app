import RazorpayCheckout from "react-native-razorpay";

const CREATE_ORDER = "https://<region>-<project>.cloudfunctions.net/createRazorpayOrder";
const VERIFY_PAYMENT = "https://<region>-<project>.cloudfunctions.net/verifyRazorpayPayment";

export async function startPayment(amount, userId) {
  try {
    const res = await fetch(CREATE_ORDER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, userId }),
    });

    const { orderId, key, currency } = await res.json();

    const options = {
      description: "Visa Payment",
      currency,
      key,
      amount: amount * 100,
      name: "Visa Payment",
      order_id: orderId,
      theme: { color: "#FF6F00" }, // ORANGE
      prefill: {
        name: "Test User",
        email: "test@test.com",
        contact: "9999999999",
      },
    };

    const paymentResponse = await RazorpayCheckout.open(options);

    const verify = await fetch(VERIFY_PAYMENT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentResponse),
    });

    const verifyRes = await verify.json();
    return verifyRes.valid;

  } catch (err) {
    console.log("Payment Failed:", err);
    return false;
  }
}
