import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const SCHENGEN_SHEET_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwRk-9sSh-EFT0tsMVD1BdY8BoU6QRf0-nPFaQqydN7HGyc8SHFQN0XMQ440LlkFWWE/exec";

const toSchengenNestedPayload = (data = {}) => {
  const nested = {};
  Object.entries(data || {}).forEach(([key, value]) => {
    nested[`schengen.${key}`] = value;
  });
  return nested;
};

const postSchengenDataToGoogleSheet = async ({ user, countryName, data }) => {
  try {
    const payload = {
      type: "schengen_flow",
      submittedAt: new Date().toISOString(),
      userId: user?.uid || "",
      userEmail: user?.email || "",
      countryName: countryName || "Schengen",
      schengenData: data || {},
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    await fetch(SCHENGEN_SHEET_APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
  } catch (error) {
    console.log("Schengen Google Sheet sync failed:", error);
  }
};

export const saveSchengenData = async (countryName, data) => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const writeResult = await firestore()
    .collection("users")
    .doc(user.uid)
    .collection("passportData")
    .doc(countryName)
    .set(
      {
        countryType: "Schengen",
        userId: user.uid,
        ...toSchengenNestedPayload(data),
        updatedAt: Date.now(),
      },
      { merge: true }
    );

  await postSchengenDataToGoogleSheet({ user, countryName, data });

  return writeResult;
};
