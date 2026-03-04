import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  Modal,
  Linking,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";
import ScreenWrapper from "../../components/ScreenWrapper";
import { saveSchengenData } from "../../api/user/saveSchengenData";
import { fetchGoogleReviews } from "../../services/reviews/googleReviews";

import FranceImage from "../../assets/images/France.webp";
import ItalyImage from "../../assets/images/Italy.webp";
import SpainImage from "../../assets/images/Spain.webp";


const ORANGE = "#FF7A1A";
const NAVY = "#08224A";
const CARD_BG = "#F8FAFC";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const IS_SMALL_SCREEN = SCREEN_WIDTH <= 380;

const SCHENGEN_COUNTRIES = [
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Iceland",
  "Italy",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
];

const OCCUPATIONS = [
  "Salaried",
  "Self Employed",
  "Business Owner",
  "Student",
  "Retired",
  "Freelancer",
  "Homemaker",
];

const INCOME_RANGES = [
  "Below 25,000 INR",
  "25,000 - 50,000 INR",
  "50,000 - 1,00,000 INR",
  "1,00,000 - 2,00,000 INR",
  "Above 2,00,000 INR",
];

const YES_NO_OPTIONS = ["Yes", "No"];

const WHY_ITEMS = [
  { icon: "work-outline", title: "Offline Process", color: "#F59E0B" },
  { icon: "shield-checkmark-outline", title: "Embassy Decisions", color: "#3B82F6" },
  { icon: "cash-outline", title: "Funds Check", color: "#22C55E" },
  { icon: "earth-outline", title: "Travel History", color: "#8B5CF6" },
  { icon: "document-text-outline", title: "Smart Documents", color: "#06B6D4" },
];

const PROCESS_STEPS = [
  { label: "1.", title: "Profile Check", color: "#1D4ED8", icon: "person-outline" },
  { label: "2.", title: "Docs Plan", color: "#D97706", icon: "briefcase-outline" },
  { label: "3.", title: "Book Slot", color: "#16A34A", icon: "calendar-outline" },
  { label: "4.", title: "File Build", color: "#6D28D9", icon: "folder-open-outline" },
  { label: "5.", title: "Final Submission", color: "#0F766E", icon: "paper-plane-outline" },
];

const STORY_TABS = [
  { key: "approved", title: "5,000+ Visas Approved", image: FranceImage },
  { key: "reviews", title: "850+ Client Reviews", image: ItalyImage },
  { key: "refusal", title: "From Refusal to Approval!", image: SpainImage },
];
const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];
const WHATSAPP_NUMBER = "919834009321";

const cleanPhone = (value = "") => value.replace(/[^\d]/g, "").slice(0, 12);
const normalizeCountryKey = (value = "") =>
  String(value).toLowerCase().replace(/[^a-z]/g, "");
const ymdToDDMMYYYY = (value = "") => {
  const [y, m, d] = String(value).split("-");
  if (!y || !m || !d) return "";
  return `${d}-${m}-${y}`;
};
const ddmmyyyyToYMD = (value = "") => {
  const [d, m, y] = String(value).split("-");
  if (!d || !m || !y) return "";
  return `${y}-${m}-${d}`;
};

