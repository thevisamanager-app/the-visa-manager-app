// // src/screens/questions/ReviewAnswersScreen.js
// import React from 'react';
// import { View, Text, ScrollView } from 'react-native';

// export default function ReviewAnswersScreen({ route }) {
//   const answers = route?.params?.answers || {};

//   return (
//     <ScrollView contentContainerStyle={{ padding: 20 }}>
//       {Object.entries(answers).map(([q, a]) => (
//         <View key={q} style={{ marginBottom: 16 }}>
//           <Text style={{ fontWeight: '700' }}>{q}</Text>
//           <Text>{a}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }


// src/screens/questions/ReviewAnswersScreen.js
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Linking } from "react-native";

export default function ReviewAnswersScreen({ route }) {
  const preview = route?.params?.preview;
  const fallbackAnswers = route?.params?.answers || {};

  if (!preview) {
    // old behavior: only answers
    return (
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {Object.entries(fallbackAnswers).map(([q, a]) => (
          <View key={q} style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "700" }}>{q}</Text>
            <Text>{a}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }

  const { passport, travel, hotel, ticket, questions } = preview;

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* PASSPORT SECTION */}
      {passport && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
            Passport Details
          </Text>
          {passport.firstName && (
            <Text>First Name: {passport.firstName}</Text>
          )}
          {passport.lastName && <Text>Last Name: {passport.lastName}</Text>}
          {passport.passportNumber && (
            <Text>Passport Number: {passport.passportNumber}</Text>
          )}
          {passport.birthDate && <Text>Birth Date: {passport.birthDate}</Text>}
          {passport.expiryDate && <Text>Expiry Date: {passport.expiryDate}</Text>}
        </View>
      )}

      {/* TRAVEL SECTION */}
      {travel && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
            Travel Details
          </Text>
          <Text>From: {travel.fromCity}, {travel.fromCountry}</Text>
          <Text>To: {travel.toCity}, {travel.toCountry}</Text>
          <Text>Departure: {travel.departureDate}</Text>
          <Text>Return: {travel.returnDate}</Text>
        </View>
      )}

      {/* HOTEL SECTION */}
      {hotel && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
            Hotel Details
          </Text>
          <Text>Hotel Name: {hotel.hotelName}</Text>
          <Text>Hotel Address: {hotel.hotelAddress}</Text>
          {hotel.hotelDetails ? (
            <Text>Details: {hotel.hotelDetails}</Text>
          ) : null}
        </View>
      )}

      {/* TICKET SECTION */}
      {ticket && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
            Ticket
          </Text>
          {ticket.name && <Text>File: {ticket.name}</Text>}
          {ticket.url && (
            <TouchableOpacity onPress={() => Linking.openURL(ticket.url)}>
              <Text style={{ color: "#007bff", marginTop: 4 }}>
                Open Ticket
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* QUESTIONS SECTION */}
      {questions && (
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
            Questions & Answers
          </Text>
          {Object.entries(questions).map(([q, a]) => (
            <View key={q} style={{ marginBottom: 12 }}>
              <Text style={{ fontWeight: "700" }}>{q}</Text>
              <Text>{a}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
