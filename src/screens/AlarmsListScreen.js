// src/screens/AlarmsListScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { fetchAlarms } from '../services/api';
import * as Notifications from 'expo-notifications';
import { useFocusEffect } from '@react-navigation/native';

export default function AlarmsListScreen({ navigation }) {
  const [alarms, setAlarms] = useState([]);

  // Load from server and schedule notifications
  const loadAndSchedule = async () => {
    try {
      const data = await fetchAlarms();
      setAlarms(data);

      // Schedule a notification for each alarm
      data.forEach(({ id, name, trigger_time }) => {
        const [hh, mm] = trigger_time.split(':').map(Number);
        let triggerDate = new Date();
        triggerDate.setHours(hh, mm, 0, 0);
        // If that time has already passed today, schedule for tomorrow
        if (triggerDate <= new Date()) {
          triggerDate.setDate(triggerDate.getDate() + 1);
        }
        Notifications.scheduleNotificationAsync({
          content: {
            title: `⏰ ${name}`,
            body: `Alarm for ${trigger_time}`,
            sound: true,
          },
          trigger: triggerDate,
        });
      });
    } catch (e) {
      console.error('Error loading alarms:', e);
    }
  };

  // Use focus effect to reload & reschedule whenever screen comes into view
  useFocusEffect(
    React.useCallback(() => {
      loadAndSchedule();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={alarms}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16, marginBottom: 4 }}>{item.name}</Text>
            <Text>Time: {item.trigger_time}</Text>
          </View>
        )}
      />
      <Button
        title="New Alarm"
        onPress={() => navigation.navigate('NewAlarm')}
      />
    </View>
  );
}

