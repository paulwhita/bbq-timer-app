// src/screens/NewTimerScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { createTimer } from '../services/api';

export default function NewTimerScreen({ navigation }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const onSubmit = async () => {
    const dur = parseInt(duration, 10);
    if (!name || isNaN(dur)) {
      Alert.alert('Invalid input', 'Name and duration are required.');
      return;
    }
    try {
      await createTimer({ name, duration: dur });
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Timer name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={{ marginBottom: 12, borderBottomWidth: 1 }}
      />
      <Button title="Create Timer" onPress={onSubmit} />
    </View>
  );
}
