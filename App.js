import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Notifications from 'expo-notifications';

import AlarmsListScreen from './src/screens/AlarmsListScreen';
import NewAlarmScreen from './src/screens/NewAlarmScreen';

const Stack = createNativeStackNavigator();

// Tell Expo how to handle incoming notifications when the app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  // On first load, ask the user for notification permissions
  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Notification permissions not granted!');
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Alarms" component={AlarmsListScreen} />
        <Stack.Screen name="NewAlarm" component={NewAlarmScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
