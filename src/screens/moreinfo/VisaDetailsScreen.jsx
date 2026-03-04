import React, { useEffect, useRef, useState } from "react";
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
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getCountryFaqs } from "../../utils/countryFaqs";
import { COUNTRY_ISO_MAP } from "../../utils/countryIsoMap";
import ScreenWrapper from "../../components/ScreenWrapper";
import { fetchGoogleReviews } from "../../services/reviews/googleReviews";
import { COUNTRY_VISA_CONFIG } from "../../assets/data/countryVisaConfig";
import { useDispatch } from "react-redux";
import { setSelectedDestination } from "../../Redux/destinationsSlice";

const ORANGE = "#FF5C00";
const NOTICE_TEXT =
  "Visa Fees Are Subject to Change. Please Confirm The Final Amount with your Visa Manager.";
const { width: SCREEN_WIDTH } = Dimensions.get("window");


const HIGHLIGHT_COUNTRIES = [
  "Singapore",
  "Japan",
  "USA",
  "Uk",
  "Italy",
];

const splitProcessingText = (value = "") => {
  const text = String(value || "").trim();
  if (!text) return { start: "", highlight: "" };

  const patterns = [
    /(\d+\s*-\s*\d+\s*(?:business|working)?\s*days?)$/i,
    /(\d+\s*(?:business|working)?\s*days?)$/i,
    /(on\s+arrival(?:\s+\d+\s*(?:business|working)?\s*days?)?)$/i,
    /(before\s+travel)$/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      const highlight = match[1];
      const start = text.slice(0, text.length - highlight.length).trimEnd();
      return { start, highlight };
    }
  }

  return { start: text, highlight: "" };
};

