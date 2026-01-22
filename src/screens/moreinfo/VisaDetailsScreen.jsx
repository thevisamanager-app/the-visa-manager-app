import React, { useState, useEffect } from "react";
// import React from "react";
// import { useSelector } from "react-redux";
// import CountryFlag from "react-native-country-flag";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
// } from "react-native";
// import { getCountryFaqs } from "../../utils/countryFaqs";
// import { COUNTRY_ISO_MAP } from "../../utils/countryIsoMap";
// import ScreenWrapper from "../../components/ScreenWrapper";
// import CountryImageSlider from "../../components/CountryImageSlider";
// import { COUNTRY_IMAGES } from "../../utils/countryImages";
// import React, { useEffect, useState } from "react";
// import { ActivityIndicator, Image, Linking } from "react-native";
// import { fetchGoogleReviews } from "../../services/reviews/googleReviews";




// export default function VisaDetailsScreen({ navigation }) {
//   const selected = useSelector((state) => state.destinations.selected);

//   const countryName = selected?.countrName || "Country";
//   const isoCode = (COUNTRY_ISO_MAP[countryName] || "un").toLowerCase();
//   const images = COUNTRY_IMAGES[countryName] || COUNTRY_IMAGES.default;

//   const faqs = getCountryFaqs(countryName);
//   const [reviews, setReviews] = useState([]);
//   const [loadingReviews, setLoadingReviews] = useState(true);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   useEffect(() => {
//     fetchGoogleReviews()
//       .then(setReviews)
//       .catch((e) => console.log("Reviews fetch error:", e))
//       .finally(() => setLoadingReviews(false));
//   }, []);
//   const recentReviews = [...reviews]
//     .sort((a, b) => b.time - a.time)
//     .slice(0, 3); // show latest 3



//   return (
//     <ScreenWrapper>
//       <ScrollView contentContainerStyle={styles.container}>

//         {/* COUNTRY VISA CARD */}
//         <View style={styles.countryCard}>
//           <View style={styles.countryHeader}>
//             <CountryFlag isoCode={isoCode} size={48} />
//             <Text style={styles.countryName}>{countryName}</Text>

//             <Text style={styles.processingText}>
//               Get your visa by <Text style={styles.bold}>10 Jan</Text>
//             </Text>

//             <Text style={styles.subText}>Quick & Easy Process</Text>
//           </View>
//         </View>

//         {/* PLACES TO VISIT HEADING */}
//         <Text style={styles.sectionTitle}>Places to Visit</Text>

//         {/* COUNTRY IMAGE SLIDER */}
//         <CountryImageSlider images={images} />

//         {/* VISA INFO */}
//         <Text style={styles.sectionTitle}>Visa Information</Text>
//         <View style={styles.infoGrid}>
//           <InfoItem label="Visa Type" value="Tourist / Business / Transit" index={0} />
//           <InfoItem label="Validity Period" value="30 days" index={1} />
//           <InfoItem label="Entry" value="Single / Multiple Entry" index={2} />
//           <InfoItem label="Length of Stay" value="30 days" index={3} />
//           <InfoItem label="Visa Accepted At" value="All Ports Of Entry" index={4} />

//         </View>

//         {/* DOCUMENTS */}
//         <Text style={styles.sectionTitle}>Documents Required</Text>

//         <View style={styles.docCard}>
//           <Text style={styles.docTitle}>Passport</Text>
//           <Text style={styles.docDesc}>
//             Auto-scanned. Auto-filled. No manual errors.
//           </Text>
//         </View>

//         <View style={styles.docCard}>
//           <Text style={styles.docTitle}>Photo</Text>
//           <Text style={styles.docDesc}>
//             Auto-scanned. Auto-filled. No manual errors.
//           </Text>
//         </View>

//         {/* FAQs */}
//         <Text style={styles.sectionTitle}>FAQs</Text>
//         <View style={styles.faqCard}>
//           {faqs.map((faq, index) => (
//             <View key={index} style={styles.faqItem}>
//               <Text style={styles.faqQuestion}>{faq.question}</Text>
//               <Text style={styles.faqAnswer}>{faq.answer}</Text>
//             </View>
//           ))}
//         </View>
//         {/* GOOGLE REVIEWS (Under FAQs) */}
//         <Text style={styles.sectionTitle}>Google Reviews</Text>