const HERO_IMAGE_BY_COUNTRY = {
  austria: require("../../assets/images/Austria.webp"),
  belgium: require("../../assets/images/Belgium.webp"),
  bulgaria: require("../../assets/images/Bulgaria.webp"),
  croatia: require("../../assets/images/Croatia.webp"),
  czechrepublic: require("../../assets/images/Czechia.webp"),
  czechia: require("../../assets/images/Czechia.webp"),
  denmark: require("../../assets/images/Denmark.webp"),
  estonia: require("../../assets/images/Estonia.webp"),
  finland: require("../../assets/images/Finland.webp"),
  france: require("../../assets/images/France.webp"),
  germany: require("../../assets/images/Germany.webp"),
  greece: require("../../assets/images/Greece.webp"),
  hungary: require("../../assets/images/Hungary.webp"),
  iceland: require("../../assets/images/Iceland.webp"),
  italy: require("../../assets/images/Italy.webp"),
  latvia: require("../../assets/images/Latvia.webp"),
  liechtenstein: require("../../assets/images/Liechtenstein.webp"),
  lithuania: require("../../assets/images/Lithuania.webp"),
  luxembourg: require("../../assets/images/Luxembourg.webp"),
  malta: require("../../assets/images/Malta.webp"),
  netherlands: require("../../assets/images/Netherland.webp"),
  netherland: require("../../assets/images/Netherland.webp"),
  norway: require("../../assets/images/Norway.webp"),
  poland: require("../../assets/images/Poland.webp"),
  portugal: require("../../assets/images/Portugal.webp"),
  romania: require("../../assets/images/Romania.webp"),
  slovakia: require("../../assets/images/Slovakia.webp"),
  slovenia: require("../../assets/images/Slovenia.webp"),
  spain: require("../../assets/images/Spain.webp"),
  sweden: require("../../assets/images/Sweden.webp"),
  switzerland: require("../../assets/images/Switzerland.webp"),
};

