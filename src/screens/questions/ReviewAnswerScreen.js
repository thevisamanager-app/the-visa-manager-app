// src/screens/questions/ReviewAnswersScreen.js
import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export default function ReviewAnswersScreen({ route }) {
  const answers = route?.params?.answers || {};

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {Object.entries(answers).map(([q, a]) => (
        <View key={q} style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: '700' }}>{q}</Text>
          <Text>{a}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
