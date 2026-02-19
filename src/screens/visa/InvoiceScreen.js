import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { getAuth } from "@react-native-firebase/auth/lib/modular";
import FileViewer from "react-native-file-viewer";

import { generateInvoicePdf } from "../../api/invoice/generateInvoicePdf";
import { uploadInvoiceToFirebase } from "../../api/invoice/uploadInvoice";
import { saveInvoiceRecord } from "../../api/invoice/saveInvoiceRecord";

export default function InvoiceScreen({ route }) {
  const [loading, setLoading] = useState(false);

  const handleGenerateInvoice = async () => {
    try {
      setLoading(true);

      const auth = getAuth();
      const user = auth.currentUser;
      if (!user?.uid) {
        throw new Error("Please login first to download invoice.");
      }

      const userId = user.uid;
      const invoiceId = `INV${Date.now()}`;
      const userName = user.displayName || "Customer";
      const amount = Number(route?.params?.amount || 1500);

      const pdfPath = await generateInvoicePdf({ userName, invoiceId, amount });
      const url = await uploadInvoiceToFirebase(pdfPath, invoiceId, userId);

      let saveResult = { ok: true };
      try {
        saveResult = await saveInvoiceRecord(userId, invoiceId, url, amount);
      } catch (saveErr) {
        console.log("Invoice save skipped:", saveErr?.code || saveErr?.message || saveErr);
        saveResult = { ok: false, reason: "save-error" };
      }

      if (saveResult?.ok === false) {
        console.log("Invoice history save restricted by rules.");
      }
      await FileViewer.open(pdfPath);
    } catch (err) {
      console.log("Invoice Error:", err);
      Alert.alert("Error", err?.message || "Failed to create invoice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handleGenerateInvoice}>
        <Text style={styles.txt}>{loading ? "Generating..." : "Download Invoice"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:"center", alignItems:"center" },
  btn: { backgroundColor:"#FF5C00", padding:16, borderRadius:10 },
  txt: { color:"#fff", fontWeight:"700", fontSize:18 }
});

