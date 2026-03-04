import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Modal,
  Image,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import DESTINATIONS from "../assets/data/destinations";

const ORANGE = "#FF5C00";
const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 28, 560);
const COUNTRY_CODE_OPTIONS = [
  { label: "India (+91)", value: "+91" },
  { label: "USA (+1)", value: "+1" },
  { label: "UK (+44)", value: "+44" },
  { label: "UAE (+971)", value: "+971" },
  { label: "Saudi (+966)", value: "+966" },
  { label: "Qatar (+974)", value: "+974" },
  { label: "Kuwait (+965)", value: "+965" },
  { label: "Oman (+968)", value: "+968" },
  { label: "Bahrain (+973)", value: "+973" },
  { label: "Singapore (+65)", value: "+65" },
  { label: "Malaysia (+60)", value: "+60" },
  { label: "Thailand (+66)", value: "+66" },
  { label: "Vietnam (+84)", value: "+84" },
  { label: "Indonesia (+62)", value: "+62" },
  { label: "Philippines (+63)", value: "+63" },
  { label: "Australia (+61)", value: "+61" },
  { label: "New Zealand (+64)", value: "+64" },
  { label: "Canada (+1)", value: "+1" },
];
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyvuhm5CnMvk7QwU6i_H34SOHPRN254g8V_Qq_PRWSmf9GCqXI973J_pQCBVvBKKGf6/exec";

