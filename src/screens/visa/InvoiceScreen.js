import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import FileViewer from "react-native-file-viewer";

import { generateInvoicePdf } from "../../api/invoice/generateInvoicePdf";
import { uploadInvoiceToFirebase } from "../../api/invoice/uploadInvoice";
import { saveInvoiceRecord } from "../../api/invoice/saveInvoiceRecord"

export default function InvoiceScreen() {
  const [loading, setLoading] = useState(false);

  const handleGenerateInvoice = async () => {
    try {
      setLoading(true);

      const userId = auth().currentUser.uid;
      const invoiceId = `INV${Date.now()}`;
      const userName = "Yash Tupe";
      const amount = 1500;

      const pdfPath = await generateInvoicePdf({ userName, invoiceId, amount });
      const url = await uploadInvoiceToFirebase(pdfPath, invoiceId, userId);

      await saveInvoiceRecord(userId, invoiceId, url, amount);

      setLoading(false);
      Alert.alert("Success", "Invoice created and uploaded!");
      FileViewer.open(pdfPath);
      
    } catch (err) {
      setLoading(false);
      console.log("Invoice Error:", err);
      Alert.alert("Error", "Failed to create invoice");
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
