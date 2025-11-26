const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(express.json());

// Lazy init Razorpay with config()
let razorpayInstance = null;
function getRazorpay() {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: functions.config().razorpay.key_id,
      key_secret: functions.config().razorpay.key_secret,
    });
  }
  return razorpayInstance;
}

// TEST
app.get("/", (_, res) => res.send("API working 🚀"));

// Create order
app.post("/createRazorpayOrder", async (req, res) => {
  try {
    const { amount, userId } = req.body;
    if (!amount || !userId) return res.status(400).json({ error: "Missing fields" });

    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    await db.collection("payments").doc(order.id).set({
      userId,
      amount,
      status: "created",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({
      key: functions.config().razorpay.key_id,
      orderId: order.id,
      amount: order.amount,
    });

  } catch (e) {
    res.status(500).json({ error: "Order error", details: e });
  }
});

// Verify payment
app.post("/verifyRazorpayPayment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", functions.config().razorpay.key_secret)
      .update(sign)
      .digest("hex");

    const verified = expected === razorpay_signature;

    await db.collection("payments").doc(razorpay_order_id).update({
      status: verified ? "paid" : "failed",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ valid: verified });

  } catch (e) {
    res.status(500).json({ error: "Verification failed", details: e });
  }
});

// EXPORT GEN 1 EXPRESS FUNCTION
exports.api = functions.https.onRequest(app);
