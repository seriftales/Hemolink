import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NearbyCentersScreen = () => {
  return (
    <View style={styles.container}>
      <Text>En Yakın Kan Bağış Merkezleri</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NearbyCentersScreen;