export default function SchengenFlowScreen({ navigation, route }) {
  const country = route?.params?.country || "Schengen";
  const destinationCountry =
    route?.params?.destination?.countrName ||
    route?.params?.selectedCountry ||
    country;
  const scrollRef = useRef(null);
  const formOffsetRef = useRef(0);
  const whyScrollRef = useRef(null);
  const processScrollRef = useRef(null);
  const autoScrollIndexRef = useRef({ why: 0, process: 0 });

  const [form, setForm] = useState({
    destinationCountry: "",
    travelDate: "",
    occupation: "",
    incomeRange: "",
    previousInternationalTravel: "",
    pastVisaRejections: "",
    email: "",
    phone: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const [activeStoryTab, setActiveStoryTab] = useState("approved");
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmedModal, setShowConfirmedModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentError, setAppointmentError] = useState({});
  const [showTravelDateCalendar, setShowTravelDateCalendar] = useState(false);
  const [showAppointmentDateCalendar, setShowAppointmentDateCalendar] = useState(false);

  const loadGoogleReviews = async () => {
    setLoadingReviews(true);
    try {
      const data = await fetchGoogleReviews();
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      console.log("Schengen reviews fetch error:", e);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadGoogleReviews();
  }, []);

  useEffect(() => {
    const whyStep = IS_SMALL_SCREEN ? 154 : 170;
    const processStep = IS_SMALL_SCREEN ? 112 : 118;
    const interval = setInterval(() => {
      autoScrollIndexRef.current.why =
        autoScrollIndexRef.current.why >= WHY_ITEMS.length - 1
          ? 0
          : autoScrollIndexRef.current.why + 1;
      autoScrollIndexRef.current.process =
        autoScrollIndexRef.current.process >= PROCESS_STEPS.length - 1
          ? 0
          : autoScrollIndexRef.current.process + 1;

      whyScrollRef.current?.scrollTo({
        x: autoScrollIndexRef.current.why * whyStep,
        animated: true,
      });
      processScrollRef.current?.scrollTo({
        x: autoScrollIndexRef.current.process * processStep,
        animated: true,
      });
    }, 2600);

    return () => clearInterval(interval);
  }, []);

  const handleStoryTabPress = (tabKey) => {
    setActiveStoryTab(tabKey);
    setShowAllReviews(false);
    if (tabKey === "reviews") {
      loadGoogleReviews();
    }
  };

  const displayReviews = useMemo(() => {
    const sorted = [...reviews].sort((a, b) => (b?.time || 0) - (a?.time || 0));
    if (showAllReviews) return sorted;

    const tabIndex = STORY_TABS.findIndex((tab) => tab.key === activeStoryTab);
    const filtered = sorted.filter((_, index) => index % 3 === Math.max(tabIndex, 0));
    return filtered.slice(0, 3);
  }, [reviews, showAllReviews, activeStoryTab]);

  const heroCountry = form.destinationCountry || destinationCountry;
  const heroImage =
    HERO_IMAGE_BY_COUNTRY[normalizeCountryKey(heroCountry)] || FranceImage;

  const scrollToForm = () => {
    scrollRef.current?.scrollTo({
      y: Math.max(formOffsetRef.current - 12, 0),
      animated: true,
    });
  };

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const nextErrors = {};
    const requiredMessages = {
      destinationCountry: "Which country are you planning to visit? is required.",
      travelDate: "What's your planned travel date? is required.",
      occupation: "Your Occupation is required.",
      incomeRange: "Monthly Income Range (INR) is required.",
      previousInternationalTravel: "Previous International Travel? is required.",
      pastVisaRejections: "Any Past Visa Rejections? is required.",
      email: "Email ID is required.",
      phone: "Phone Number is required.",
      city: "City of Residence is required.",
    };

    Object.keys(requiredMessages).forEach((field) => {
      if (!String(form[field] || "").trim()) {
        nextErrors[field] = requiredMessages[field];
      }
    });

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (form.phone && cleanPhone(form.phone).length < 10) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (form.travelDate && !/^\d{2}-\d{2}-\d{4}$/.test(form.travelDate.trim())) {
      nextErrors.travelDate = "Use format dd-mm-yyyy.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitEligibility = async () => {
    if (!validateForm()) return;
    setSaving(true);
    try {
      await saveSchengenData(form.destinationCountry || country, {
        eligibilityForm: {
          ...form,
          email: form.email.trim(),
          city: form.city.trim(),
          phone: cleanPhone(form.phone),
        },
        sourceScreen: "SchengenFlowScreen",
        submittedAt: Date.now(),
      });

      setShowBookingModal(true);
      setShowAllReviews(true);
    } catch (error) {
      console.log("Schengen eligibility save error:", error);
      Alert.alert("Error", "Unable to save your form. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const openWhatsApp = async () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}`;
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Unable to open WhatsApp right now.");
    }
  };

  const validateAppointment = () => {
    const nextErrors = {};
    if (!appointmentDate.trim()) nextErrors.appointmentDate = "Select date is required.";
    if (appointmentDate && !/^\d{2}-\d{2}-\d{4}$/.test(appointmentDate.trim())) {
      nextErrors.appointmentDate = "Use format dd-mm-yyyy.";
    }
    if (!appointmentTime.trim()) nextErrors.appointmentTime = "Select time is required.";
    setAppointmentError(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const bookAppointment = async () => {
    if (!validateAppointment()) return;
    try {
      await saveSchengenData(form.destinationCountry || country, {
        appointment: {
          date: appointmentDate.trim(),
          time: appointmentTime.trim(),
          sourceScreen: "SchengenFlowScreen",
          updatedAt: Date.now(),
        },
      });
    } catch (error) {
      console.log("Schengen appointment save error:", error);
    }
    setShowBookingModal(false);
    setShowConfirmedModal(true);
  };

  const renderDropdown = (label, value, onChange, options, errorKey, placeholder) => (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={[styles.pickerWrap, errors[errorKey] && styles.errorBorder]}>
        <Picker selectedValue={value} onValueChange={onChange} style={styles.picker}>
          <Picker.Item label={placeholder} value="" />
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
      </View>
      {errors[errorKey] ? <Text style={styles.errorText}>{errors[errorKey]}</Text> : null}
    </View>
  );

  return (
    <ScreenWrapper>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={26} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{country}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
          >
            <Ionicons name="home-outline" size={24} color="#FF5C00" />
          </TouchableOpacity>
        </View>

        <ImageBackground source={heroImage} style={styles.hero} imageStyle={styles.heroImage}>
          <View style={styles.heroOverlay} />
          <Text style={styles.heroTitle}>Schengen Visa Is Not Just a Form{"\n"}It's a Strategy</Text>
          <Text style={styles.heroSubtitle}>29 Countries, One Visa</Text>
          <TouchableOpacity style={styles.heroBtn} onPress={scrollToForm}>
            <Text style={styles.heroBtnText}>Check My Eligibility (Free)</Text>
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, styles.compactSectionTitle]}>
            Why Schengen Visa Is Different
          </Text>
          <ScrollView
            ref={whyScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.whyRow}
          >
            {WHY_ITEMS.map((item) => (
              <View key={item.title} style={styles.whyItem}>
                <View style={[styles.whyIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={18} color="#FFFFFF" />
                </View>
                <Text style={styles.whyText}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={styles.eligibilitySection}
          onLayout={(event) => {
            formOffsetRef.current = event.nativeEvent.layout.y;
          }}
        >
          <Text style={styles.eligibilityTitle}>Find Out Your Eligibility</Text>

          <View style={styles.formGrid}>
            {renderDropdown(
              "Which country are you planning to visit?",
              form.destinationCountry,
              (v) => updateField("destinationCountry", v),
              SCHENGEN_COUNTRIES,
              "destinationCountry",
              "Select country"
            )}

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>What's your planned travel date?</Text>
              <TouchableOpacity
                onPress={() => setShowTravelDateCalendar(true)}
                style={[styles.input, errors.travelDate && styles.errorBorder]}
              >
                <Text
                  style={form.travelDate ? styles.inputValueText : styles.inputPlaceholderText}
                >
                  {form.travelDate || "dd-mm-yyyy"}
                </Text>
              </TouchableOpacity>
              {errors.travelDate ? <Text style={styles.errorText}>{errors.travelDate}</Text> : null}
            </View>

            {renderDropdown(
              "Your Occupation",
              form.occupation,
              (v) => updateField("occupation", v),
              OCCUPATIONS,
              "occupation",
              "Choose occupation"
            )}

            {renderDropdown(
              "Monthly Income Range (INR)",
              form.incomeRange,
              (v) => updateField("incomeRange", v),
              INCOME_RANGES,
              "incomeRange",
              "Choose income range"
            )}

            {renderDropdown(
              "Previous International Travel?",
              form.previousInternationalTravel,
              (v) => updateField("previousInternationalTravel", v),
              YES_NO_OPTIONS,
              "previousInternationalTravel",
              "Choose an option"
            )}

            {renderDropdown(
              "Any Past Visa Rejections?",
              form.pastVisaRejections,
              (v) => updateField("pastVisaRejections", v),
              YES_NO_OPTIONS,
              "pastVisaRejections",
              "Choose an option"
            )}

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Email ID</Text>
              <TextInput
                value={form.email}
                onChangeText={(v) => updateField("email", v)}
                placeholder="Enter your email id"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, errors.email && styles.errorBorder]}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
            </View>

            <View style={styles.fieldWrap}>
              <Text style={styles.fieldLabel}>Phone Number</Text>
              <TextInput
                value={form.phone}
                onChangeText={(v) => updateField("phone", cleanPhone(v))}
                placeholder="Enter your phone number"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
                style={[styles.input, errors.phone && styles.errorBorder]}
              />
              {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
            </View>
          </View>

          <View style={[styles.fieldWrap, styles.fieldWrapFull]}>
            <Text style={styles.fieldLabel}>City of Residence</Text>
            <TextInput
              value={form.city}
              onChangeText={(v) => updateField("city", v)}
              placeholder="Enter your city"
              placeholderTextColor="#94A3B8"
              style={[styles.input, errors.city && styles.errorBorder]}
            />
            {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, saving && styles.submitBtnDisabled]}
            onPress={submitEligibility}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitBtnText}>Get My Assessment</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.processTitle}>Our 5 step proven process</Text>
          <View style={styles.processTrackWrap}>
            <ScrollView
              ref={processScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.processTrackContent}
            >
              <View style={styles.processLine} />
              {PROCESS_STEPS.map((step) => (
                <View key={step.title} style={styles.processItem}>
                  <View style={[styles.processCircle, { backgroundColor: step.color }]}>
                    <Ionicons name={step.icon} size={20} color="#fff" />
                  </View>
                  <Text style={styles.processIndex}>{step.label}</Text>
                  <Text style={styles.processLabel}>{step.title}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
          <Text style={styles.successSubTitle}>Rated 5 Star from 850+ Verified Reviews</Text>

          <View style={styles.storyTabsRow}>
            {STORY_TABS.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.storyTab,
                  activeStoryTab === tab.key && styles.storyTabActive,
                ]}
                onPress={() => {
                  handleStoryTabPress(tab.key);
                }}
              >
                <ImageBackground
                  source={tab.image}
                  style={styles.storyTabImage}
                  imageStyle={styles.storyTabImageStyle}
                >
                  <View style={styles.storyOverlay} />
                  <Text style={styles.storyTabText}>{tab.title}</Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.reviewHeading}>Client Reviews</Text>

          {loadingReviews ? (
            <ActivityIndicator color={ORANGE} style={{ marginVertical: 16 }} />
          ) : (
            <View>
              {displayReviews.map((item, index) => (
                <View key={`${item.author_name || "review"}-${index}`} style={styles.reviewCard}>
                  <View style={styles.reviewBody}>
                    <View style={styles.reviewHeader}>
                      <View style={styles.reviewAuthorWrap}>
                        {item.profile_photo_url ? (
                          <Image source={{ uri: item.profile_photo_url }} style={styles.reviewAvatar} />
                        ) : null}
                        <Text style={styles.reviewName}>{item.author_name || "Client"}</Text>
                      </View>
                      <Text style={styles.reviewStars}>
                            {"*".repeat(Math.max(1, Math.min(5, Number(item.rating) || 5)))}
                      </Text>
                    </View>
                    <Text style={styles.reviewMeta}>
                          {"Verified Client - "}{item.relative_time_description || "Recent"}
                    </Text>
                    <Text numberOfLines={showAllReviews ? undefined : 4} style={styles.reviewText}>
                      {item.text || ""}
                    </Text>
                  </View>
                </View>
              ))}

              {reviews.length > 3 && (
                !showAllReviews ? (
                  <TouchableOpacity style={styles.readMoreBtn} onPress={() => setShowAllReviews(true)}>
                    <Text style={styles.readMoreText}>{"Read All Reviews ->"}</Text>
                  </TouchableOpacity>
                ) : null
              )}
            </View>
          )}
        </View>
      </ScrollView>

      <Modal visible={showBookingModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowBookingModal(false)}>
              <Ionicons name="close" size={22} color="#344B73" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Book Strategy Call</Text>
            <Text style={styles.modalSubTitle}>
              Speak with our expert and get a personalized visa strategy.
            </Text>

            <Text style={styles.modalLabel}>Select Date</Text>
            <TouchableOpacity
              onPress={() => setShowAppointmentDateCalendar(true)}
              style={[styles.modalInput, appointmentError.appointmentDate && styles.modalInputError]}
            >
              <Text style={appointmentDate ? styles.modalInputValueText : styles.modalInputPlaceholderText}>
                {appointmentDate || "dd-mm-yyyy"}
              </Text>
            </TouchableOpacity>
            {appointmentError.appointmentDate ? (
              <Text style={styles.modalErrorText}>{appointmentError.appointmentDate}</Text>
            ) : null}

            <Text style={styles.modalLabel}>Select Time</Text>
            <View style={[styles.modalPickerWrap, appointmentError.appointmentTime && styles.modalInputError]}>
              <Picker
                selectedValue={appointmentTime}
                onValueChange={(v) => {
                  setAppointmentTime(v);
                  if (appointmentError.appointmentTime) {
                    setAppointmentError((p) => ({ ...p, appointmentTime: "" }));
                  }
                }}
                style={styles.modalPicker}
              >
                <Picker.Item label="Choose a time slot" value="" />
                {TIME_SLOTS.map((slot) => (
                  <Picker.Item key={slot} label={slot} value={slot} />
                ))}
              </Picker>
            </View>
            {appointmentError.appointmentTime ? (
              <Text style={styles.modalErrorText}>{appointmentError.appointmentTime}</Text>
            ) : null}

            <TouchableOpacity style={styles.modalPrimaryBtn} onPress={bookAppointment}>
              <Text style={styles.modalPrimaryBtnText}>Book My Appointment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalSecondaryBtn} onPress={openWhatsApp}>
              <Text style={styles.modalSecondaryBtnText}>Message Us on WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showTravelDateCalendar} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.calendarOverlay}
          onPress={() => setShowTravelDateCalendar(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.calendarBox}>
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              markedDates={
                form.travelDate
                  ? {
                      [ddmmyyyyToYMD(form.travelDate)]: {
                        selected: true,
                        selectedColor: "#FF5C00",
                      },
                    }
                  : {}
              }
              onDayPress={(day) => {
                updateField("travelDate", ymdToDDMMYYYY(day.dateString));
                setShowTravelDateCalendar(false);
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showAppointmentDateCalendar} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          style={styles.calendarOverlay}
          onPress={() => setShowAppointmentDateCalendar(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.calendarBox}>
            <Calendar
              minDate={new Date().toISOString().split("T")[0]}
              markedDates={
                appointmentDate
                  ? {
                      [ddmmyyyyToYMD(appointmentDate)]: {
                        selected: true,
                        selectedColor: "#FF5C00",
                      },
                    }
                  : {}
              }
              onDayPress={(day) => {
                setAppointmentDate(ymdToDDMMYYYY(day.dateString));
                if (appointmentError.appointmentDate) {
                  setAppointmentError((p) => ({ ...p, appointmentDate: "" }));
                }
                setShowAppointmentDateCalendar(false);
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal visible={showConfirmedModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setShowConfirmedModal(false)}>
              <Ionicons name="close" size={22} color="#344B73" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Your Appointment is Confirmed!</Text>
            <Text style={styles.modalSubTitle}>
              Your profile evaluation call is scheduled. Check your email for details.
            </Text>

            <View style={styles.confirmedRow}>
              <Text style={styles.confirmedLabel}>Selected date</Text>
              <Text style={styles.confirmedValue}>{appointmentDate}</Text>
            </View>
            <View style={styles.confirmedRow}>
              <Text style={styles.confirmedLabel}>Selected time</Text>
              <Text style={styles.confirmedValue}>{appointmentTime}</Text>
            </View>

            <TouchableOpacity style={styles.modalSecondaryBtn} onPress={openWhatsApp}>
              <Text style={styles.modalSecondaryBtnText}>Message Us on WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmedCloseBtn} onPress={() => setShowConfirmedModal(false)}>
              <Text style={styles.confirmedCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    backgroundColor: "#E9EEF5",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#0F172A",
    fontSize: 17,
    fontWeight: "800",
  },
  hero: {
    minHeight: IS_SMALL_SCREEN ? 250 : 270,
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  heroImage: {
    borderRadius: 20,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(8, 26, 53, 0.45)",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: IS_SMALL_SCREEN ? 23 : 28,
    lineHeight: IS_SMALL_SCREEN ? 29 : 34,
    textAlign: "center",
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "#E2E8F0",
    marginTop: 8,
    fontSize: IS_SMALL_SCREEN ? 14 : 18,
    fontWeight: "700",
  },
  heroBtn: {
    marginTop: 14,
    backgroundColor: "#0F766E",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 14,
    width: "92%",
    maxWidth: 320,
    alignItems: "center",
  },
  heroBtnText: {
    color: "#fff",
    fontSize: IS_SMALL_SCREEN ? 14 : 17,
    fontWeight: "700",
    textAlign: "center",
  },
  sectionCard: {
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderWidth: 1,
    borderColor: "#D7E2F2",
  },
  sectionTitle: {
    color: NAVY,
    fontSize: IS_SMALL_SCREEN ? 20 : 22,
    lineHeight: IS_SMALL_SCREEN ? 24 : 28,
    textAlign: "center",
    fontWeight: "800",
    marginBottom: 6,
  },
  compactSectionTitle: {
    marginBottom: 10,
  },
  whyRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 8,
    paddingBottom: 2,
  },
  whyItem: {
    width: IS_SMALL_SCREEN ? 146 : 162,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  whyIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#DDE9FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  whyText: {
    textAlign: "center",
    color: "#102A56",
    fontWeight: "700",
    fontSize: 12,
  },
  eligibilitySection: {
    marginHorizontal: 14,
    marginTop: 14,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#071E45",
    borderWidth: 1,
    borderColor: "#2E4570",
  },
  eligibilityTitle: {
    color: "#FFFFFF",
    fontSize: IS_SMALL_SCREEN ? 18 : 20,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  formGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fieldWrap: {
    width: IS_SMALL_SCREEN ? "100%" : "48.5%",
    marginBottom: 7,
  },
  fieldWrapFull: {
    width: "100%",
  },
  fieldLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 3,
  },
  pickerWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#F1D3D1",
    overflow: "hidden",
    minHeight: 50,
    justifyContent: "center",
  },
  picker: {
    color: "#0F172A",
    height: 50,
    fontSize: 13,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.2,
    borderColor: "#F1D3D1",
    color: "#111827",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minHeight: 42,
    justifyContent: "center",
  },
  inputValueText: {
    color: "#111827",
    fontSize: 14,
  },
  inputPlaceholderText: {
    color: "#94A3B8",
    fontSize: 14,
  },
  errorBorder: {
    borderColor: "#FFB4AC",
  },
  errorText: {
    color: "#FFB4AC",
    fontSize: 12,
    marginTop: 3,
  },
  submitBtn: {
    marginTop: 8,
    alignSelf: "center",
    backgroundColor: "#FF7A1A",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    minWidth: 170,
    alignItems: "center",
  },
  submitBtnDisabled: {
    opacity: 0.8,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
  },
  processTitle: {
    textAlign: "center",
    color: NAVY,
    fontSize: IS_SMALL_SCREEN ? 22 : 24,
    fontWeight: "800",
    marginBottom: 12,
  },
  processTrackWrap: {
    marginHorizontal: -2,
  },
  processTrackContent: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    minWidth: IS_SMALL_SCREEN ? 560 : SCREEN_WIDTH - 56,
    paddingHorizontal: 6,
    paddingTop: 2,
    paddingBottom: 2,
  },
  processLine: {
    position: "absolute",
    top: 22,
    left: 34,
    right: 34,
    height: 2,
    backgroundColor: "#D9C785",
    borderRadius: 2,
  },
  processItem: {
    width: IS_SMALL_SCREEN ? 104 : 110,
    alignItems: "center",
    zIndex: 1,
  },
  processCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.65)",
    shadowColor: "#0A1C3A",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  processIndex: {
    color: "#2F4670",
    fontSize: 12,
    fontWeight: "700",
  },
  processLabel: {
    color: "#0B2A59",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
    marginTop: 4,
  },
  successSubTitle: {
    textAlign: "center",
    color: "#21436E",
    fontSize: 14,
    marginTop: 0,
    marginBottom: 10,
    fontWeight: "600",
  },
  storyTabsRow: {
    gap: 10,
  },
  storyTab: {
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  storyTabActive: {
    borderColor: ORANGE,
  },
  storyTabImage: {
    height: 86,
    justifyContent: "flex-end",
    padding: 10,
  },
  storyTabImageStyle: {
    borderRadius: 12,
  },
  storyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10,24,49,0.35)",
    borderRadius: 12,
  },
  storyTabText: {
    color: "#FFFFFF",
    fontSize: IS_SMALL_SCREEN ? 18 : 20,
    lineHeight: IS_SMALL_SCREEN ? 22 : 24,
    fontWeight: "800",
  },
  reviewHeading: {
    fontSize: IS_SMALL_SCREEN ? 18 : 20,
    color: NAVY,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 6,
  },
  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D5E0F0",
    marginBottom: 10,
    overflow: "hidden",
  },
  reviewBody: {
    padding: 10,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviewAuthorWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  reviewAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  reviewName: {
    color: "#0B2A59",
    fontSize: 15,
    fontWeight: "800",
    flex: 1,
  },
  reviewStars: {
    color: "#E6A90B",
    fontSize: 14,
    fontWeight: "800",
  },
  reviewMeta: {
    color: "#3B5D8F",
    fontSize: 12,
    marginTop: 2,
  },
  reviewText: {
    color: "#0F294D",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },
  readMoreBtn: {
    alignSelf: "flex-start",
    marginTop: 2,
    marginBottom: 2,
  },
  readMoreText: {
    color: "#0B3E86",
    fontSize: 14,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(4, 12, 30, 0.45)",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  calendarOverlay: {
    flex: 1,
    backgroundColor: "rgba(4, 12, 30, 0.45)",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  calendarBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D8E2F1",
    padding: 8,
  },
  modalCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#D8E2F1",
    padding: 14,
  },
  modalClose: {
    alignSelf: "flex-end",
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#E5ECF7",
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    color: "#142F5F",
    fontSize: 22,
    lineHeight: 30,
    fontWeight: "800",
    marginTop: -6,
  },
  modalSubTitle: {
    color: "#40608E",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
    marginBottom: 10,
  },
  modalLabel: {
    color: "#1D3E70",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  modalInput: {
    borderWidth: 1.2,
    borderColor: "#C7D5EA",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    fontSize: 15,
    color: "#1B335E",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 4,
    minHeight: 44,
    justifyContent: "center",
  },
  modalInputValueText: {
    color: "#1B335E",
    fontSize: 15,
  },
  modalInputPlaceholderText: {
    color: "#8EA2C5",
    fontSize: 15,
  },
  modalPickerWrap: {
    borderWidth: 1.2,
    borderColor: "#C7D5EA",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    marginBottom: 4,
  },
  modalPicker: {
    color: "#1B335E",
  },
  modalInputError: {
    borderColor: "#F29A9A",
  },
  modalErrorText: {
    color: "#B23A3A",
    fontSize: 12,
    marginBottom: 6,
  },
  modalPrimaryBtn: {
    marginTop: 8,
    borderRadius: 14,
    backgroundColor: "#2F8546",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalPrimaryBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
  modalSecondaryBtn: {
    marginTop: 10,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: "#89D09A",
    backgroundColor: "#EDF9EF",
    alignItems: "center",
    paddingVertical: 12,
  },
  modalSecondaryBtnText: {
    color: "#268745",
    fontSize: 17,
    fontWeight: "800",
  },
  confirmedRow: {
    marginTop: 8,
    borderWidth: 1.2,
    borderColor: "#C8D5EA",
    borderRadius: 12,
    backgroundColor: "#EFF4FB",
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmedLabel: {
    color: "#496894",
    fontSize: 14,
    fontWeight: "700",
  },
  confirmedValue: {
    color: "#1A3768",
    fontSize: 14,
    fontWeight: "800",
  },
  confirmedCloseBtn: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: "#11345A",
    alignItems: "center",
    paddingVertical: 12,
  },
  confirmedCloseBtnText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },
});
