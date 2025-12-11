
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
const os = require("os");

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
// exports.generateInvoice = onCall(async (req) => {
//   try {
//     console.log("CALL DATA ===>", req.data);

//     if (!req.auth || !req.auth.uid) {
//       throw new HttpsError("unauthenticated", "User not authenticated");
//     }

//     const { invoiceId, userName, date, amount, userId, country } = req.data;
//     if (!invoiceId || !date || !amount || !userId || !country) {
//       throw new HttpsError("invalid-argument", "Missing required fields");
//     }

//     const displayName = userName || "Guest User";

//     // PDF Setup
//     const fs = require("fs");
//     const doc = new PDFDocument({ margin: 40, size: "A4" });
//     const filePath = `/tmp/${invoiceId}.pdf`;
//     doc.pipe(fs.createWriteStream(filePath));

//     // ---- LOGO & HEADER ----
//     const logoPath = path.join(__dirname, "assets", "TVMLogo.png");
//     doc.image(logoPath, 40, 40, { width: 140 });
//     doc.fillColor("#FF6A00").fontSize(26).text("INVOICE", 400, 45, { align: "right" });

//     doc.moveDown(1);

//     doc.fontSize(12).fillColor("#000")
//       .text(`Invoice No: ${invoiceId}`, 40, doc.y);
//     doc.text(`Date: ${date}`, { align: "right" });

//     doc.moveDown(2);
//     // ---- BILL TO & COMPANY DETAILS ----
//     doc.fontSize(14).fillColor("#FF6A00").text("Bill To:", 40);
//     doc.fillColor("#000").fontSize(12);
//     doc.text(`Customer ID: ${userId}`);
//     doc.text(`Mobile: ${displayName}`);
//     doc.moveDown(2);

//     doc.fontSize(14).fillColor("#FF6A00").text("Company Details:", 40);
//     doc.fillColor("#000").fontSize(12);
//     doc.text("The Visa Manager");
//     doc.text("Pune, Maharashtra");
//     doc.text("Transaction Type: B2C");

//     doc.moveDown(1);

//     // ---- TABLE HEADER ----
//     doc.moveTo(40, doc.y + 10).lineTo(550, doc.y + 10).stroke("#FF6A00");
//     doc.moveDown();
//     doc.fontSize(14).fillColor("#FF6A00")
//       .text("DESCRIPTION", 40, doc.y, { continued: true })
//       .text("CURRENCY", 300, doc.y, { continued: true })
//       .text("AMOUNT", 450, doc.y);

//     doc.moveTo(40, doc.y + 10).lineTo(550, doc.y + 10).stroke("#FF6A00");
//     doc.moveDown(1.5);

//     // ---- TABLE ROW ----
//     doc.fontSize(13).fillColor("#000");
//     doc.text(`${country}`, 40, doc.y, { continued: true });
//     doc.text("INR", 300, doc.y, { continued: true });
//     doc.text(`${amount}`, 450, doc.y);

//     doc.moveDown(2);

//     // ---- TOTAL ----
//     doc.fontSize(16).fillColor("#FF6A00").text(`TOTAL: INR ${amount}`, { align: "right" });

//     doc.moveDown(2);

//     // ---- FOOTER ----
//     doc.fontSize(11).fillColor("#000")
//       .text("This is a computer-generated invoice and requires no signature.", { align: "center" });

//     doc.moveDown(1);

//     doc.fontSize(10).fillColor("gray")
//       .text("Support: support@thevisamanager.com | +91-XXXXXXXXXX", { align: "center" });

//     doc.end();
//     await new Promise((resolve) => setTimeout(resolve, 800));

//     // Upload to Storage
//     await bucket.upload(filePath, {
//       destination: `invoices/${invoiceId}.pdf`,
//       contentType: "application/pdf",
//       metadata: { cacheControl: "public,max-age=31536000" }
//     });

//     const file = bucket.file(`invoices/${invoiceId}.pdf`);
//     const [url] = await file.getSignedUrl({
//       action: "read",
//       expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
//     });

//     console.log("Invoice URL =>", url);

//     return {
//       status: "success",
//       message: "Invoice generated successfully",
//       url,
//     };

//   } catch (error) {
//     console.error("Invoice generation failed:", error);
//     throw new HttpsError("internal", error.message);
//   }
// });

