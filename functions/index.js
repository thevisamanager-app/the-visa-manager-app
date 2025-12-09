// // // 
// // const functions = require("firebase-functions");
// // const admin = require("firebase-admin");
// // const express = require("express");
// // const Razorpay = require("razorpay");
// // const crypto = require("crypto");

// // const { defineSecret } = require("firebase-functions/params");
// // const {onRequest} = require("firebase-functions/v2/https");

// // const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
// // const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

// // admin.initializeApp();
// // const db = admin.firestore();
// // const app = express();
// // app.use(express.json());

// // // Razorpay init
// // function getRazorpay() {
// //   return new Razorpay({
// //     key_id: RAZORPAY_KEY_ID.value(),
// //     key_secret: RAZORPAY_KEY_SECRET.value(),
// //   });
// // }

// // // ====== TEST ROUTE ======
// // app.get("/", (_, res) => {
// //   res.send("API working 🚀");
// // });

// // // ====== CREATE RAZORPAY ORDER ======
// // app.post("/createRazorpayOrder", async (req, res) => {
// //   try {
// //     const { amount, userId } = req.body;
// //     if (!amount || !userId) {
// //       return res.status(400).json({ error: "Missing fields" });
// //     }

// //     const razorpay = getRazorpay();
// //     const order = await razorpay.orders.create({
// //       amount: amount * 100,
// //       currency: "INR",
// //       receipt: "receipt_" + Date.now(),
// //     });

// //     await db.collection("payments").doc(order.id).set({
// //       userId,
// //       amount,
// //       status: "created",
// //       createdAt: admin.firestore.FieldValue.serverTimestamp(),
// //     });

// //     return res.status(200).json({
// //       key: RAZORPAY_KEY_ID.value(),
// //       orderId: order.id,
// //       amount: order.amount,
// //       currency: order.currency,
// //     });

// //   } catch (e) {
// //     console.error("Create order error =>", e);
// //     return res.status(500).json({ error: "Order creation failed" });
// //   }
// // });


// // // ====== VERIFY RAZORPAY PAYMENT ======
// // app.post("/verifyRazorpayPayment", async (req, res) => {
// //   try {
// //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

// //     const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

// //     const expected = crypto
// //       .createHmac("sha256", RAZORPAY_KEY_SECRET.value())
// //       .update(sign)
// //       .digest("hex");

// //     const verified = expected === razorpay_signature;

// //     await db.collection("payments").doc(razorpay_order_id).update({
// //       status: verified ? "paid" : "failed",
// //       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
// //     });

// //     return res.status(200).json({ valid: verified });

// //   } catch (e) {
// //     console.log("Verify error:", e);
// //     return res.status(500).json({ error: e });
// //   }
// // });

// // // ====== EXPORT API FUNCTION (GEN1) ======
// // // ====== EXPORT API FUNCTION (GEN 2) ======
// // exports.api = onRequest(
// //   { region: "us-central1" },
// //   app
// // );


// const { onRequest } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const admin = require("firebase-admin");
// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// // Define secrets
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

// // Test route
// app.get("/", (_, res) => {
//   res.send("API working 🚀");
// });

// // Create order
// app.post("/createRazorpayOrder", async (req, res) => {
//   try {
//     const { amount, userId } = req.body;
//     if (!amount || !userId) {
//       return res.status(400).json({ error: "Missing fields" });
//     }

//     const razorpay = getRazorpay();
//     const order = await razorpay.orders.create({
//       amount: amount * 100,   //Razor pay works in paise 1rs = 100 paise
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
//     return res.status(500).json({ error: "Order creation failed", details: e.message });
//   }
// });

// // Verify payment
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
//     console.error("Verify payment error =>", e);
//     return res.status(500).json({ error: e.message });
//   }
// });

// // Export https function WITH secrets attached
// exports.api = onRequest(
//   {
//     region: "us-central1",
//     secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
//   },
//   app
// );




// // ===================== REQUIRED IMPORTS ======================
// const { onRequest, onCall } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const admin = require("firebase-admin");
// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// const PDFDocument = require("pdfkit");
// const { Storage } = require("@google-cloud/storage");

// // ===================== FIREBASE INIT ======================
// admin.initializeApp();
// const db = admin.firestore();
// const storage = new Storage();

// // ===================== RAZORPAY SECRETS ======================
// const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
// const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