const formatCurrency = (value) =>
  `\u20B9${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;


export default function VisaDetailsScreen({ navigation }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const selected = useSelector((state) => state.destinations.selected);
  const countryName = selected?.countrName || "Country";
  const normalizedCountryName = countryName?.trim();
  const isSchengen =
    selected?.countryType?.toString().trim().toLowerCase() === "schengen";
  const applyRoute =
    (isSchengen
      ? "SchengenFlowScreen"
      : COUNTRY_APPLY_ROUTES?.[countryName]) ||
    COUNTRY_APPLY_ROUTES?.DEFAULT ||
    "TravelDateScreen";
  const [faqSearch, setFaqSearch] = useState("");
  const [showAllFaqs, setShowAllFaqs] = useState(false);
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
  const governmentFee = toNumber(
    destinationPrice?.AllInclusive ?? destinationPrice?.GovernmentFee
  );
  const authorityCharges =
    destinationPrice?.AllInclusive != null
      ? 0
      : toNumber(destinationPrice?.AuthorityCharges);

  const governmentTotal = governmentFee * travellers;
  const tvmTotal = visaManagerFee * travellers;
  const authorityTotal = authorityCharges * travellers;
  const totalAmount = governmentTotal + tvmTotal + authorityTotal;
  const isoCode = (COUNTRY_ISO_MAP[countryName] || "un").toLowerCase();
  const [activeStep, setActiveStep] = useState(0);
  const normalizedSelectedCountryKey = normalizeCountryKey(normalizedCountryName);
  const countryConfig =
    COUNTRY_VISA_CONFIG[normalizedCountryName] ||
    Object.entries(COUNTRY_VISA_CONFIG).find(
      ([key]) => normalizeCountryKey(key) === normalizedSelectedCountryKey
    )?.[1] ||
    null;
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
  const normalizedVisaFreeFallback = new Set(
    FALLBACK_VISA_FREE.map((name) => normalizeCountryKey(name))
  );
  const destinationCountryType = String(destinationPrice?.countryType || "")
    .trim()
    .toLowerCase();
  const finalIsVisaFree =
    isVisaFree ||
    normalizedVisaFreeFallback.has(normalizedSelectedCountryKey) ||
    destinationCountryType === "visa free" ||
    destinationCountryType === "visa-free";
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
  // Keep process stepper stable: no auto-advance to avoid page jitter/shake.

  const processTitle =
    countryConfig?.processTitle || `${countryName} Visa Process`;
  const { start: processingStart, highlight: processingHighlight } =
    splitProcessingText(countryConfig?.processingText);


  const faqs = getCountryFaqs(countryName);
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );
  const hasFaqSearch = faqSearch.trim().length > 0;
  const visibleFaqs =
    showAllFaqs || hasFaqSearch ? filteredFaqs : filteredFaqs.slice(0, 3);
  const canToggleFaqList = !hasFaqSearch && filteredFaqs.length > 3;
  // 🔹 Google Reviews state
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const noticeAnim = useRef(new Animated.Value(0)).current;



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

  useEffect(() => {
    noticeAnim.setValue(0);
    const loop = Animated.loop(
      Animated.timing(noticeAnim, {
        toValue: 1,
        duration: 7000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [noticeAnim]);

  // 🔹 RECENT REVIEWS (latest 3)
  const recentReviews = [...reviews]
    .sort((a, b) => b.time - a.time)
    .slice(0, 3);

  // 🔹 Decide what to show
  const displayReviews = showAllReviews ? reviews : recentReviews;

  return (
    <ScreenWrapper>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={[
            styles.container,
            { paddingBottom: Math.max(140, insets.bottom + 122) },
          ]}
        >
          {/* HEADER ACTIONS */}
          <View style={styles.headerRow}>
            <TouchableOpacity style={styles.headerActionBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={moderateScale(28)} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerActionBtn}
              onPress={() => navigation.navigate("Tabs", { screen: "Destination" })}
            >
              <Icon name="home-outline" size={moderateScale(22)} color={ORANGE} />
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
                {processingStart}
                {processingHighlight ? (
                  <>
                    {processingStart ? " " : ""}
                    <Text style={styles.processingTextHighlight}>
                      {processingHighlight}
                    </Text>
                  </>
                ) : null}
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

                    <Text style={styles.reviewRating}>Rating {item.rating}</Text>
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
              onChangeText={(text) => {
                setFaqSearch(text);
                setOpenIndex(null);
                if (text.trim().length > 0) {
                  setShowAllFaqs(true);
                } else {
                  setShowAllFaqs(false);
                }
              }}
              placeholder="Search for answers"
              placeholderTextColor="#9CA3AF"
              style={styles.faqSearchInput}
            />
          </View>

          {/* FAQ list */}
          {filteredFaqs.length === 0 ? (
            <Text style={styles.noFaqText}>No matching FAQ found.</Text>
          ) : (
            visibleFaqs.map((item, index) => (
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
            ))
          )}

          {canToggleFaqList ? (
            <TouchableOpacity
              onPress={() => {
                setShowAllFaqs((prev) => !prev);
                setOpenIndex(null);
              }}
              style={styles.faqMoreBtn}
              activeOpacity={0.85}
            >
              <Text style={styles.faqMoreBtnText}>
                {showAllFaqs ? "Show less FAQs" : "More FAQs"}
              </Text>
            </TouchableOpacity>
          ) : null}


          {finalIsVisaFree && (
            <View style={{ marginTop: 32 }}>
              <Text style={styles.centerSectionTitle}>
                Popular Destinations for Indians
              </Text>

              <View style={styles.highlightList}>
                {highlightCountries.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => handleCountryPress(item)}
                    style={styles.highlightCountryCard}
                  >
                    <CountryFlag
                      isoCode={(COUNTRY_ISO_MAP[item.countrName] || "UN").toLowerCase()}
                      size={28}
                    />
                    <Text style={styles.highlightCountryName}>
                      {item.countrName}
                    </Text>

                    <Icon
                      name="chevron-forward"
                      size={18}
                      color="#9CA3AF"
                      style={styles.highlightCountryArrow}
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
                    <Text style={styles.counterBtn}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.counterValue}>{travellers}</Text>

                  <TouchableOpacity
                    onPress={() => setTravellers((prev) => prev + 1)}
                  >
                    <Text style={styles.counterBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.divider} />

              {/* TOTAL */}
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
              </View>

              <View style={styles.noticeBar}>
                <View style={styles.noticeTrack}>
                  <Animated.View
                    style={[
                      styles.noticeMarquee,
                      {
                        transform: [
                          {
                            translateX: noticeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [SCREEN_WIDTH * 0.45, -SCREEN_WIDTH * 1.75],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <View style={styles.noticeItem}>
                      <View style={styles.noticeIconWrap}>
                        <Icon name="alert" size={14} color="#A35D00" />
                      </View>
                      <Text style={styles.noticeText}>
                        {NOTICE_TEXT}
                      </Text>
                    </View>
                    <View style={styles.noticeItem}>
                      <View style={styles.noticeIconWrap}>
                        <Icon name="alert" size={14} color="#A35D00" />
                      </View>
                      <Text style={styles.noticeText}>
                        {NOTICE_TEXT}
                      </Text>
                    </View>
                  </Animated.View>
                </View>
              </View>

            </View>
          )}

        </ScrollView>

        {/* STICKY ACTION BUTTON */}
        <View
          style={[styles.stickyButtonRow, { bottom: Math.max(14, insets.bottom + 10) }]}
        >
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
  screen: { flex: 1, backgroundColor: "#F4F7FC" },
  container: { padding: 14, paddingTop: 10 },

  countryCard: {
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 3,
  },

  countryHeader: {
    alignItems: "center",
    marginBottom: 12,
  },

  countryName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",

    maxWidth: "90%",        // ⬅️ keeps it centered visually
    lineHeight: 28,         // ⬅️ clean wrapping
    marginTop: 10,
  },

  processingText: {
    fontSize: 14,
    color: "#475569",
    marginTop: 8,           // ⬅️ space from title
    textAlign: "center",
  },

  processingTextHighlight: {
    color: "#FF5C00",
    fontWeight: "800",
  },
  processingNote: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  subText: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  bold: { fontWeight: "700" },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
    marginTop: 18,
  },



  infoGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },



  infoItemCentered: {
    width: "45%",
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  infoLabelCentered: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 2,
  },
  infoValueCentered: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
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
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    width: "100%",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },


  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
    marginTop: 4,
  },


  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },

  reviewAvatar: { width: 36, height: 36, borderRadius: 18 },
  reviewName: { fontSize: 14, fontWeight: "700" },
  reviewTime: { fontSize: 12, color: "#64748B" },
  reviewRating: { fontSize: 12, fontWeight: "700", color: "#0F172A" },
  reviewText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 19,
    textAlign: "justify",
  },

  buttonRow: { marginTop: 20 },
  stickyButtonRow: {
    position: "absolute",
    left: 14,
    right: 14,
    bottom: 14,
  },
  secondaryBtn: {
    backgroundColor: "#FF5C00",
    height: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5C00",
    shadowOpacity: 0.28,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 5,
  },

  secondaryText: {
    fontWeight: "700",
    color: "#fff",
    fontSize: 16,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },

  stepCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
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
    fontSize: 10,
    color: "#9CA3AF",
    textAlign: "center",
  },

  processCardCentered: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    minHeight: 206,
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
    color: "#334155",
    flex: 1,
    lineHeight: 19,
  },

  requirementsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
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
    backgroundColor: "#F7FAFC",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
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
    marginBottom: 8,
  },

  stepLabelActive: {
    color: "#FF5C00",
    fontWeight: "700",
  },

  priceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginTop: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
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
    backgroundColor: "#F8FAFC",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  counterBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "#1F2937",
    backgroundColor: "#FFFFFF",
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
    fontSize: 22,
    fontWeight: "900",
    color: "#FF5C00",
  },
  noticeBar: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#F8D287",
    borderRadius: 12,
    backgroundColor: "#FFF8E1",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 12,
  },
  noticeIconWrap: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FCE79E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  noticeTrack: {
    flex: 1,
    overflow: "hidden",
  },
  noticeMarquee: {
    flexDirection: "row",
    alignItems: "center",
  },
  noticeItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  noticeText: {
    color: "#7C4A03",
    fontSize: 13,
    fontWeight: "600",
    maxWidth: SCREEN_WIDTH * 2,
    includeFontPadding: false,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerActionBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
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

  faqSearchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 11,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D8E1ED",
    width: "100%",
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
    color: "#0F172A",
    marginBottom: 12,
    marginTop: 22,
    textAlign: "center",
    lineHeight: 24,
  },
  faqItem: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
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
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#EEF2F7",
  },

  faqAnswer: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 21,
  },
  faqMoreBtn: {
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 10,
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  faqMoreBtnText: {
    color: "#C2410C",
    fontSize: 13,
    fontWeight: "700",
  },
  highlightList: {
    gap: 12,
  },
  highlightCountryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#0F172A",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },
  highlightCountryName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  highlightCountryArrow: {
    marginLeft: "auto",
  },


});


