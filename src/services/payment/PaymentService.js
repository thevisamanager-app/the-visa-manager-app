// import RazorpayCheckout from "react-native-razorpay";

// const BASE_URL = "https://us-central1-thevisamanager-bea80.cloudfunctions.net/api";

// const CREATE_ORDER = `${BASE_URL}/createRazorpayOrder`;
// const VERIFY_PAYMENT = `${BASE_URL}/verifyRazorpayPayment`;

// export async function startPayment(amount, userId, userDetails) {
//   console.log("USER =>", userDetails);

//   try {
//     const response = await fetch(CREATE_ORDER, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount, userId }),
//     });

//     const data = await response.json();
//     console.log("ORDER RESPONSE ===>", data);

//     const options = {
//       description: "Visa Payment",
//       currency: data.currency,
//       key: data.key,
//       amount: data.amount,   // already in paise
//       name: "Visa Manager",
//       order_id: data.orderId, // Correct mapping
//       theme: { color: "#FF6F00" },
//       prefill: {
//         name: userDetails?.firstName || "Guest",
//         email: "guest@email.com",
//         contact: "0000000000",
//       },
//     };

//     const paymentResponse = await RazorpayCheckout.open(options);
//     console.log("PAYMENT RESPONSE ===>", paymentResponse);

//     const verify = await fetch(VERIFY_PAYMENT, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(paymentResponse),
//     });

//     const verifyData = await verify.json();
//     console.log("VERIFY ===>", verifyData);

//     return { success: verifyData.valid, id: paymentResponse.razorpay_payment_id };
//   } catch (error) {
//     console.log("Payment Failed =>", error);
//     return { success: false };
//   }
// }





// import RazorpayCheckout from "react-native-razorpay";

// const BASE_URL = "https://api-fdkefcllsq-uc.a.run.app";

// const CREATE_ORDER = `${BASE_URL}/createRazorpayOrder`;
// const VERIFY_PAYMENT = `${BASE_URL}/verifyRazorpayPayment`;

// export async function startPayment(amount, userId, userDetails) {
//   console.log("USER DETAILS =>", userDetails);

//   try {
//     const response = await fetch(CREATE_ORDER, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount, userId }),
//     });

//     // Read raw response instead of json, to avoid crash
//     const raw = await response.text();
//     console.log("RAW ORDER RESPONSE ===>", raw);

//     let data = {};
//     try {
//       data = JSON.parse(raw);
//     } catch (e) {
//       console.log("JSON PARSE ERROR:", e);
//       return { success: false };
//     }

//     console.log("ORDER RESPONSE PARSED ===>", data);

//     if (!data?.orderId || !data?.key) {
//       console.log("ORDER FAILED — Missing fields");
//       return { success: false };
//     }

//     const options = {
//       description: "Visa Payment",
//       currency: data.currency || "INR",
//       key: data.key,
//       amount: data.amount, // already in paise
//       name: "Visa Manager",
//       order_id: data.orderId,
//       theme: { color: "#FF6F00" },
//       prefill: {
//         name: userDetails?.firstName || "Guest",
//         email: "guest@email.com",
//         contact: "0000000000",
//       },
//     };

//     const paymentResponse = await RazorpayCheckout.open(options);
//     console.log("PAYMENT RESPONSE ===>", paymentResponse);

//     const verify = await fetch(VERIFY_PAYMENT, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(paymentResponse),
//     });

//     const verifyRaw = await verify.text();
//     console.log("RAW VERIFY RESPONSE ===>", verifyRaw);

//     let verifyData = {};
//     try {
//       verifyData = JSON.parse(verifyRaw);
//     } catch (e) {
//       console.log("VERIFY JSON PARSE ERROR:", e);
//       return { success: false };
//     }

//     console.log("VERIFY ===>", verifyData);

//     return {
//       success: verifyData.valid === true,
//       id: paymentResponse.razorpay_payment_id,
//     };

//   } catch (error) {
//     console.log("Payment Failed =>", error);
//     return { success: false };
//   }
// }



import RazorpayCheckout from "react-native-razorpay";

const BASE_URL = "https://us-central1-thevisamanager-bea80.cloudfunctions.net/api";

const CREATE_ORDER = `${BASE_URL}/createRazorpayOrder`;
const VERIFY_PAYMENT = `${BASE_URL}/verifyRazorpayPayment`;

export async function startPayment(amount, userId, userDetails) {
<<<<<<< HEAD
  console.log("USER DETAILS =>", userDetails);

  console.log("FINAL CREATE_ORDER URL =>", CREATE_ORDER);

=======
>>>>>>> c844a8385ea793848ab2f82bb9f8f85e8bfdd1fb
  try {
    const response = await fetch(CREATE_ORDER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, userId }),
    });

    if (!response.ok) {
      console.log("CREATE ORDER HTTP ERROR:", response.status);
      const errText = await response.text();
      console.log("ERROR BODY:", errText);
      return { success: false };
    }

    const raw = await response.text();
    console.log("RAW ORDER RESPONSE ===>", raw);


    if (!response.ok) return { success: false };

    const data = JSON.parse(raw);

    if (!data?.orderId || !data?.key) return { success: false };

    const options = {
      description: "Visa Payment",
      currency: data.currency || "INR",
      key: data.key,
      amount: data.amount, // paise
      name: "Visa Manager",
      order_id: data.orderId,
      theme: { color: "#FF6F00" },
      prefill: {
        name: userDetails?.firstName || "Guest",
        email: "guest@email.com",
        contact: "9999999999",
      },

    };

    const paymentResponse = await RazorpayCheckout.open(options);
    console.log("PAYMENT RESPONSE ===>", paymentResponse);

    const verify = await fetch(VERIFY_PAYMENT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentResponse),
    });

    const verifyRaw = await verify.text();
    console.log("RAW VERIFY RESPONSE ===>", verifyRaw);

    if (!verify.ok) return { success: false };

    const verifyData = JSON.parse(verifyRaw);

    return {
      success: verifyData.valid === true,
      id: paymentResponse.razorpay_payment_id,
    };

  } catch (error) {
    console.log("Payment Failed =>", error);
    return { success: false };
  }
}