// // ===================== EXPRESS APP ======================
// const app = express();
// app.use(express.json());

// // Razorpay init
// function getRazorpay() {
//   return new Razorpay({
//     key_id: RAZORPAY_KEY_ID.value(),
//     key_secret: RAZORPAY_KEY_SECRET.value(),
//   });
// }

// // ===================== TEST ROUTE ======================
// app.get("/", (_, res) => {
//   res.send("API working 🚀");
// });

// // ===================== CREATE RAZORPAY ORDER ======================
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
//     return res.status(500).json({ error: "Order creation failed", details: e.message });
//   }
// });

// // ===================== VERIFY PAYMENT ======================
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
//     return res.status(500).json({ error: e.message });
//   }
// });

// // ===================== GENERATE INVOICE PDF (Cloud Callable) ======================
// exports.generateInvoice = onCall(async (req, context) => {
//   if (!context.auth) {
//     throw new HttpsError("unauthenticated", "Login required");
//   }

//   const { userName, invoiceId, amount, date } = req.data;
//   const userId = context.auth.uid;

//   const bucket = admin.storage().bucket();
//   const filePath = `users/${userId}/invoices/${invoiceId}.pdf`;
//   const file = bucket.file(filePath);

//   const pdfDoc = new PDFDocument({ size: "A4", margin: 40 });
//   const stream = pdfDoc.pipe(file.createWriteStream({ resumable: false }));

//   pdfDoc
//     .fillColor("#FF7A00")
//     .fontSize(26)
//     .text("The Visa Manager", { align: "center" });

//   pdfDoc
//     .fontSize(18)
//     .fillColor("#000")
//     .text("INVOICE", { align: "center" })
//     .moveDown(2);

//   pdfDoc
//     .fontSize(14)
//     .text(`Invoice ID: ${invoiceId}`)
//     .text(`Name: ${userName}`)
//     .text(`Amount Paid: ₹${amount}`)
//     .text(`Date: ${date}`)
//     .moveDown(1);

//   pdfDoc
//     .fontSize(12)
//     .fillColor("#FF7A00")
//     .text("Thank you for choosing Visa Manager!", { align: "center" });

//   pdfDoc.end();

//   return new Promise((resolve, reject) => {
//     stream.on("finish", async () => {
//       const url = await file.getSignedUrl({
//         action: "read",
//         expires: "01-01-2028",
//       });

//       resolve({ url: url[0] });
//     });

//     stream.on("error", reject);
//   });
// });

// // ===================== EXPORT EXPRESS API ======================
// exports.api = onRequest(
//   {
//     region: "us-central1",
//     secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
//   },
//   app
// );








// ===================== REQUIRED IMPORTS ======================
// const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const admin = require("firebase-admin");
// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");

// const PDFDocument = require("pdfkit");

// // ===================== FIREBASE INIT ======================
// admin.initializeApp();
// const db = admin.firestore();

// // ===================== RAZORPAY SECRETS ======================
// const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
// const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

// // ===================== EXPRESS APP ======================
// const app = express();
// app.use(express.json());

// // Razorpay init
// function getRazorpay() {
//   return new Razorpay({
//     key_id: RAZORPAY_KEY_ID.value(),
//     key_secret: RAZORPAY_KEY_SECRET.value(),
//   });
// }

// // ===================== TEST ROUTE ======================
// app.get("/", (_, res) => {
//   res.send("API working 🚀");
// });

// // ===================== CREATE RAZORPAY ORDER ======================
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
//     return res.status(500).json({ error: "Order creation failed", details: e.message });
//   }
// });

// // ===================== VERIFY PAYMENT ======================
// app.post("/verifyRazorpayPayment", async (req, res) => {
//   try {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//     const sign = `${razorpay_order_id}|${razpay_payment_id}`;
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
//     return res.status(500).json({ error: e.message });
//   }
// });

// // ===================== GENERATE INVOICE PDF ======================
// //const { onCall, HttpsError } = require("firebase-functions/v2/https");
// //const admin = require("firebase-admin");
// //const PDFDocument = require("pdfkit");

// //admin.initializeApp();

// export const generateInvoice = onCall(async (req) => {
//     try {
//         console.log("CALL DATA ===>", req);

//         // ⭐ Accessing authentication from req.auth in v2
//         const auth = req.auth;
//         if (!auth || !auth.uid) {
//             throw new Error("User not authenticated");
//         }

