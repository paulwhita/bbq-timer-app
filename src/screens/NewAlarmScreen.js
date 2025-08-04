// src/screens/NewAlarmScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as Notifications from 'expo-notifications';
import { createAlarm } from '../services/api';

export default function NewAlarmScreen({ navigation }) {
  const [name, setName] = useState('');
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === 'ios');
  const [soundChannel, setSoundChannel] = useState('default');

  const onChange = (e, selected) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selected) setTime(selected);
  };

  const onSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Please enter an alarm name.');
      return;
    }
    // Format HH:MM:00
    const hh = String(time.getHours()).padStart(2, '0');
    const mm = String(time.getMinutes()).padStart(2, '0');
    const trigger_time = `${hh}:${mm}:00`;

    try {
      // Create on server
      const alarm = await createAlarm({ name, trigger_time });

      // Schedule local notification with chosen sound/channel
      let triggerDate = new Date();
      triggerDate.setHours(time.getHours(), time.getMinutes(), 0, 0);
      if (triggerDate <= new Date()) {
        triggerDate.setDate(triggerDate.getDate() + 1);
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `⏰ ${alarm.name}`,
          body: `Alarm for ${trigger_time}`,
          sound: Platform.OS === 'ios' ? soundChannel + '.wav' : undefined,
        },
        trigger: { date: triggerDate, channelId: soundChannel },
      });

      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Alarm name"
        style={{ borderBottomWidth: 1, marginBottom: 12 }}
      />

      <Text>Time:</Text>
      {Platform.OS === 'android' ? (
        <>
          <Button
            title={time.toLocaleTimeString().slice(0, 5)}
            onPress={() => setShowPicker(true)}
          />
          {showPicker && (
            <DateTimePicker
              mode="time"
              value={time}
              onChange={onChange}
            />
          )}
        </>
      ) : (
        <DateTimePicker
          mode="time"
          value={time}
          onChange={onChange}
          display="spinner"
          style={{ marginBottom: 12 }}
        />
      )}

      <Text style={{ marginTop: 12 }}>Sound:</Text>
      <Picker
        selectedValue={soundChannel}
        onValueChange={setSoundChannel}
        style={{ marginBottom: 24 }}
      >
        <Picker.Item label="Default" value="default" />
        <Picker.Item label="Alarm 1" value="alarm1" />
        <Picker.Item label="Alarm 2" value="alarm2" />
      </Picker>

      <Button title="Create Alarm" onPress={onSubmit} />
    </View>
  );
}

