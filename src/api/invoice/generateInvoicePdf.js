import RNFS from "react-native-fs";
import INVOICE_LOGO_HEX, {
  INVOICE_LOGO_HEIGHT,
  INVOICE_LOGO_WIDTH,
} from "../../assets/logo/invoiceLogoHex";

const toAsciiSafe = (value = "") => String(value).replace(/[^\x00-\x7F]/g, " ");

const escapePdfText = (value = "") =>
  toAsciiSafe(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const text = (x, y, size, value, bold = false) => [
  "BT",
  `/${bold ? "F2" : "F1"} ${size} Tf`,
  `1 0 0 1 ${x} ${y} Tm`,
  `(${escapePdfText(value)}) Tj`,
  "ET",
];

const buildPdf = ({ invoiceId, userName, amount, dateText, country = "N/A" }) => {
  const amountNum = Number(amount || 0);
  const amountText = amountNum.toFixed(2);
  const streamLines = [
    // Outer border
    "35 40 525 760 re",
    "S",

    // Header bar
    "0.98 0.45 0.05 rg",
    "35 750 525 50 re",
    "f",
    "0 0 0 rg",

    // Draw logo image in header
    "q",
    `76 0 0 38 48 756 cm`,
    "/Im1 Do",
    "Q",

    ...text(420, 780, 14, "INVOICE", true),

    // Invoice meta section
    "45 650 505 85 re",
    "S",
    ...text(55, 715, 12, `Invoice No: ${invoiceId}`, true),
    ...text(55, 695, 11, `Invoice Date: ${dateText}`),
    ...text(320, 715, 12, `Customer: ${userName}`, true),
    ...text(320, 695, 11, `Country: ${country}`),

    // Service section title
    "0.95 0.95 0.95 rg",
    "45 610 505 25 re",
    "f",
    "0 0 0 rg",
    ...text(55, 618, 11, "Service Details", true),

    // Table
    "45 520 505 90 re",
    "S",
    "45 580 505 30 re",
    "S",
    "430 520 0 90 re",
    "S",
    ...text(55, 590, 11, "Description", true),
    ...text(445, 590, 11, "Amount", true),
    ...text(55, 560, 11, `Visa Processing Fee - ${country}`),
    ...text(445, 560, 11, `Rs ${amountText}`),
    ...text(55, 535, 11, "Total", true),
    ...text(445, 535, 11, `Rs ${amountText}`, true),

    // Footer
    ...text(55, 470, 10, "Payment Status: PAID", true),
    ...text(55, 450, 10, "Thank you for choosing The Visa Manager."),
  ];

  const stream = streamLines.join("\n");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 6 0 R >> /XObject << /Im1 7 0 R >> >> /Contents 5 0 R >>\nendobj\n",
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${stream.length} >>\nstream\n${stream}\nendstream\nendobj\n`,
    "6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n",
    `7 0 obj\n<< /Type /XObject /Subtype /Image /Width ${INVOICE_LOGO_WIDTH} /Height ${INVOICE_LOGO_HEIGHT} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter [/ASCIIHexDecode /DCTDecode] /Length ${INVOICE_LOGO_HEX.length + 1} >>\nstream\n${INVOICE_LOGO_HEX}>\nendstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((obj) => {
    offsets.push(pdf.length);
    pdf += obj;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return pdf;
};

export const generateInvoicePdf = async ({ userName, invoiceId, amount, country = "N/A" }) => {
  const dateText = new Date().toLocaleString();
  const pdfContent = buildPdf({ invoiceId, userName, amount, dateText, country });
  const filePath = `${RNFS.DocumentDirectoryPath}/${invoiceId}.pdf`;

  await RNFS.writeFile(filePath, pdfContent, "ascii");
  return filePath;
};