//         <View style={styles.reviewCard}>
//           {loadingReviews ? (
//             <ActivityIndicator color="#FF5C00" />
//           ) : (
//             (showAllReviews ? reviews : reviews.slice(0, 2)).map((item, index) => (
//               <View key={index} style={styles.reviewItem}>
//                 <View style={styles.reviewHeader}>
//                   {item.profile_photo_url ? (
//                     <Image source={{ uri: item.profile_photo_url }} style={styles.reviewAvatar} />
//                   ) : null}

//                   <View style={{ flex: 1 }}>
//                     <Text style={styles.reviewName}>{item.author_name}</Text>
//                     <Text style={styles.reviewTime}>{item.relative_time_description}</Text>
//                   </View>

//                   <Text style={styles.reviewRating}>⭐ {item.rating}</Text>
//                 </View>

//                 <Text numberOfLines={showAllReviews ? 6 : 3} style={styles.reviewText}>
//                   {item.text}
//                 </Text>
//               </View>
//             ))
//           )}

//           {!loadingReviews && reviews.length > 2 && (
//             <TouchableOpacity onPress={() => setShowAllReviews((s) => !s)} style={{ marginTop: 6 }}>
//               <Text style={styles.reviewLink}>
//                 {showAllReviews ? "Show less" : "View all reviews"}
//               </Text>
//             </TouchableOpacity>
//           )}

//           <TouchableOpacity
//             onPress={() =>
//               Linking.openURL(
//                 "https://search.google.com/local/writereview?placeid=ChIJ3bPWBbqVwjsRsIr6lWmT0uA"
//               )
//             }
//             style={{ marginTop: 10 }}
//           >
//             <Text style={styles.reviewLink}>Rate us on Google</Text>
//           </TouchableOpacity>
//         </View>
//         {/* ACTION BUTTON */}
//         <View style={styles.buttonRow}>
//           <TouchableOpacity
//             style={styles.secondaryBtn}
//             onPress={() => navigation.navigate("TravelDateScreen")}
//           >
//             <Text style={styles.secondaryText}>
//               Start New Application
//             </Text>
//           </TouchableOpacity>
//         </View>

//       </ScrollView>
//     </ScreenWrapper>
//   );
// }


// /* =======================
//    REUSABLE INFO ITEM
// ======================== */
// function InfoItem({ label, value, index }) {
//   return (
//     <View
//       style={[
//         styles.infoItem,
//         index % 2 === 1 && styles.rightColumn, // 👈 move right column
//       ]}
//     >

//       <Text style={styles.infoLabel}>{label}</Text>
//       <Text style={styles.infoValue}>{value}</Text>
//     </View>
//   );
// }

// /* =======================
//    STYLES (UNCHANGED)
// ======================== */
// const styles = StyleSheet.create({
//   safe: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//   },
//   container: {
//     padding: 16,
//     paddingBottom: 40,
//   },

//   countryCard: {
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 24,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: "#FF5C00",
//     borderRadius: 14,
//     backgroundColor: "#FFFFFF",

//     shadowColor: "#FF5C00",
//     shadowOffset: { width: 6, height: 6 },
//     shadowOpacity: 20,
//     shadowRadius: 20,
//     elevation: 10,
//   },

//   countryHeader: {
//     alignItems: "center",
//   },

//   centerFlag: {
//     marginBottom: 8,
//   },

//   countryName: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   processingText: {
//     fontSize: 13,
//     color: "#6B7280",
//     marginTop: 4,
//     textAlign: "center",
//   },
//   bold: {
//     fontWeight: "700",
//   },

//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#111827",
//     marginBottom: 12,
//   },

//   infoGrid: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 16,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//     borderRadius: 14,
//     backgroundColor: "#FFFFFF",

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 4,
//   },
//   subText: {
//     fontSize: 13,
//     color: "#6B7280",
//     marginTop: 4,
//     textAlign: "center",
//   },
//   infoItem: {
//     width: "48%",
//     marginBottom: 14,
//   },

//   infoLabel: {
//     fontSize: 12,
//     color: "#6B7280",
//   },

//   infoValue: {
//     fontSize: 15,
//     fontWeight: "600",
//     color: "#111827",
//   },