//         const { invoiceId, userName, date, amount, userId } = req.data;

//         if (!invoiceId || !userName || !date || !amount || !userId) {
//             throw new Error("Missing Required Fields");
//         }

//         console.log("userId =>", userId);
//         console.log("invoiceId =>", invoiceId);

//         // TODO: Replace with actual invoice PDF generation logic or Firestore entry
//         // For testing, we return a dummy static PDF file URL or Cloud Storage URL
//         const pdfUrl = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;

//         return {
//             status: "success",
//             message: "Invoice generated successfully",
//             url: pdfUrl,
//         };

//     } catch (error) {
//         console.error("Invoice generation failed:", error);
//         throw new Error(error.message || "INTERNAL ERROR");
//     }
// })




// // ===================== EXPORT EXPRESS API ======================
// exports.api = onRequest(
//   {
//     region: "us-central1",
//     secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
//   },
//   app
// );



// ===================== REQUIRED IMPORTS ======================
// const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https");
// const { defineSecret } = require("firebase-functions/params");
// const admin = require("firebase-admin");
// const express = require("express");
// const Razorpay = require("razorpay");
// const crypto = require("crypto");
// const PDFDocument = require("pdfkit");

// // ===================== FIREBASE INIT ======================
// admin.initializeApp();
// const db = admin.firestore();

// // ===================== RAZORPAY SECRETS ======================
// const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
// const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

// // ===================== EXPRESS APP ======================
// const app = express();
// app.use(express.json());

// // Razorpay init
// function getRazorpay() {
//   return new Razorpay({
//     key_id: RAZORPAY_KEY_ID.value(),
//     key_secret: RAZORPAY_KEY_SECRET.value(),
//   });
// }

// // ===================== TEST ROUTE ======================
// app.get("/", (_, res) => {
//   res.send("API working 🚀");
// });

// // ===================== CREATE RAZORPAY ORDER ======================
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
//     return res.status(500).json({ error: "Order creation failed", details: e.message });
//   }
// });

// // ===================== VERIFY PAYMENT ======================
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
//     return res.status(500).json({ error: e.message });
//   }
// });

// // ===================== GENERATE INVOICE PDF (CALLABLE) ======================
// exports.generateInvoice = onCall(async (req) => {
//   try {
//     console.log("CALL DATA ===>", req);

//     if (!req.auth || !req.auth.uid) {
//       throw new Error("User not authenticated");
//     }

//     const { invoiceId, userName, date, amount, userId } = req.data;
//     if (!invoiceId || !userName || !date || !amount || !userId) {
//       throw new Error("Missing Required Fields");
//     }

//     console.log("userId =>", userId);
//     console.log("invoiceId =>", invoiceId);

//     // Dummy PDF for testing
//     const pdfUrl = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;

//     return {
//       status: "success",
//       message: "Invoice generated successfully",
//       url: pdfUrl,
//     };

//   } catch (error) {
//     console.error("Invoice generation failed:", error);
//     throw new HttpsError("internal", error.message || "INTERNAL ERROR");
//   }
// });

// // ===================== EXPORT EXPRESS API ======================
// exports.api = onRequest(
//   {
//     region: "us-central1",
//     secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
//   },
//   app
// );



