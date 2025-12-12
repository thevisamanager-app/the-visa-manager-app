import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";

export const generateInvoicePdf = async ({ userName, invoiceId, amount }) => {
  const logoBase64 = ""; // Optional: add base64 logo later

  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 24px; }
          .header { text-align: center; }
          .title { font-size: 22px; font-weight: bold; margin-bottom: 10px; }
          .info { margin-top: 20px; font-size: 16px; }
          .row { margin-bottom: 8px; }
          .footer { margin-top: 30px; text-align:center; font-size:14px; color:gray; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Visa Manager</h1>
          <h2 class="title">INVOICE</h2>
        </div>

        <div class="info">
          <p class="row"><b>Invoice No:</b> ${invoiceId}</p>
          <p class="row"><b>Name:</b> ${userName}</p>
          <p class="row"><b>Amount Paid:</b> ₹${amount}</p>
          <p class="row"><b>Date:</b> ${new Date().toLocaleString()}</p>
        </div>

        <div class="footer">
          Thank you for choosing Visa Manager!
        </div>
      </body>
    </html>
  `;

  const file = await RNHTMLtoPDF.convert({
    html: htmlContent,
    fileName: invoiceId,
    directory: "Documents",
  });

  return file.filePath;
};