//   docCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 12,
//     alignItems: "flex-start",
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//     borderRadius: 14,
//     backgroundColor: "#FFFFFF",

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 4,
//   },

//   docTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   docDesc: {
//     fontSize: 13,
//     color: "#6B7280",
//     marginTop: 4,
//   },

//   faqCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//     borderRadius: 14,
//     backgroundColor: "#FFFFFF",

//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 4,
//   },

//   faqItem: {
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderColor: "#E5E7EB",
//   },

//   faqQuestion: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#111827",
//     marginBottom: 6,
//   },

//   faqAnswer: {
//     fontSize: 13,
//     color: "#6B7280",
//     lineHeight: 18,
//   },

//   buttonRow: {
//     flexDirection: "row",
//     marginTop: 20,
//     gap: 12,
//   },

//   secondaryBtn: {
//     flex: 1,
//     borderWidth: 1,
//     backgroundColor: '#FF5C00',
//     borderColor: "#dbd4d1ff",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },

//   secondaryText: {
//     fontWeight: "600",
//     color: "#fff",
//   },

//   primaryText: {
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   rightColumn: {
//     paddingLeft: 40,   // 👈 adjust (6–12 works best)
//   },
//   reviewCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     padding: 16,
//     marginBottom: 24,
//     borderWidth: 1,
//     borderColor: "#F3F4F6",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 4,
//   },

//   reviewItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderColor: "#E5E7EB",
//   },

//   reviewHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//     gap: 10,
//   },

//   reviewAvatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: "#EEE",
//   },

//   reviewName: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   reviewTime: {
//     fontSize: 12,
//     color: "#6B7280",
//     marginTop: 2,
//   },

//   reviewRating: {
//     fontSize: 13,
//     fontWeight: "700",
//     color: "#111827",
//   },

//   reviewText: {
//     fontSize: 13,
//     color: "#6B7280",
//     lineHeight: 18,
//   },

//   reviewLink: {
//     color: "#FF5C00",
//     fontWeight: "700",
//     fontSize: 13,
//   },



// });

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CountryFlag from "react-native-country-flag";
import Icon from "react-native-vector-icons/Ionicons";
import DESTINATIONS from "../../assets/data/destinations";

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

export default function VisaDetailsScreen({ navigation }) {
  const selected = useSelector((state) => state.destinations.selected);
  const countryName = selected?.countrName || "Country";
  const toNumber = (val) => {
    if (!val) return 0;
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      return Number(val.replace(/[^\d.]/g, "")) || 0;
    }
    return 0;
  };
  const destinationPrice = DESTINATIONS.find(
    (item) => item.countrName === countryName
  );
  const travellers = 1;

  const visaManagerFee = toNumber(destinationPrice?.VisaManagerFee);
  const authorityCharges = toNumber(destinationPrice?.AuthorityCharges);
  const governmentFee = toNumber(destinationPrice?.GovernmentFee);

  const payNow = governmentFee * travellers;
  const payLater = (visaManagerFee + authorityCharges) * travellers;
  const totalAmount = payNow + payLater;
  const isoCode = (COUNTRY_ISO_MAP[countryName] || "un").toLowerCase();
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) =>
        prev < PROCESS_STEPS.length - 1 ? prev + 1 : 0
      );
    }, 3500); // 3.5 seconds (you can tune 3000–4000)

    return () => clearInterval(interval);
  }, []);


  const PROCESS_STEPS = [
    {
      title: "Share traveler details",
      points: [
        "Provide passport, photo, and itinerary securely.",
        "Our team reviews documents before submission.",
        "Confirm details so we can proceed."
      ],
    },
    {
      title: "Pay visa fees",
      points: [
        "Clear government and service charges securely.",
        "Instant payment confirmation.",
        "We track and ticket your application."
      ],
    },
    {
      title: "Submit to immigration",
      points: [
        "Application forwarded to immigration authority.",
        "Queries handled on your behalf.",
        "Status updates until decision."
      ],
    },
    {
      title: "Receive approval",
      points: [
        "Download approval letter once issued.",
        "Carry it with your passport.",
        "You are all set to travel."
      ],
    },
  ];

  const STEP_META = [
    { icon: "document-text-outline", label: "Details" },
    { icon: "card-outline", label: "Payment" },
    { icon: "send-outline", label: "Submit" },
    { icon: "checkmark-done-outline", label: "Approved" },
  ];


  const faqs = getCountryFaqs(countryName);

  // 🔹 Google Reviews state
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);


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
      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER ACTIONS */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerBtn}
          >
            <Icon name="arrow-back-outline" size={22} color="#FF5C00" />
            
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("Destination")}
            style={styles.headerBtn}
          >
            <Icon name="home-outline" size={22} color="#FF5C00" />
          </TouchableOpacity>
        </View>

        {/* COUNTRY VISA CARD */}
        <View style={styles.countryCard}>
          <View style={styles.countryHeader}>
            <CountryFlag isoCode={isoCode} size={48} />
            <Text style={styles.countryName}>{countryName}</Text>

            <Text style={styles.processingText}>
              Apply Now & Get Visa By<Text style={styles.bold}> 3-5 Working Days </Text>
            </Text>

            <Text style={styles.subText}>Quick & Easy Process</Text>
          </View>
        </View>
        {/* VISA PROCESS */}
        <View style={styles.processWrapper}>

          {/* STEP INDICATOR */}
          <View style={styles.stepperContainer}>

            {/* BASE LINE */}
            <View style={styles.stepLineBase} />

            {/* ACTIVE LINE */}
            <View
              style={[
                styles.stepLineActive,
                {
                  width: `${(activeStep / (PROCESS_STEPS.length - 1)) * 100}%`,
                },
              ]}
            />

            {/* STEP CIRCLES */}
            <View style={styles.stepRow}>
              {PROCESS_STEPS.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.stepCircle,
                    index <= activeStep && styles.stepActive,
                  ]}
                  onPress={() => setActiveStep(index)}
                >
                  <Icon
                    name={
                      index < activeStep
                        ? "checkmark"
                        : STEP_META[index].icon
                    }
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
          <View style={styles.processCard}>
            <Text style={styles.processTitle}>
              {PROCESS_STEPS[activeStep].title}
            </Text>

            {PROCESS_STEPS[activeStep].points.map((p, i) => (
              <View key={i} style={styles.processPoint}>
                <Text style={styles.tick}>✓</Text>
                <Text style={styles.processText}>{p}</Text>
              </View>
            ))}
          </View>

        </View>


        {/* VISA INFO */}
        <Text style={styles.sectionTitle}>Visa Information</Text>
        <View style={styles.infoGrid}>
          <InfoItem
            label="Visa Type"
            value="Tourist & Business"
            icon="document-text-outline"
            iconBg="#EEF2FF"
          />

          <InfoItem
            label="Length of Stay"
            value="30 days"
            icon="calendar-outline"
            iconBg="#EFF6FF"
          />

          <InfoItem
            label="Validity"
            value="90 days"
            icon="time-outline"
            iconBg="#ECFDF5"
          />

          <InfoItem
            label="Entry"
            value="Single / Multiple"
            icon="repeat-outline"
            iconBg="#F5F3FF"
          />

          <InfoItem
            label="Method"
            value="Paperless"
            icon="cloud-done-outline"
            iconBg="#FFF7ED"
          />

        </View>

        {/* VISA REQUIREMENTS */}
        <Text style={styles.sectionTitle}>
          {countryName} Visa Requirements
        </Text>

        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsSubTitle}>
            Keep these ready before you apply
          </Text>

          <View style={styles.requirementsGrid}>

            <View style={styles.requirementItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.requirementText}>
                Valid passport with at least six months validity
              </Text>
            </View>

            <View style={styles.requirementItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.requirementText}>
                Recent passport-size photograph with a white background
              </Text>
            </View>

            <View style={styles.requirementItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.requirementText}>
                Confirmed flights and return itinerary
              </Text>
            </View>

            <View style={styles.requirementItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.requirementText}>
                Hotel bookings or host contact details
              </Text>
            </View>

            <View style={styles.requirementItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.requirementText}>
                Bank statement or proof of funds
              </Text>
            </View>

          </View>
        </View>


        {/* FAQs */}
        <Text style={styles.sectionTitle}>FAQs</Text>
        <View style={styles.faqCard}>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>
        {/* PRICE SUMMARY */}
        <View style={styles.priceCard}>
          <View style={styles.priceHeader}>
            <Icon name="people-outline" size={18} color="#374151" />
            <Text style={styles.priceHeaderText}>Travellers</Text>

            <View style={styles.counter}>
              <Text style={styles.counterBtn}>−</Text>
              <Text style={styles.counterValue}>{travellers}</Text>
              <Text style={styles.counterBtn}>+</Text>
            </View>
          </View>

          <View style={styles.payNowSection}>
            <Text style={styles.amountBig}>₹{payNow}</Text>
            <Text style={styles.payNowLabel}>TO BE PAID NOW</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.priceRow}>
            <View style={styles.rowLeft}>
              <Icon name="card-outline" size={18} color="#374151" />
              <View>
                <Text style={styles.rowTitle}>Pay Now</Text>
                <Text style={styles.rowSub}>Government Fees × {travellers}</Text>
              </View>
            </View>
            <Text style={styles.rowAmount}>₹{payNow}</Text>
          </View>

          <View style={styles.priceRow}>
            <View style={styles.rowLeft}>
              <Icon name="time-outline" size={18} color="#374151" />
              <View>
                <Text style={styles.rowTitle}>Pay Later</Text>
                <Text style={styles.rowSub}>TVM Fees × {travellers}</Text>
              </View>
            </View>
            <Text style={styles.rowAmount}>₹{payLater}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>
        </View>



        {/* GOOGLE REVIEWS (UNDER FAQ) */}
        <Text style={styles.sectionTitle}>Latest Google Reviews</Text>

        <View style={styles.reviewCard}>
          {loadingReviews ? (
            <ActivityIndicator color="#FF5C00" />
          ) :(
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

        {/* ACTION BUTTON */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigation.navigate("TravelDateScreen")}
          >
            <Text style={styles.secondaryText}>Start New Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper >
  );
}