exports.generateInvoice = onCall(async (req) => {
  try {
    console.log("CALL DATA ===>", req.data);

    // --------- AUTH CHECK ----------
    if (!req.auth || !req.auth.uid) {
      throw new HttpsError("unauthenticated", "User not authenticated");
    }

    const { invoiceId, userName, date, amount, userId, country } = req.data;

    // --------- BASIC VALIDATION ----------
    if (!invoiceId || !date || amount == null || !userId || !country) {
      throw new HttpsError("invalid-argument", "Missing required fields");
    }

    if (typeof amount !== "number") {
      throw new HttpsError("invalid-argument", "Amount must be a number");
    }

    const displayName = userName || "Guest User";

    // --------- PDF SETUP ----------
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    const filePath = path.join(os.tmpdir(), `${invoiceId}.pdf`);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // --------- LOGO & HEADER ----------
    try {
      const logoPath = path.join(__dirname, "assets", "TVMLogo.png"); // ✅ FIXED FOLDER NAME
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, 40, 40, { width: 140 });
      } else {
        console.warn("Logo file not found at:", logoPath);
      }
    } catch (e) {
      console.warn("Logo load failed:", e);
      // don't throw, still generate invoice without logo
    }

    doc.fillColor("#FF6A00")
      .fontSize(26)
      .text("INVOICE", 400, 45, { align: "right" });

    doc.moveDown(1);

    doc.fontSize(12).fillColor("#000")
      .text(`Invoice No: ${invoiceId}`, 40, doc.y);
    doc.text(`Date: ${date}`, { align: "right" });

    doc.moveDown(2);

    // --------- BILL TO & COMPANY DETAILS ----------
    doc.fontSize(14).fillColor("#FF6A00").text("Bill To:", 40);
    doc.fillColor("#000").fontSize(12);
    doc.text(`Customer ID: ${userId}`);
    doc.text(`Mobile: ${displayName}`);
    doc.moveDown(2);

    doc.fontSize(14).fillColor("#FF6A00").text("Company Details:", 40);
    doc.fillColor("#000").fontSize(12);
    doc.text("The Visa Manager");
    doc.text("Pune, Maharashtra");
    doc.text("Transaction Type: B2C");

    doc.moveDown(1);

    // --------- TABLE HEADER ----------
    doc.moveTo(40, doc.y + 10).lineTo(550, doc.y + 10).stroke("#FF6A00");
    doc.moveDown();

    doc.fontSize(14).fillColor("#FF6A00")
      .text("DESCRIPTION", 40, doc.y, { continued: true })
      .text("CURRENCY", 300, doc.y, { continued: true })
      .text("AMOUNT", 450, doc.y);

    doc.moveTo(40, doc.y + 10).lineTo(550, doc.y + 10).stroke("#FF6A00");
    doc.moveDown(1.5);

    // --------- TABLE ROW ----------
    doc.fontSize(13).fillColor("#000");
    doc.text(`${country}`, 40, doc.y, { continued: true });
    doc.text("INR", 300, doc.y, { continued: true });
    doc.text(`${amount}`, 450, doc.y);

    doc.moveDown(2);

    // --------- TOTAL ----------
    doc.fontSize(16).fillColor("#FF6A00").text(`TOTAL: INR ${amount}`, {
      align: "right",
    });

    doc.moveDown(2);

    // --------- FOOTER ----------
    doc.fontSize(11).fillColor("#000")
      .text(
        "This is a computer-generated invoice and requires no signature.",
        { align: "center" }
      );

    doc.moveDown(1);

    doc.fontSize(10).fillColor("gray")
      .text(
        "Support: support@thevisamanager.com | +91-XXXXXXXXXX",
        { align: "center" }
      );

    doc.end();

    // ✅ Wait for file write to finish (instead of fixed 800ms)
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });

    // --------- UPLOAD TO STORAGE ----------
    await bucket.upload(filePath, {
      destination: `invoices/${invoiceId}.pdf`,
      contentType: "application/pdf",
      metadata: { cacheControl: "public,max-age=31536000" },
    });

    // Optional: clean tmp
    try {
      fs.unlinkSync(filePath);
    } catch (e) {
      console.warn("Failed to delete temp file:", e);
    }

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
    throw new HttpsError("internal", error.message || "Invoice failed");
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

// const PDFDocument = require("pdfkit");
// const path = require("path");
// const os = require("os");
// const fs = require("fs");

// admin.initializeApp();

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