export default function EnquiryNowScreen() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [bookCallModalVisible, setBookCallModalVisible] = useState(false);
  const [confirmedModalVisible, setConfirmedModalVisible] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [touched, setTouched] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitMessageType, setSubmitMessageType] = useState("success");
  const [form, setForm] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    visaCountry: "",
    query: "",
  });

  const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

  const destinationOptions = useMemo(() => {
    const unique = Array.from(
      new Set(
        (DESTINATIONS || [])
          .map((item) => String(item.countrName || "").trim())
          .filter(Boolean)
      )
    );
    return unique.sort((a, b) => a.localeCompare(b));
  }, []);

  const errors = useMemo(() => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.phone.trim()) next.phone = "Please enter phone number.";
    if (!form.visaCountry.trim()) {
      next.visaCountry = "Please select a destination country.";
    }
    if (!form.query.trim()) next.query = "Please enter your detailed query.";
    return next;
  }, [form]);

  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const showError = (key) => touched[key] && errors[key];

  const openWhatsApp = async () => {
    const message = encodeURIComponent("Hi, I want to discuss my visa strategy call.");
    const url = `https://wa.me/919999999999?text=${message}`;
    try {
      await Linking.openURL(url);
    } catch (_error) {}
  };

  const handleBookAppointment = () => {
    if (!appointmentDate.trim() || !appointmentTime.trim()) {
      setSubmitMessageType("error");
      setSubmitMessage("Please select date and time for appointment.");
      return;
    }
    setBookCallModalVisible(false);
    setConfirmedModalVisible(true);
  };

  const submit = async () => {
    if (loading) return;

    const invalidKeys = Object.keys(errors);
    if (invalidKeys.length > 0) {
      const touchedMap = {};
      invalidKeys.forEach((k) => {
        touchedMap[k] = true;
      });
      setTouched((prev) => ({ ...prev, ...touchedMap }));
      setSubmitMessageType("error");
      setSubmitMessage(errors[invalidKeys[0]]);
      return;
    }

    try {
      setLoading(true);
      setSubmitMessageType("success");
      setSubmitMessage("Submitting your enquiry...");
      const payload = {
        type: "visa_enquiry",
        submittedAt: new Date().toISOString(),
        name: form.name.trim(),
        countryCode: form.countryCode,
        phone: form.phone.trim(),
        visaCountry: form.visaCountry.trim(),
        query: form.query.trim(),
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);
      const res = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setTouched({});
        setForm({
          name: "",
          countryCode: "+91",
          phone: "",
          visaCountry: "",
          query: "",
        });
        setSubmitMessageType("success");
        setSubmitMessage("Our team will call you shortly.");
        setAppointmentDate("");
        setAppointmentTime("");
        setBookCallModalVisible(true);
        return;
      }

      setSubmitMessageType("error");
      setSubmitMessage("Submission failed. Please try again.");
    } catch (_err) {
      setSubmitMessageType("error");
      setSubmitMessage("Network is slow. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { paddingBottom: Math.max(28, insets.bottom + 92) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroBadgeWrap}>
            <Icon name="sparkles-outline" size={14} color={ORANGE} />
            <Text style={styles.badge}>ENQUIRY NOW</Text>
          </View>
          <Text style={styles.title}>Need Help With Your Visa?</Text>
          <Text style={styles.subTitle}>Share your query and our team will contact you quickly.</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.formHeader}>
            <Icon name="chatbubbles-outline" size={18} color={ORANGE} />
            <Text style={styles.formHeaderText}>Tell us your travel requirement</Text>
          </View>

          <View style={[styles.inputWrap, showError("name") ? styles.inputError : null]}>
            <Icon name="person-outline" size={18} color="#94A3B8" />
            <TextInput
              placeholder="Name"
              placeholderTextColor="#94A3B8"
              style={styles.input}
              value={form.name}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              onChangeText={(v) => update("name", v)}
            />
          </View>
          {showError("name") ? <Text style={styles.errorText}>{errors.name}</Text> : null}

          <View style={styles.phoneRow}>
            <View style={[styles.inputWrap, styles.codeWrap]}>
              <Text style={styles.codeLabel}>Code</Text>
              <Text style={styles.selectedCodeText}>{form.countryCode}</Text>
              <Picker
                selectedValue={form.countryCode}
                onValueChange={(v) => update("countryCode", v)}
                style={styles.codePicker}
                dropdownIconColor="#64748B"
              >
                {COUNTRY_CODE_OPTIONS.map((opt) => (
                  <Picker.Item
                    key={`${opt.label}-${opt.value}`}
                    label={opt.label}
                    value={opt.value}
                    color={opt.value === form.countryCode ? "#0F172A" : "#FFFFFF"}
                  />
                ))}
              </Picker>
            </View>
            <View style={[styles.inputWrap, styles.phoneWrap, showError("phone") ? styles.inputError : null]}>
              <Icon name="call-outline" size={17} color="#94A3B8" />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#94A3B8"
                style={styles.input}
                keyboardType="phone-pad"
                value={form.phone}
                onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                onChangeText={(v) => update("phone", v)}
              />
            </View>
          </View>
          {showError("phone") ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <View style={[styles.pickerWrap, showError("visaCountry") ? styles.inputError : null]}>
            <Icon name="earth-outline" size={18} color="#94A3B8" />
            <Picker
              selectedValue={form.visaCountry}
              onValueChange={(v) => {
                update("visaCountry", v);
                setTouched((prev) => ({ ...prev, visaCountry: true }));
              }}
              style={styles.picker}
              dropdownIconColor="#64748B"
            >
              <Picker.Item label="Need Visa For" value="" color="#FFFFFF" />
              {destinationOptions.map((country) => (
                <Picker.Item key={country} label={country} value={country} color="#FFFFFF" />
              ))}
            </Picker>
          </View>
          {showError("visaCountry") ? <Text style={styles.errorText}>{errors.visaCountry}</Text> : null}

          <View style={[styles.queryBox, showError("query") ? styles.inputError : null]}>
            <Text style={styles.queryLabel}>Your Detailed Query</Text>
            <TextInput
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              value={form.query}
              onBlur={() => setTouched((prev) => ({ ...prev, query: true }))}
              onChangeText={(v) => update("query", v)}
              style={styles.queryInput}
              placeholder=""
              placeholderTextColor="#94A3B8"
            />
          </View>
          {showError("query") ? <Text style={styles.errorText}>{errors.query}</Text> : null}

          <TouchableOpacity style={styles.submitBtn} onPress={submit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.submitText}>Submit Enquiry</Text>
                <Icon name="arrow-forward" size={18} color="#fff" />
              </>
            )}
          </TouchableOpacity>

          {submitMessage ? (
            <Text
              style={[
                styles.submitMessage,
                submitMessageType === "error"
                  ? styles.submitMessageError
                  : styles.submitMessageSuccess,
              ]}
            >
              {submitMessage}
            </Text>
          ) : null}

          <View style={styles.trustCard}>
            <View style={styles.noteRow}>
              <Icon name="lock-closed" size={14} color="#64748B" />
              <Text style={styles.noteText}>Your information is secure and confidential</Text>
            </View>
            <View style={[styles.noteRow, { marginTop: 8 }]}>
              <Icon name="shield-checkmark-outline" size={14} color="#64748B" />
              <Text style={styles.noteText}>Trusted by 10,000+ travellers</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={bookCallModalVisible} transparent animationType="fade" onRequestClose={() => setBookCallModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setBookCallModalVisible(false)}>
              <Icon name="close" size={20} color="#1E3A5F" />
            </TouchableOpacity>

            <View style={styles.modalBodyRow}>
              <View style={styles.modalLeft}>
                <Text style={styles.modalTitle}>Book Strategy Call</Text>
                <Text style={styles.modalSubTitle}>Speak with our expert and get a personalized visa strategy.</Text>

                <Text style={styles.fieldLabel}>Select Date</Text>
                <View style={styles.modalInputWrap}>
                  <TextInput
                    value={appointmentDate}
                    onChangeText={setAppointmentDate}
                    placeholder="dd-mm-yyyy"
                    placeholderTextColor="#94A3B8"
                    style={styles.modalInput}
                  />
                  <Icon name="calendar-outline" size={18} color="#0F172A" />
                </View>

                <Text style={styles.fieldLabel}>Select Time</Text>
                <View style={styles.modalPickerWrap}>
                  <Picker
                    selectedValue={appointmentTime}
                    onValueChange={setAppointmentTime}
                    style={styles.modalPicker}
                    dropdownIconColor="#0F172A"
                  >
                    <Picker.Item label="Choose a time slot" value="" color="#475569" />
                    {timeSlots.map((slot) => (
                      <Picker.Item key={slot} label={slot} value={slot} color="#0F172A" />
                    ))}
                  </Picker>
                </View>

                <TouchableOpacity style={styles.primaryModalBtn} onPress={handleBookAppointment}>
                  <Text style={styles.primaryModalBtnText}>Book My Appointment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.waOutlineBtn} onPress={openWhatsApp}>
                  <Text style={styles.waOutlineBtnText}>Message Us on WhatsApp</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalImagePanel}>
                <Image source={require("../assets/examples/book-strategy-call.png")} style={styles.modalImage} resizeMode="cover" />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={confirmedModalVisible} transparent animationType="fade" onRequestClose={() => setConfirmedModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.confirmCard}>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setConfirmedModalVisible(false)}>
              <Icon name="close" size={20} color="#1E3A5F" />
            </TouchableOpacity>

            <Text style={styles.confirmTitle}>Your Appointment is Confirmed!</Text>
            <Text style={styles.confirmSubTitle}>Your profile evaluation call is scheduled. Check your email for details.</Text>

            <View style={styles.confirmInfoRow}>
              <Text style={styles.confirmInfoLabel}>Selected date</Text>
              <Text style={styles.confirmInfoValue}>{appointmentDate}</Text>
            </View>
            <View style={styles.confirmInfoRow}>
              <Text style={styles.confirmInfoLabel}>Selected time</Text>
              <Text style={styles.confirmInfoValue}>{appointmentTime}</Text>
            </View>

            <View style={styles.confirmImageWrap}>
              <Image source={require("../assets/examples/appointment-confirmed.png")} style={styles.confirmImage} resizeMode="cover" />
            </View>

            <TouchableOpacity style={styles.waOutlineBtn} onPress={openWhatsApp}>
              <Text style={styles.waOutlineBtnText}>Message Us on WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeDarkBtn} onPress={() => setConfirmedModalVisible(false)}>
              <Text style={styles.closeDarkBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 28,
    backgroundColor: "#F7F8FC",
  },
  heroCard: {
    width: CARD_WIDTH,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#FFFFFF",
    padding: 14,
    marginBottom: 10,
  },
  heroBadgeWrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#FFDCC8",
    backgroundColor: "#FFF4ED",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  badge: {
    letterSpacing: 1.2,
    fontSize: 11,
    color: ORANGE,
    fontWeight: "700",
  },
  title: {
    marginTop: 10,
    fontSize: SCREEN_WIDTH < 370 ? 24 : 28,
    lineHeight: SCREEN_WIDTH < 370 ? 30 : 34,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "left",
  },
  subTitle: {
    marginTop: 8,
    textAlign: "left",
    color: "#64748B",
    fontSize: 14,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  formHeaderText: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "700",
  },
  inputWrap: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: "#0F172A",
    fontSize: 15,
  },
  phoneRow: {
    flexDirection: "row",
    gap: 10,
  },
  codeWrap: {
    width: 118,
    alignItems: "flex-start",
    paddingTop: 6,
    position: "relative",
  },
  codeLabel: {
    fontSize: 11,
    color: ORANGE,
    marginBottom: 2,
  },
  codePicker: {
    width: "100%",
    marginLeft: -8,
    color: "transparent",
    fontSize: 13,
  },
  selectedCodeText: {
    position: "absolute",
    left: 12,
    top: 22,
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "600",
    zIndex: 1,
    pointerEvents: "none",
  },
  phoneWrap: {
    flex: 1,
  },
  pickerWrap: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    paddingLeft: 12,
    paddingRight: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    flex: 1,
    color: "#0F172A",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  errorText: {
    color: "#EF4444",
    marginTop: 4,
    marginBottom: 8,
    fontSize: 12,
  },
  queryBox: {
    marginTop: 2,
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#FDBA74",
    padding: 10,
  },
  queryLabel: {
    color: ORANGE,
    fontSize: 15,
    marginBottom: 6,
  },
  queryInput: {
    minHeight: 96,
    color: "#0F172A",
    fontSize: 15,
  },
  submitBtn: {
    marginTop: 12,
    backgroundColor: ORANGE,
    borderRadius: 999,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  submitMessage: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
  },
  submitMessageSuccess: {
    color: "#059669",
  },
  submitMessageError: {
    color: "#EF4444",
  },
  trustCard: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    padding: 10,
  },
  noteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  noteText: {
    color: "#475569",
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  modalCard: {
    width: "100%",
    maxWidth: 760,
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#C8D6EA",
    padding: 12,
  },
  modalCloseBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E7EDF7",
    zIndex: 2,
  },
  modalBodyRow: {
    flexDirection: SCREEN_WIDTH < 760 ? "column" : "row",
    gap: 12,
  },
  modalLeft: {
    flex: 1,
    paddingTop: 4,
  },
  modalTitle: {
    color: "#1E3A5F",
    fontSize: SCREEN_WIDTH < 760 ? 30 : 38,
    fontWeight: "800",
    lineHeight: SCREEN_WIDTH < 760 ? 34 : 44,
    marginBottom: 8,
  },
  modalSubTitle: {
    color: "#3E5D86",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  fieldLabel: {
    color: "#1E3A5F",
    fontSize: SCREEN_WIDTH < 760 ? 24 : 32,
    fontWeight: "700",
    marginBottom: 6,
  },
  modalInputWrap: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#BACCE6",
    borderRadius: 14,
    backgroundColor: "#EFF4FC",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  modalInput: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
  },
  modalPickerWrap: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#BACCE6",
    borderRadius: 14,
    backgroundColor: "#EFF4FC",
    justifyContent: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  modalPicker: {
    color: "#0F172A",
  },
  primaryModalBtn: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#2F8B45",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  primaryModalBtnText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  waOutlineBtn: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#9FD3A8",
    backgroundColor: "#EFFAF1",
    alignItems: "center",
    justifyContent: "center",
  },
  waOutlineBtnText: {
    color: "#1F8A3D",
    fontSize: 15,
    fontWeight: "700",
  },
  modalImagePanel: {
    width: SCREEN_WIDTH < 760 ? "100%" : 300,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C8D6EA",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    minHeight: 190,
  },
  modalImage: {
    width: "100%",
    height: "100%",
    minHeight: 190,
  },
  confirmCard: {
    width: "100%",
    maxWidth: 760,
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#C8D6EA",
    padding: 12,
    position: "relative",
  },
  confirmTitle: {
    color: "#1E3A5F",
    fontSize: SCREEN_WIDTH < 760 ? 22 : 34,
    fontWeight: "800",
    marginTop: 16,
    marginBottom: 8,
    lineHeight: SCREEN_WIDTH < 760 ? 30 : 42,
  },
  confirmSubTitle: {
    color: "#3E5D86",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  confirmInfoRow: {
    minHeight: 50,
    borderWidth: 1,
    borderColor: "#BACCE6",
    borderRadius: 12,
    backgroundColor: "#EFF4FC",
    paddingHorizontal: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  confirmInfoLabel: {
    color: "#4A6790",
    fontSize: 14,
    fontWeight: "600",
  },
  confirmInfoValue: {
    color: "#1E3A5F",
    fontSize: 15,
    fontWeight: "800",
  },
  confirmImageWrap: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C8D6EA",
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginBottom: 10,
  },
  confirmImage: {
    width: "100%",
    height: SCREEN_WIDTH < 760 ? 160 : 220,
  },
  closeDarkBtn: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#173B63",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  closeDarkBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});
