export function parseMRZ(text) {
  const lines = text.split("\n").map((l) => l.trim());

  const mrzLines = lines.filter((l) => l.length >= 44);

  if (mrzLines.length < 2) {
    throw new Error("MRZ not detected");
  }

  const L1 = mrzLines[0];
  const L2 = mrzLines[1];

  const nameSeparatorIndex = L1.indexOf("<<");
  const rawLastName =
    nameSeparatorIndex >= 0 ? L1.substring(5, nameSeparatorIndex) : L1.substring(5);
  const rawGivenName = nameSeparatorIndex >= 0 ? L1.substring(nameSeparatorIndex + 2) : "";

  return {
    documentType: L1[0],
    issuingCountry: L1.substring(2, 5),
    lastName: rawLastName.replace(/</g, ""),
    firstName: rawGivenName.replace(/</g, ""),

    passportNumber: L2.substring(0, 9).replace(/</g, ""),
    nationality: L2.substring(10, 13),

    birthDate: L2.substring(13, 19),
    gender: L2[20],

    expiryDate: L2.substring(21, 27),
  };
}
