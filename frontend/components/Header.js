import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = ({ title, style, rightComponent, leftComponent }) => {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.side}>{leftComponent}</View>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.side}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#f8f8f8',
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'center',
  },
  side: {
    flex: 1,
  },
});

export default Header;