// ===================== REQUIRED IMPORTS ======================
const { onRequest, onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

// ===================== FIREBASE INIT ======================
admin.initializeApp();
const db = admin.firestore();
const bucket = admin.storage().bucket(); // <--- important for file upload

// ===================== RAZORPAY SECRETS ======================
const RAZORPAY_KEY_ID = defineSecret("RAZORPAY_KEY_ID");
const RAZORPAY_KEY_SECRET = defineSecret("RAZORPAY_KEY_SECRET");

// ===================== EXPRESS APP ======================
const app = express();
app.use(express.json());

// Razorpay init
function getRazorpay() {
  return new Razorpay({
    key_id: RAZORPAY_KEY_ID.value(),
    key_secret: RAZORPAY_KEY_SECRET.value(),
  });
}

// ===================== TEST ROUTE ======================
app.get("/", (_, res) => {
  res.send("API working 🚀");
});

// ===================== CREATE RAZORPAY ORDER ======================
app.post("/createRazorpayOrder", async (req, res) => {
  try {
    const { amount, userId } = req.body;
    if (!amount || !userId) {
      return res.status(400).json({ error: "Missing fields" });
    }

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

    return res.status(200).json({
      key: RAZORPAY_KEY_ID.value(),
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (e) {
    return res.status(500).json({ error: "Order creation failed", details: e.message });
  }
});

// ===================== VERIFY PAYMENT ======================
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
    return res.status(500).json({ error: e.message });
  }
});

// ===================== GENERATE INVOICE PDF (REAL PDF) ======================
exports.generateInvoice = onCall(async (req) => {
  try {
    console.log("CALL DATA ===>", req.data);

    if (!req.auth || !req.auth.uid) {
      throw new HttpsError("unauthenticated", "User not authenticated");
    }

    const { invoiceId, userName, date, amount, userId } = req.data;
    if (!invoiceId || !date || !amount || !userId) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    const displayName = userName || "Guest User";

    // PDF Setup
    const fs = require("fs");
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    const filePath = `/tmp/${invoiceId}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));

    // ---- LOGO & HEADER ----
    const logoPath = path.join(__dirname, "assests", "TVMLogo.png");
    doc.image(logoPath, 40, 40, { width: 140 });
    doc.fillColor("#FF6A00").fontSize(26).text("INVOICE", 400, 45, { align: "right" });

    doc.moveDown(5);

    // ---- META INFO ----
    doc.fontSize(12).fillColor("#000")
      .text(`Invoice No: ${invoiceId}`, 40, doc.y, { continued: true })
      .text(`Date: ${date}`, 350, doc.y);

    doc.moveDown(2);

    // ---- BILL TO & COMPANY DETAILS ----
    doc.fontSize(14).fillColor("#FF6A00").text("Bill To:", 40);
    doc.fillColor("#000").fontSize(12);
    doc.text(`${displayName}`);
    doc.text(`Customer ID: ${userId}`);
    doc.text(`Mobile: +91 XXXXXXXX`);
    doc.moveDown(2);

    doc.fontSize(14).fillColor("#FF6A00").text("Company Details:", 350);
    doc.fillColor("#000").fontSize(12);
    doc.text("The Visa Manager");
    doc.text("Pune, Maharashtra");
    doc.text("Transaction Type: B2C");

    doc.moveDown(1);

    // ---- TABLE HEADER ----
    doc.moveTo(40, doc.y + 10).lineTo(550, doc.y + 10).stroke("#FF6A00");
    doc.moveDown();
    doc.fontSize(14).fillColor("#FF6A00")
      .text("DESCRIPTION", 40, doc.y, { continued: true })
      .text("CURRENCY", 300, doc.y, { continued: true })
      .text("AMOUNT", 450, doc.y);

    doc.moveTo(40, doc.y + 10).lineTo(550, doc.y + 10).stroke("#FF6A00");
    doc.moveDown(1.5);

    // ---- TABLE ROW ----
    doc.fontSize(13).fillColor("#000");
    doc.text("Sri Lanka Visa Processing Fee", 40, doc.y, { continued: true });
    doc.text("INR", 300, doc.y, { continued: true });
    doc.text(`${amount}`, 450, doc.y);

    doc.moveDown(2);

    // ---- TOTAL ----
    doc.fontSize(16).fillColor("#FF6A00").text(`TOTAL: INR ${amount}`, { align: "right" });

    doc.moveDown(2);

    // ---- FOOTER ----
    doc.fontSize(11).fillColor("#000")
      .text("This is a computer-generated invoice and requires no signature.", { align: "center" });

    doc.moveDown(1);

    doc.fontSize(10).fillColor("gray")
      .text("Support: support@thevisamanager.com | +91-XXXXXXXXXX", { align: "center" });

    doc.end();
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Upload to Storage
    await bucket.upload(filePath, {
      destination: `invoices/${invoiceId}.pdf`,
      contentType: "application/pdf",
      metadata: { cacheControl: "public,max-age=31536000" }
    });

    const file = bucket.file(`invoices/${invoiceId}.pdf`);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("Invoice URL =>", url);

    return {
      status: "success",
      message: "Invoice generated successfully",
      url,
    };

  } catch (error) {
    console.error("Invoice generation failed:", error);
    throw new HttpsError("internal", error.message);
  }
});


// ===================== EXPORT EXPRESS API ======================
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
