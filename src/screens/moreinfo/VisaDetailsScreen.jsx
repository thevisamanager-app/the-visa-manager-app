import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CountryFlag from "react-native-country-flag";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";
import DESTINATIONS from "../../assets/data/destinations";
import { TextInput } from "react-native";
import WhyChooseTVM from "../../components/WhyChooseTVM";
import { moderateScale } from "../../utils/metrics";
import { COUNTRY_APPLY_ROUTES } from "../../config/countryApplyRoutes";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
} from "react-native";

import { getCountryFaqs } from "../../utils/countryFaqs";
import { COUNTRY_ISO_MAP } from "../../utils/countryIsoMap";
import ScreenWrapper from "../../components/ScreenWrapper";
import { fetchGoogleReviews } from "../../services/reviews/googleReviews";
import { COUNTRY_VISA_CONFIG } from "../../assets/data/countryVisaConfig";
import { useDispatch } from "react-redux";
import { setSelectedDestination } from "../../Redux/destinationsSlice";

const ORANGE = "#FF5C00";


const HIGHLIGHT_COUNTRIES = [
  "Singapore",
  "Japan",
  "USA",
  "Uk",
  "Italy",
];


export default function VisaDetailsScreen({ navigation }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.destinations.selected);
  const countryName = selected?.countrName || "Country";
  const normalizedCountryName = countryName?.trim();
  const applyRoute =
    COUNTRY_APPLY_ROUTES?.[countryName] ||
    COUNTRY_APPLY_ROUTES?.DEFAULT ||
    "TravelDateScreen";
  const [faqSearch, setFaqSearch] = useState("");
  const normalizeCountryKey = (name = "") =>
    String(name).toLowerCase().replace(/[^a-z]/g, "");
  const toNumber = (val) => {
    if (!val) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      return Number(val.replace(/[^\d.]/g, "")) || 0;
    }
    return 0;
  };

  const destinationPrice =
    DESTINATIONS.find(
      (item) =>
        normalizeCountryKey(item.countrName) ===
        normalizeCountryKey(normalizedCountryName)
    ) || DESTINATIONS.find((item) => item.countrName === countryName);
  //const travellers = 1;
  const [travellers, setTravellers] = useState(1);

  const visaManagerFee = toNumber(destinationPrice?.VisaManagerFee);
  const authorityCharges = toNumber(destinationPrice?.AuthorityCharges);
  const governmentFee = toNumber(destinationPrice?.GovernmentFee);

  const governmentTotal = governmentFee * travellers;
  const tvmTotal = visaManagerFee * travellers;
  const authorityTotal = authorityCharges * travellers;
  const payNow = governmentTotal;
  const payLater = tvmTotal + authorityTotal;
  const totalAmount = governmentTotal + tvmTotal + authorityTotal;
  const isoCode = (COUNTRY_ISO_MAP[countryName] || "un").toLowerCase();
  const [activeStep, setActiveStep] = useState(0);
  const countryConfig = COUNTRY_VISA_CONFIG[normalizedCountryName];
  const highlightCountries = DESTINATIONS.filter((item) =>
    HIGHLIGHT_COUNTRIES.some(
      (name) =>
        name.toLowerCase() === (item.countrName || "").toLowerCase()
    )
  );
  const isVisaFree = countryConfig?.isVisaFree === true;
  const FALLBACK_VISA_FREE = [
    "jamaica",
    "micronesia",
    "fiji",
    "north korea",
    "british virgin islands",
    "barbados",
    "cook islands",
    "el salvador",
    "montserrat",
    "trinidad & tobago",
    "dominica",
    "senegal",
    "reunion",
    "st. kitts & nevis",
    "st. vincent & grenadines",
    "niue",
    "haiti",
    "gambia",
  ];
  const normalizedCountryKey = normalizedCountryName?.toLowerCase();
  const finalIsVisaFree =
    isVisaFree || FALLBACK_VISA_FREE.includes(normalizedCountryKey);
  const handleCountryPress = (item) => {
    dispatch(setSelectedDestination(item));
    navigation.push("VisaDetailsScreen");
  };
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const STEP_META = countryConfig?.stepMeta ?? [];
  const PROCESS_STEPS = countryConfig?.processSteps ?? [];
  useEffect(() => {
    setActiveStep(0);
  }, [normalizedCountryName]);
  useEffect(() => {
    if (PROCESS_STEPS.length <= 1) return;

    const interval = setInterval(() => {
      setActiveStep((prev) =>
        prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [normalizedCountryName, PROCESS_STEPS.length]);

  const processTitle =
    countryConfig?.processTitle || `${countryName} Visa Process`;


  const faqs = getCountryFaqs(countryName);
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );
  // 🔹 Google Reviews state
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);



  // 🔹 Fetch reviews once
  useEffect(() => {
    fetchGoogleReviews()
      .then((data) => {
        console.log("GOOGLE REVIEWS:", data); // 👈 ADD THIS
        setReviews(data);
      })
      .catch((e) => console.log("Reviews fetch error:", e))
      .finally(() => setLoadingReviews(false));
  }, []);

  // 🔹 RECENT REVIEWS (latest 3)
  const recentReviews = [...reviews]
    .sort((a, b) => b.time - a.time)
    .slice(0, 3);

  // 🔹 Decide what to show
  const displayReviews = showAllReviews ? reviews : recentReviews;

  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* HEADER ACTIONS */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={moderateScale(28)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
            >
              <Icon name="home" size={moderateScale(24)} color={ORANGE} />
            </TouchableOpacity>
          </View>

          {/* COUNTRY VISA CARD */}
          <View style={styles.countryCard}>
            <View style={styles.countryHeader}>
              <CountryFlag isoCode={isoCode} size={50} />
              <Text style={styles.countryName}>
                {countryConfig?.headerTitle || countryName}
              </Text>

              <Text style={styles.processingText}>
                {countryConfig?.processingText}
              </Text>
              {countryConfig?.processingNote ? (
                <Text style={styles.processingNote}>
                  {countryConfig.processingNote}
                </Text>
              ) : null}
            </View>

            <WhyChooseTVM country={countryName} />

          </View>

          {/* VISA PROCESS TITLE */}
          {PROCESS_STEPS.length > 0 && (
            <View style={styles.processWrapper}>
              {/* stepper UI */}
            </View>
          )}

          <Text
            style={styles.centerSectionTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {processTitle}
          </Text>


          <View style={styles.processWrapper}>
            {/* STEP INDICATOR */}
            <View style={styles.stepperContainer}>
              <View style={styles.stepLineBase} />

              <View
                style={[
                  styles.stepLineActive,
                  {
                    width:
                      PROCESS_STEPS.length > 1
                        ? `${(activeStep / (PROCESS_STEPS.length - 1)) * 100}%`
                        : "0%",
                  },
                ]}
              />

              <View style={styles.stepRow}>
                {STEP_META.map((step, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.stepCircle,
                      index <= activeStep && styles.stepActive,
                    ]}
                    onPress={() => setActiveStep(index)}
                  >
                    <Icon
                      name={index < activeStep ? "checkmark" : step.icon}
                      size={18}
                      color={index <= activeStep ? "#FFFFFF" : "#FF5C00"}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* STEP LABELS */}
            <View style={styles.stepLabelRow}>
              {STEP_META.map((step, index) => (
                <Text
                  key={index}
                  style={[
                    styles.stepLabel,
                    index === activeStep && styles.stepLabelActive,
                  ]}
                >
                  {step.label}
                </Text>
              ))}
            </View>

            {/* STEP CONTENT */}
            {PROCESS_STEPS[activeStep] && (
              <View style={styles.processCardCentered}>
                <Text style={styles.processTitleCentered}>
                  {PROCESS_STEPS[activeStep].title}
                </Text>

                {PROCESS_STEPS[activeStep].points.map((p, i) => (
                  <View key={i} style={styles.processPointCentered}>
                    <Icon name="checkmark-circle" size={18} color="#FF5C00" />
                    <Text style={styles.processTextCentered}>{p}</Text>
                  </View>
                ))}
              </View>

            )}
          </View>



          {/* VISA INFO */}
          <Text
            style={styles.centerSectionTitle}
            numberOfLines={2}
          >
            {countryConfig?.visaInfoTitle || "Visa Information"}
          </Text>


          <View style={styles.infoGrid}>
            <InfoItem
              label="Visa Type"
              value={countryConfig?.visaInfo.visaType}
              icon="document-text-outline"
              iconBg="#EEF2FF"
            />

            <InfoItem
              label="Length of Stay"
              value={countryConfig?.visaInfo.stay}
              icon="calendar-outline"
              iconBg="#EFF6FF"
            />

            <InfoItem
              label="Validity"
              value={countryConfig?.visaInfo.validity}
              icon="time-outline"
              iconBg="#ECFDF5"
            />

            <InfoItem
              label="Entry"
              value={countryConfig?.visaInfo.entry}
              icon="repeat-outline"
              iconBg="#F5F3FF"
            />

            <InfoItem
              label="Method"
              value={countryConfig?.visaInfo.method}
              icon="cloud-done-outline"
              iconBg="#FFF7ED"
            />
          </View>


          {/* VISA REQUIREMENTS */}
          <Text
            style={styles.centerSectionTitle}
            numberOfLines={2}
          >
            {countryConfig?.requirementsTitle ||
              `${countryName} Visa Requirements`}
          </Text>



          <View style={styles.requirementsCard}>
            <Text style={styles.requirementsSubTitle}>
              Keep these ready before you apply
            </Text>

            <View style={styles.requirementsGridCentered}>
              {(countryConfig?.requirements || []).map((req, index) => (
                <View key={index} style={styles.requirementItemCentered}>
                  <View style={styles.requirementIconBox}>
                    <Icon name="checkmark-outline" size={20} color="#FF5C00" />
                  </View>

                  <Text style={styles.requirementTextCentered}>{req}</Text>
                </View>
              ))}
            </View>


          </View>

          {/* GOOGLE REVIEWS (UNDER FAQ) */}
          <Text style={styles.centerSectionTitle}>Latest Google Reviews</Text>



          <View style={styles.reviewCard}>
            {loadingReviews ? (
              <ActivityIndicator color="#FF5C00" />
            ) : (
              displayReviews.map((item, index) => (

                // (showAllReviews ? reviews : displayReviews).map((item, index) => (
                <View key={index} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    {item.profile_photo_url && (
                      <Image
                        source={{ uri: item.profile_photo_url }}
                        style={styles.reviewAvatar}
                      />
                    )}

                    <View style={{ flex: 1 }}>
                      <Text style={styles.reviewName}>{item.author_name}</Text>
                      <Text style={styles.reviewTime}>
                        {item.relative_time_description}
                      </Text>
                    </View>

                    <Text style={styles.reviewRating}>⭐ {item.rating}</Text>
                  </View>

                  <Text
                    numberOfLines={showAllReviews ? undefined : 3}
                    style={styles.reviewText}
                  >
                    {item.text}
                  </Text>
                </View>
              ))
            )}

            {!loadingReviews && reviews.length > 3 && (
              <TouchableOpacity
                // onPress={() => setShowAllReviews(true)}
                onPress={() => setShowAllReviews((prev) => !prev)}
                style={{ marginTop: 8 }}
              >
                <Text style={styles.reviewLink}>
                  {showAllReviews ? "Show less reviews" : "View all reviews"}
                </Text>

              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://search.google.com/local/writereview?placeid=ChIJ3bPWBbqVwjsRsIr6lWmT0uA"
                )
              }
              style={{ marginTop: 12 }}
            >
              <Text style={styles.reviewLink}>Rate us on Google</Text>
            </TouchableOpacity>
          </View>


          {/* FAQs */}
          <Text
            style={styles.centerSectionTitle}
            numberOfLines={2}
          >
            Frequently Asked Questions
          </Text>


          {/* Search bar */}
          <View style={styles.faqSearchBox}>
            <Icon name="search-outline" size={18} color="#9CA3AF" />
            <TextInput
              value={faqSearch}
              onChangeText={setFaqSearch}
              placeholder="Search for answers"
              placeholderTextColor="#9CA3AF"
              style={styles.faqSearchInput}
            />
          </View>

          {/* FAQ list */}
          {faqs.map((item, index) => (
            <View key={index} style={styles.faqItem}>

              {/* QUESTION ROW */}
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleFaq(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqQuestion}>
                  {item.question}
                </Text>

                <Icon
                  name={openIndex === index ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="#333"
                />
              </TouchableOpacity>

              {/* ANSWER (HIDDEN BY DEFAULT) */}
              {openIndex === index && (
                <View style={styles.faqAnswerBox}>
                  <Text style={styles.faqAnswer}>
                    {item.answer}
                  </Text>
                </View>
              )}

            </View>
          ))}


          {finalIsVisaFree && (
            <View style={{ marginTop: 32 }}>
              <Text style={styles.centerSectionTitle}>
                Popular Destinations for Indians
              </Text>

              <View style={{ gap: 12 }}>
                {highlightCountries.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => handleCountryPress(item)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: 14,
                      padding: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      elevation: 3,
                    }}
                  >
                    <CountryFlag
                      isoCode={(COUNTRY_ISO_MAP[item.countrName] || "UN").toLowerCase()}
                      size={28}
                    />
                    <Text style={{ fontSize: 14, fontWeight: "600" }}>
                      {item.countrName}
                    </Text>

                    <Icon
                      name="chevron-forward"
                      size={18}
                      color="#9CA3AF"
                      style={{ marginLeft: "auto" }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>


          )}


          {/* PRICE SUMMARY */}
          {/* PRICE SUMMARY */}
          {!finalIsVisaFree && (
            <View style={styles.priceCard}>

              {/* HEADER */}
              <View style={styles.priceHeader}>
                <Icon name="people-outline" size={18} color="#374151" />
                <Text style={styles.priceHeaderText}>Travellers</Text>

                <View style={styles.counter}>
                  <TouchableOpacity
                    onPress={() => setTravellers((prev) => Math.max(1, prev - 1))}
                  >
                    <Text style={styles.counterBtn}>−</Text>
                  </TouchableOpacity>

                  <Text style={styles.counterValue}>{travellers}</Text>

                  <TouchableOpacity
                    onPress={() => setTravellers((prev) => prev + 1)}
                  >
                    <Text style={styles.counterBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* PAY NOW */}
              <View style={styles.payNowSection}>
                <Text style={styles.amountBig}>₹{payNow}</Text>
                <Text style={styles.payNowLabel}>TO BE PAID NOW</Text>
              </View>

              <View style={styles.divider} />

              {/* PAY NOW ROW */}
              <View style={styles.priceRow}>
                <View style={styles.rowLeft}>
                  <Icon name="card-outline" size={18} color="#374151" />
                  <View>
                    <Text style={styles.rowTitle}>Government Fee</Text>
                    <Text style={styles.rowSub}>
                      Government Fee x {travellers}
                    </Text>
                  </View>
                </View>
                <Text style={styles.rowAmount}>₹{governmentTotal}</Text>
              </View>

              {/* TVM FEE ROW */}
              <View style={styles.priceRow}>
                <View style={styles.rowLeft}>
                  <Icon name="time-outline" size={18} color="#374151" />
                  <View>
                    <Text style={styles.rowTitle}>TVM Fee</Text>
                    <Text style={styles.rowSub}>
                      TVM Fee x {travellers}
                    </Text>
                  </View>
                </View>
                <Text style={styles.rowAmount}>₹{tvmTotal}</Text>
              </View>

              {/* AUTHORITY FEE ROW */}
              <View style={styles.priceRow}>
                <View style={styles.rowLeft}>
                  <Icon name="shield-checkmark-outline" size={18} color="#374151" />
                  <View>
                    <Text style={styles.rowTitle}>Authority Charges</Text>
                    <Text style={styles.rowSub}>
                      Authority Charges x {travellers}
                    </Text>
                  </View>
                </View>
                <Text style={styles.rowAmount}>₹{authorityTotal}</Text>
              </View>

              <View style={styles.divider} />

              {/* TOTAL */}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>₹{totalAmount}</Text>
              </View>

            </View>
          )}

        </ScrollView>

        {/* STICKY ACTION BUTTON */}
        <View style={styles.stickyButtonRow}>
          {!finalIsVisaFree && (
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() => {
                navigation.navigate(applyRoute, { country: countryName });
              }}
            >
              <Text style={styles.secondaryText}>Start Application</Text>
            </TouchableOpacity>
          )}

          {finalIsVisaFree && (
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() =>
                navigation.navigate("DestinationScreen", { country: countryName })
              }
            >
              <Text style={styles.secondaryText}>Explore Now </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper >
  );
}

/* =======================
   REUSABLE INFO ITEM
======================== */
function InfoItem({ label, value, icon, iconBg }) {
  return (
    <View style={styles.infoItemCentered}>
      <View style={[styles.iconBoxCentered, { backgroundColor: iconBg }]}>
        <Icon name={icon} size={22} color="#111827" />
      </View>

      <Text style={styles.infoLabelCentered}>{label}</Text>
      <Text style={styles.infoValueCentered}>{value}</Text>
    </View>
  );
}


/* =======================
   STYLES
======================== */
const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: { padding: 16, paddingBottom: 96 },

  countryCard: {
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FF5C00",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },

  countryHeader: {
    alignItems: "center",
    marginBottom: 10,
  },

  countryName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",

    maxWidth: "90%",        // ⬅️ keeps it centered visually
    lineHeight: 24,         // ⬅️ clean wrapping
    marginTop: 10,
  },

  processingText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 8,           // ⬅️ space from title
    textAlign: "center",
  },

  subText: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  bold: { fontWeight: "700" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
    marginTop: 24, // ✅ ADD THIS
  },



  infoGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 32,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",   // ✅ key
    gap: 12,                   // ✅ spacing between items
    elevation: 4,
  },



  infoItemCentered: {
    width: "45%",
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",      // ✅ center everything
  },
  rightColumn: { paddingLeft: 40 },
  infoLabelCentered: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 2,
  },
  infoValueCentered: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  docCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },

  docTitle: { fontSize: 15, fontWeight: "700" },
  docDesc: { fontSize: 13, color: "#6B7280", marginTop: 4 },

  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    elevation: 4,
  },

  faqItemCentered: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },


  faqQuestionCentered: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
  },

  faqAnswerCentered: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 19,
    textAlign: "justify",
  },

  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    alignSelf: "center",
    width: "95%",
  },


  reviewItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 6, // ✅ ADD THIS
  },


  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },

  reviewAvatar: { width: 36, height: 36, borderRadius: 18 },
  reviewName: { fontSize: 14, fontWeight: "700" },
  reviewTime: { fontSize: 12, color: "#6B7280" },
  reviewRating: { fontSize: 13, fontWeight: "700" },
  reviewText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    textAlign: "justify",
  },
  reviewText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    textAlign: "justify",
  },

  buttonRow: { marginTop: 20 },
  stickyButtonRow: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 16,
  },
  secondaryBtn: {
    backgroundColor: "#FF5C00",
    height: 66,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  secondaryText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 18,
  },

  primaryText: {
    fontWeight: "700",
    color: "#FFFFFF",
  },
  rightColumn: {
    paddingLeft: 40,   // 👈 adjust (6–12 works best)
  },

  processWrapper: {
    marginBottom: 24,
  },

  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FF5C00",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  stepActive: {
    backgroundColor: "#FF5C00",
  },

  stepText: {
    color: "#FF5C00",
    fontWeight: "700",
  },

  stepTextActive: {
    color: "#FFF",
  },

  stepLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 12,
  },

  stepLabel: {
    width: "25%",
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
  },

  processCardCentered: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#FFE5D0",
    minHeight: 260,     // ⬅️ increase
    justifyContent: "center",
  },



  processTitleCentered: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 14,
  },

  processPointCentered: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 10,
  },

  tick: {
    color: "#FF5C00",
    fontWeight: "700",
    marginRight: 8,
  },


  processTextCentered: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
  },

  requirementsCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 16,
    marginBottom: 32, // ✅ ADD / INCREASE
    borderWidth: 1,
    borderColor: "#FFE5D0",
  },
  requirementsSubTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 14,
  },

  requirementsGridCentered: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },

  requirementItemCentered: {
    width: "45%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE5D0",
  },


  requirementIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF7ED",
    marginBottom: 8,
  },

  requirementTextCentered: {
    fontSize: 13,
    color: "#374151",
    textAlign: "center",
    fontWeight: "500",
  },

  stepperContainer: {
    position: "relative",
    marginBottom: 14,
  },

  stepLineBase: {
    position: "absolute",
    top: 19, // vertically centers with circles
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: "#FFE5D0",
    borderRadius: 2,
  },

  stepLineActive: {
    position: "absolute",
    top: 19,
    left: 0,
    height: 3,
    backgroundColor: "#FF5C00",
    borderRadius: 2,
  },

  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  stepLabelActive: {
    color: "#FF5C00",
    fontWeight: "700",
  },

  priceCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 18,
    padding: 16,
    marginTop: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FFE5D0",
  },

  priceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  priceHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginLeft: 8,
  },

  counter: {
    flexDirection: "row",
    alignItems: "center",
  },

  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "#374151",
  },

  counterValue: {
    marginHorizontal: 10,
    fontWeight: "700",
    fontSize: 14,
  },

  payNowSection: {
    alignItems: "center",
    marginVertical: 14,
  },

  amountBig: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
  },

  payNowLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  rowSub: {
    fontSize: 12,
    color: "#6B7280",
  },

  rowAmount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FF5C00",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  headerBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
  },

  headerText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  iconBoxCentered: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  processSectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 32,   // ✅ ADD
    elevation: 4,
  },

  faqSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FFE5D0",
    alignSelf: "center",
    width: "95%",
  },


  faqSearchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111827",
  },

  noFaqText: {
    textAlign: "center",
    color: "#6B7280",
    marginVertical: 20,
    fontSize: 13,
  },

  centerSectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 16,
    marginTop: 32,
    textAlign: "center",
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 14,
  },

  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  faqQuestion: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111",
    flex: 1,
    paddingRight: 12,
  },

  faqAnswerBox: {
    marginTop: 10,
  },

  faqAnswer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },


});
