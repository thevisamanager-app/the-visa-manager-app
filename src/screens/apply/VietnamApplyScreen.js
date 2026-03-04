import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Alert,
    Modal,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Calendar } from "react-native-calendars";
import { Picker } from "@react-native-picker/picker";
import { launchImageLibrary } from "react-native-image-picker";
import auth from "@react-native-firebase/auth";
import firestore, { serverTimestamp } from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import ScreenWrapper from "../../components/ScreenWrapper";
import {
    CoPassengerCard,
    ApplyCountryHeader,
} from "../../components/ApplyFlowCards";
import { extractPassportFrontPageFromAsset } from "../../utils/passportFrontPage";

import PassportFrontSample from "../../assets/examples/passport-front.png";
import PassportBackSample from "../../assets/examples/passport-back.png";
import PassportPhotoSample from "../../assets/examples/passportimage.png";
import TicketSample from "../../assets/examples/ticket.png";

const ORANGE = "#FF5C00";

/* ---------- reusable traveller factory ---------- */
const createTraveller = () => ({
    form: {
        travelDate: "",
        phone: "",
        email: "",
        hotelDetails: "",
    },
    documents: {
        passportFront: null,
        passportBack: null,
        photo: null,
        ticket: null,
    },
    frontPageData: null,
});

export default function VietnamApplyScreen({ navigation }) {
    /* ================= STATE ================= */

    const [travellers, setTravellers] = useState([
        { isPrimary: true, ...createTraveller() },
    ]);

    const [showCalendarFor, setShowCalendarFor] = useState(null);
    const [showCoTravellerModal, setShowCoTravellerModal] = useState(false);
    const [tempTraveller, setTempTraveller] = useState(createTraveller());
    const [visaEntryType, setVisaEntryType] = useState("");

    const formatDate = (date) => {
        const [y, m, d] = date.split("-");
        return `${d}/${m}/${y}`;
    };

    const getSample = (key) => {
        if (key === "passportFront") return PassportFrontSample;
        if (key === "passportBack") return PassportBackSample;
        if (key === "photo") return PassportPhotoSample;
        return TicketSample;
    };
    const getUploadUri = (file) => {
        if (!file) return null;
        return file.uri || file.fileCopyUri || file.localUri || null;
    };
    const getFileExtension = (file, fallback = "jpg") => {
        const fileName = file?.fileName || file?.name || "";
        if (fileName.includes(".")) {
            return fileName.split(".").pop().toLowerCase();
        }
        if (file?.type?.includes("/")) {
            return file.type.split("/")[1].toLowerCase();
        }
        return fallback;
    };
    const uploadFile = async (file, path) => {
        const uri = getUploadUri(file);
        if (!uri) throw new Error("Selected file URI is missing.");
        const ref = storage().ref(path);
        await ref.putFile(uri);
        return await ref.getDownloadURL();
    };

    const pickDocument = async (target, key) => {
        const isFrontPage = key === "passportFront";
        const res = await launchImageLibrary({
            mediaType: "photo",
            quality: 0.9,
            includeBase64: isFrontPage,
        });
        if (!res.assets?.[0]) return;
        const selectedAsset = res.assets[0];
        let frontPageData = null;

        if (isFrontPage && selectedAsset.base64) {
            try {
                frontPageData = await extractPassportFrontPageFromAsset(selectedAsset);
            } catch (error) {
                console.log("Vietnam front page OCR failed:", error);
            }
        }

        if (target === "main") {
            const updated = [...travellers];
            updated[0].documents[key] = selectedAsset;
            if (isFrontPage) updated[0].frontPageData = frontPageData;
            setTravellers(updated);
        } else {
            setTempTraveller((p) => ({
                ...p,
                documents: { ...p.documents, [key]: selectedAsset },
                ...(isFrontPage ? { frontPageData } : {}),
            }));
        }
    };

    const validateTraveller = (t) => {
        const { form, documents } = t;

        if (!form.travelDate || !form.phone || !form.email || !form.hotelDetails) {
            Alert.alert("Missing Info", "Please fill all details.");
            return false;
        }

        for (const v of Object.values(documents)) {
            if (!v) {
                Alert.alert("Missing Document", "Please upload all documents.");
                return false;
            }
        }

        return true;
    };

    const saveCoTraveller = () => {
        if (!validateTraveller(tempTraveller)) return;

        setTravellers((p) => [...p, { isPrimary: false, ...tempTraveller }]);
        setTempTraveller(createTraveller());
        setShowCoTravellerModal(false);
    };

    const submit = async () => {
        for (const t of travellers) {
            if (!validateTraveller(t)) return;
        }

        try {

            const user = auth().currentUser;

            if (!user) {
                Alert.alert("Login Required", "Please login first.");
                return;
            }

            const applicationId = `vietnam_${Date.now()}`;

            const formattedTravellers = await Promise.all(
                travellers.map(async (t, index) => {
                    const basePath = `applications/${user.uid}/${applicationId}/traveller_${index + 1}`;
                    const passportFrontPage =
                        t.frontPageData ||
                        (await extractPassportFrontPageFromAsset(t.documents.passportFront));

                    const passportFrontUrl = await uploadFile(
                        t.documents.passportFront,
                        `${basePath}/passport_front.${getFileExtension(t.documents.passportFront, "jpg")}`
                    );
                    const passportBackUrl = await uploadFile(
                        t.documents.passportBack,
                        `${basePath}/passport_back.${getFileExtension(t.documents.passportBack, "jpg")}`
                    );
                    const photoUrl = await uploadFile(
                        t.documents.photo,
                        `${basePath}/passport_photo.${getFileExtension(t.documents.photo, "jpg")}`
                    );
                    const ticketUrl = await uploadFile(
                        t.documents.ticket,
                        `${basePath}/air_ticket.${getFileExtension(t.documents.ticket, "pdf")}`
                    );

                    return {
                        isPrimary: t.isPrimary,
                        travelDate: t.form.travelDate,
                        passportNumber: passportFrontPage?.passportNumber || "",
                        phone: t.form.phone,
                        email: t.form.email,
                        visaEntryType: visaEntryType || "single",
                        hotelDetails: t.form.hotelDetails,
                        documents: {
                            passportFrontUrl,
                            passportBackUrl,
                            photoUrl,
                            ticketUrl,
                        },
                        passportFrontPage,
                    };
                })
            );

            await firestore()
                .collection("users")
                .doc(user.uid)
                .collection("passportData")
                .doc(applicationId)
                .set({
                    userId: user.uid,
                    country: "Vietnam",
                    travelDate: formattedTravellers[0]?.travelDate || "",
                    passportNumber: formattedTravellers[0]?.passportNumber || "",
                    visaEntryType: visaEntryType || "single",
                    travellers: formattedTravellers,
                    totalTravellers: formattedTravellers.length,
                    status: "submitted",
                    createdAt: serverTimestamp(),
                });

            navigation.navigate("CheckoutScreen", {
                country: "Vietnam",
                travellers,
                applicationId,
                visaEntryType: visaEntryType || "single",
            });
        } catch (error) {
            console.log("Submit Error:", error);
            Alert.alert("Error", "Unable to submit application. Please try again.");
        }
    };

    const renderForm = (traveller, onChange, target) => (
        <>
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowCalendarFor(target)}
            >
                <Text
                    style={
                        traveller.form.travelDate
                            ? styles.inputText
                            : styles.inputPlaceholder
                    }
                >
                    {traveller.form.travelDate
                        ? formatDate(traveller.form.travelDate)
                        : "Select Travel Date"}
                </Text>
            </TouchableOpacity>

            <TextInput
                placeholder="Mobile Number"
                style={styles.input}
                keyboardType="phone-pad"
                value={traveller.form.phone}
                onChangeText={(v) => onChange("phone", v)}
                placeholderTextColor="#000000"
            />

            <TextInput
                placeholder="Email ID"
                style={styles.input}
                value={traveller.form.email}
                onChangeText={(v) => onChange("email", v)}
                placeholderTextColor="#000000"
            />

            <View style={styles.pickerWrap}>
                <Picker
                    selectedValue={visaEntryType}
                    onValueChange={(v) => setVisaEntryType(v)}
                    style={styles.picker}
                >
                    <Picker.Item label="Select Entry Type" value="" />
                    <Picker.Item label="Single Entry" value="single" />
                    <Picker.Item label="Multiple Entry" value="multiple" />
                </Picker>
            </View>

            <TextInput
                placeholder="Hotel Name & Address"
                style={[styles.input, styles.textArea]}
                multiline
                value={traveller.form.hotelDetails}
                onChangeText={(v) => onChange("hotelDetails", v)}
                placeholderTextColor="#000000"
            />

            {[
                { key: "passportFront", label: "Upload Passport Front Page" },
                { key: "passportBack", label: "Upload Passport Back Page" },
                { key: "photo", label: "Passport Size Photo" },
                { key: "ticket", label: "Upload Return Ticket" },
            ].map(({ key, label }) => (
                <View key={key} style={styles.docCard}>
                    <Text style={styles.docLabel}>{label} *</Text>

                    {!traveller.documents[key] ? (
                        <View style={styles.sampleWrapper}>
                            <Image
                                source={getSample(key)}
                                style={styles.sampleImage}
                                resizeMode="contain"
                            />
                        </View>
                    ) : (
                        <Image
                            source={{ uri: traveller.documents[key].uri }}
                            style={styles.previewImage}
                        />
                    )}

                    <TouchableOpacity
                        style={styles.uploadBtn}
                        onPress={() => pickDocument(target, key)}
                    >
                        <Text style={styles.uploadText}>
                            {traveller.documents[key]
                                ? "Replace Document"
                                : "Upload Document"}
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </>
    );

    return (
        <ScreenWrapper>
            <ScrollView contentContainerStyle={styles.container}>
                {/* HEADER */}
                <ApplyCountryHeader navigation={navigation} countryName="Vietnam" />

        <View style={styles.formCard}>
                {renderForm(
                    travellers[0],
                    (k, v) => {
                        const updated = [...travellers];
                        updated[0].form[k] = v;
                        setTravellers(updated);
                    },
                    "main"
                )}
        </View>
                <CoPassengerCard
                    coTravellerCount={Math.max(0, travellers.length - 1)}
                    onAddPress={() => setShowCoTravellerModal(true)}
                />

                <TouchableOpacity style={styles.submitBtn} onPress={submit}>
                    <Text style={styles.submitText}>Complete Process</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* Co Traveller Modal */}
            <Modal visible={showCoTravellerModal} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => setShowCoTravellerModal(false)}>
                                <Ionicons name="chevron-back" size={26} />
                            </TouchableOpacity>

                            <Text style={styles.headerTitle}>Add Co-Traveller</Text>

                            <TouchableOpacity
                                onPress={() => {
                                    setShowCoTravellerModal(false);
                                    navigation.navigate("Tabs", { screen: "Destination" });
                                }}
                            >
                                <Ionicons name="home-outline" size={24} color={ORANGE} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView>
                            {renderForm(
                                tempTraveller,
                                (k, v) =>
                                    setTempTraveller((p) => ({
                                        ...p,
                                        form: { ...p.form, [k]: v },
                                    })),
                                "co"
                            )}
                        </ScrollView>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => setShowCoTravellerModal(false)}
              >
                <Text style={styles.closeBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={saveCoTraveller}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
                    </View>
                </View>
            </Modal>

            {/* CALENDAR */}
            <Modal visible={!!showCalendarFor} transparent>
                <View style={styles.calendarOverlay}>
                    <View style={styles.calendarBox}>
                        <Calendar
                            minDate={new Date().toISOString().split("T")[0]}
                            onDayPress={(day) => {
                                if (showCalendarFor === "main") {
                                    const updated = [...travellers];
                                    updated[0].form.travelDate = day.dateString;
                                    setTravellers(updated);
                                } else {
                                    setTempTraveller((p) => ({
                                        ...p,
                                        form: { ...p.form, travelDate: day.dateString },
                                    }));
                                }
                                setShowCalendarFor(null);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </ScreenWrapper>
    );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    container: { padding: 16, paddingBottom: 40 },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    marginTop: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 2,
  },
  header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerIconBtn: {
        width: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    headerCenterCard: {
        flex: 1,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: "#F2DCC6",
        borderRadius: 18,
        backgroundColor: "#F5EFE8",
        minHeight: 62,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
    headerFlagBubble: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: ORANGE,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },
    headerFlagText: {
        fontSize: 18,
    },
    headerTextWrap: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerCountryName: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
        textAlign: "center",
    },
    headerSubText: {
        marginTop: 2,
        fontSize: 13,
        fontWeight: "600",
        color: "#374151",
        textAlign: "center",
    },

    headerTitle: { fontSize: 17, fontWeight: "800" },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        marginBottom: 16,
        textAlign: "center",      // 👈 center it
    },

    input: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
        color: "#111827",
        backgroundColor: "#FFFFFF",
    },
    inputText: {
        color: "#111827",
    },
    inputPlaceholder: {
        color: "#000000",
    },
    pickerWrap: {
        borderWidth: 1,
        borderColor: "#CBD5E1",
        borderRadius: 10,
        marginBottom: 12,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
    },
    picker: {
        color: "#111827",
    },

    textArea: { height: 90 },

    docCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        elevation: 2,
    },

    docHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6,
    },

    docLabel: {
        fontWeight: "600",
        fontSize: 14,
        textAlign: "center",   // 👈 center text
        marginBottom: 8,
    },

    sampleBadge: {
        fontSize: 11,
        fontWeight: "600",
        color: "#666",
    },

    sampleWrapper: {
        backgroundColor: "#F8FAFC",
        borderRadius: 10,
        padding: 6,
        marginBottom: 8,
    },

    sampleImage: {
        height: 95,
        width: "100%",
    },

    previewImage: {
        height: 110,
        borderRadius: 10,
        marginBottom: 8,
    },

    uploadBtn: {
        borderWidth: 1,
        borderColor: ORANGE,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
    },

    uploadText: { color: ORANGE, fontWeight: "800" },

    addTravellerBtn: {
        borderWidth: 1,
        borderColor: ORANGE,
        borderRadius: 999,
        paddingVertical: 14,
        alignItems: "center",
        marginVertical: 16,
    },

    addTravellerText: { color: ORANGE, fontWeight: "800" },

    submitBtn: {
        backgroundColor: ORANGE,
        borderRadius: 999,
        paddingVertical: 16,
        alignItems: "center",
    },

    submitText: { color: "#fff", fontWeight: "800", fontSize: 16 },

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        justifyContent: "center",
    },

    modalBox: {
        backgroundColor: "#FFFFFF",
        margin: 20,
        borderRadius: 16,
        padding: 16,
        maxHeight: "90%",
    },

    modalHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },

    modalTitle: { fontSize: 16, fontWeight: "800" },

    calendarOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
    },

    calendarBox: {
        backgroundColor: "#FFFFFF",
        margin: 20,
        borderRadius: 16,
        padding: 12,
    },
  modalActions: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  closeBtn: {
    borderWidth: 1,
    borderColor: ORANGE,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },
  closeBtnText: {
    color: ORANGE,
    fontWeight: "800",
  },
  saveBtn: {
    backgroundColor: ORANGE,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    minWidth: 90,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "800",
  },
});


