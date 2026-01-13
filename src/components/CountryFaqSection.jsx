import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getCountryFaqs } from '../utils/countryFaqs';

const CountryFaqSection = ({ countryName }) => {
  const faqs = getCountryFaqs(countryName);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQs</Text>

      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <Text style={styles.question}>{faq.question}</Text>
          <Text style={styles.answer}>{faq.answer}</Text>
        </View>
      ))}
    </View>
  );
};

export default CountryFaqSection;

/* =======================
   STYLES
======================== */
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    color: '#111827',
  },
  faqItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 6,
  },
  answer: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
});
