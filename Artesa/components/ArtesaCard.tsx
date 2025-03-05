import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ArtesaCardProps {
  title: string;
  description: string;
}

const ArtesaCard: React.FC<ArtesaCardProps> = ({ title, description }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default ArtesaCard;
