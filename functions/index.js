// // 
// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// const { defineSecret } = require("firebase-functions/params");
// const {onRequest} = require("firebase-functions/v2/https");

// const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
// const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

// admin.initializeApp();
// const db = admin.firestore();
// const app = express();
// app.use(express.json());

// // Razorpay init
// function getRazorpay() {
//   return new Razorpay({
//     key_id: RAZORPAY_KEY_ID.value(),
//     key_secret: RAZORPAY_KEY_SECRET.value(),
//   });
// }

// // ====== TEST ROUTE ======
// app.get("/", (_, res) => {
//   res.send("API working 🚀");
// });

// // ====== CREATE RAZORPAY ORDER ======
// app.post("/createRazorpayOrder", async (req, res) => {
//   try {
//     const { amount, userId } = req.body;
//     if (!amount || !userId) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const razorpay = getRazorpay();
//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     });

//     await db.collection("payments").doc(order.id).set({
//       userId,
//       amount,
//       status: "created",
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     return res.status(200).json({
//       key: RAZORPAY_KEY_ID.value(),
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//     });

//   } catch (e) {
//     console.error("Create order error =>", e);
//     return res.status(500).json({ error: "Order creation failed" });
//   }
// });


// // ====== VERIFY RAZORPAY PAYMENT ======
// app.post("/verifyRazorpayPayment", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

//     const expected = crypto
//       .createHmac("sha256", RAZORPAY_KEY_SECRET.value())
//       .update(sign)
//       .digest("hex");

//     const verified = expected === razorpay_signature;

//     await db.collection("payments").doc(razorpay_order_id).update({
//       status: verified ? "paid" : "failed",
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     return res.status(200).json({ valid: verified });

//   } catch (e) {
//     console.log("Verify error:", e);
//     return res.status(500).json({ error: e });
//   }
// });

// // ====== EXPORT API FUNCTION (GEN1) ======
// // ====== EXPORT API FUNCTION (GEN 2) ======
// exports.api = onRequest(
//   { region: "us-central1" },
//   app
// );


const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Define secrets
const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(express.json());

// Razorpay init
function getRazorpay() {
  return new Razorpay({
    key_id: RAZORPAY_KEY_ID.value(),
    key_secret: RAZORPAY_KEY_SECRET.value(),
  });
}

// Test route
app.get("/", (_, res) => {
  res.send("API working 🚀");
});

// Create order
app.post("/createRazorpayOrder", async (req, res) => {
  try {
    const { amount, userId } = req.body;
    if (!amount || !userId) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount: amount * 100,   //Razor pay works in paise 1rs = 100 paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    await db.collection("payments").doc(order.id).set({
      userId,
      amount,
      status: "created",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      key: RAZORPAY_KEY_ID.value(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (e) {
    console.error("Create order error =>", e);
    return res.status(500).json({ error: "Order creation failed", details: e.message });
  }
});

// Verify payment
app.post("/verifyRazorpayPayment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expected = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET.value())
      .update(sign)
      .digest("hex");

    const verified = expected === razorpay_signature;

    await db.collection("payments").doc(razorpay_order_id).update({
      status: verified ? "paid" : "failed",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({ valid: verified });

  } catch (e) {
    console.error("Verify payment error =>", e);
    return res.status(500).json({ error: e.message });
  }
});

// Export https function WITH secrets attached
exports.api = onRequest(
  {
    region: "us-central1",
    secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
  },
  app
);


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const PDFDocument = require("pdfkit");
const path = require("path");
const os = require("os");
const fs = require("fs");

admin.initializeApp();

exports.generateVisaPDF = functions.https.onCall(async (data, context) => {
  const {
    firstName,
    lastName,
    passportNumber,
    nationality,
    birthDate,
    expiryDate,
    logoUrl
  } = data;

  const tempFilePath = path.join(os.tmpdir(), `Visa_${passportNumber}.pdf`);
  const doc = new PDFDocument();

  const writeStream = fs.createWriteStream(tempFilePath);
  doc.pipe(writeStream);

  // Logo + Company Name
  doc.image("logo/tvm.png", 40, 40, { width: 80 });
  doc.fontSize(28).fillColor("black").text("The Visa ", 140, 50, { continued: true });
  doc.fillColor("#FF5C00").text("Manager");

  doc.moveDown(2);

  // Header line
  doc.moveTo(40, 120).lineTo(550, 120).stroke("#FF5C00");

  // Data
  doc.fontSize(16).fillColor("black").text(`Traveller Name: ${firstName} ${lastName}`);
  doc.text(`Passport Number: ${passportNumber}`);
  doc.text(`Nationality: ${nationality}`);
  doc.text(`Birth Date: ${birthDate}`);
  doc.text(`Passport Expiry: ${expiryDate}`);

  doc.end();

  await new Promise(res => writeStream.on("finish", res));

  const bucket = admin.storage().bucket();
  await bucket.upload(tempFilePath, {
    destination: `visas/pdf/${passportNumber}.pdf`,
    contentType: "application/pdf",
  });

  fs.unlinkSync(tempFilePath);

  const file = bucket.file(`visas/pdf/${passportNumber}.pdf`);
  const [url] = await file.getSignedUrl({
    action: "read",
    expires: "03-09-2030"
  });

  return { downloadUrl: url };
});
