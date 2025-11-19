// src/screens/questions/QuestionScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { saveAnswers } from '../../api/user/answerService';

const QUESTIONS = [
  'What is your travel purpose?',
  'Which country are you visiting?',
  'How long will you stay?',
  'Do you have previous travel history?',
];

export default function QuestionScreen({ navigation }) {
  const [answers, setAnswers] = useState({});

  const update = (q, v) => setAnswers(prev => ({ ...prev, [q]: v }));

  const submit = async () => {
    await saveAnswers(answers);
    navigation.navigate('ReviewAnswersScreen', { answers });
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {QUESTIONS.map(q => (
        <View key={q} style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: '600', marginBottom: 4 }}>{q}</Text>
          <TextInput
            style={{ borderWidth: 1, borderRadius: 8, padding: 8 }}
            multiline
            onChangeText={v => update(q, v)}
          />
        </View>
      ))}
      <Button title="Submit Answers" onPress={submit} />
    </ScrollView>
  );
}
