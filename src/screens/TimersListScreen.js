// src/screens/TimersListScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { fetchTimers } from '../services/api';

export default function TimersListScreen({ navigation }) {
  const [timers, setTimers] = useState([]);

  const load = async () => {
    try {
      const data = await fetchTimers();
      setTimers(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    return unsub;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={timers}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderBottomWidth: 1 }}>
            <Text style={{ fontSize: 16 }}>{item.name}</Text>
            <Text>Duration: {item.duration}s</Text>
          </View>
        )}
      />
      <Button title="New Timer" onPress={() => navigation.navigate('NewTimer')} />
    </View>
  );
}
