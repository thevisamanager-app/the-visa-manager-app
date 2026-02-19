import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getCountryFaqs } from '../utils/countryFaqs';

const CountryFaqSection = ({ countryName }) => {
  const [faqSearch, setFaqSearch] = useState('');
  const faqs = getCountryFaqs(countryName);
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FAQs</Text>

      <View style={styles.faqSearchBox}>
        <Ionicons name="search-outline" size={18} color="#9CA3AF" />
        <TextInput
          value={faqSearch}
          onChangeText={setFaqSearch}
          placeholder="Search for answers"
          placeholderTextColor="#9CA3AF"
          style={styles.faqSearchInput}
        />
      </View>

      {filteredFaqs.length === 0 ? (
        <Text style={styles.noFaqText}>No matching FAQ found.</Text>
      ) : (
        filteredFaqs.map((faq, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))
      )}
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
  faqSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  faqSearchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#111827',
  },
  noFaqText: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 12,
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
