import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = ({ style }) => {
  const currentYear = new Date().getFullYear(); 

  return (
    <View style={[styles.footer, style]}>
      <Text style={styles.footerText}>© {currentYear} HemoLink</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    paddingVertical: 15, 
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
});

export default Footer;