/* =======================
   REUSABLE INFO ITEM
======================== */
function InfoItem({ label, value, index, icon, iconBg }) {
  return (
    <View
      style={[
        styles.infoItem,
        index % 2 === 1 && styles.rightColumn,
        index % 2 === 1 && styles.rightColumn,
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Icon name={icon} size={22} color="#111827" />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

/* =======================
   STYLES
======================== */
const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40 },

  countryCard: {
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FF5C00",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    elevation: 10,
  },

  countryHeader: { alignItems: "center" },
  countryName: { fontSize: 18, fontWeight: "700", color: "#111827" },
  processingText: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  subText: { fontSize: 13, color: "#6B7280", marginTop: 4 },
  bold: { fontWeight: "700" },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 12,
  },

  infoGrid: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    elevation: 4,
  },

  infoItem: { width: "48%", marginBottom: 14 },
  rightColumn: { paddingLeft: 40 },
  infoLabel: { fontSize: 12, color: "#6B7280" },
  infoValue: { fontSize: 15, fontWeight: "600", color: "#111827" },

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

  faqItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  faqQuestion: { fontSize: 14, fontWeight: "600" },
  faqAnswer: { fontSize: 13, color: "#6B7280" },

  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 24,
    elevation: 4,
  },

  reviewItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },

  reviewHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18 },
  reviewName: { fontSize: 14, fontWeight: "700" },
  reviewTime: { fontSize: 12, color: "#6B7280" },
  reviewRating: { fontSize: 13, fontWeight: "700" },
  reviewText: { fontSize: 13, color: "#6B7280", lineHeight: 18 },
  reviewLink: { color: "#FF5C00", fontWeight: "700" },

  buttonRow: { marginTop: 20 },
  secondaryBtn: {
    backgroundColor: "#FF5C00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  secondaryText: {
    fontWeight: "600",
    color: "#fff",
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

  processCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FFE5D0",

    minHeight: 200,          // ✅ KEY FIX
    justifyContent: "flex-start",
  },


  processTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  processPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  tick: {
    color: "#FF5C00",
    fontWeight: "700",
    marginRight: 8,
  },

  processText: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
  },
  requirementsCard: {
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#FFE5D0",
  },

  requirementsSubTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 14,
  },

  requirementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  requirementItem: {
    width: "48%",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  checkIcon: {
    color: "#FF5C00",
    fontWeight: "800",
    marginRight: 8,
    marginTop: 2,
  },

  requirementText: {
    fontSize: 13,
    color: "#374151",
    flex: 1,
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

});

