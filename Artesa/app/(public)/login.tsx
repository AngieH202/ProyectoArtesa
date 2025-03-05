// app/(public)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../constants/translations';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../../components/CustomButton';
import { FontAwesome } from '@expo/vector-icons'; 

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = styles.titleCafesito;
  const inputStyle = theme === 'light' ? styles.inputLight : styles.inputDark;
  const buttonStyle = theme === 'light' ? styles.buttonCafesitoLight : styles.buttonCafesitoDark;
  const buttonTextStyle = styles.buttonTextCafesito;

  const handleLogin = () => {
    if (!email.endsWith('@gmail.com')) {
      Alert.alert('Error', 'Por favor, ingresa un correo de Gmail válido.');
      return;
    }
    login(email);
    router.replace('/(protected)/home');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FontAwesome name="user-circle" size={100} color="#8B4513" style={styles.icon} />
      <Text style={[styles.title, titleStyle]}>Bienvenido a ARTESA</Text>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={t.emailPlaceholder}
        placeholderTextColor={theme === 'light' ? Colors.text : Colors.white}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <CustomButton
        title={t.loginButton}
        onPress={handleLogin}
        style={[styles.button, buttonStyle]}
        textStyle={[styles.buttonText, buttonTextStyle]}
      />
      <TouchableOpacity onPress={() => router.push('/(public)/register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? <Text style={styles.registerLink}>Crear cuenta</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleCafesito: {
    color: '#8B4513', 
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonCafesitoLight: {
    backgroundColor: '#A0522D', 
  },
  buttonCafesitoDark: {
    backgroundColor: '#5C2E1F', 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextCafesito: {
    color: '#FFFFFF', 
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#6D4C41',
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#8B4513',
  },
  containerLight: {
    backgroundColor: Colors.background,
  },
  containerDark: {
    backgroundColor: Colors.black,
  },
  inputLight: {
    borderColor: Colors.primary,
    color: Colors.text,
  },
  inputDark: {
    borderColor: Colors.accent,
    color: Colors.white,
  },
});

export default LoginScreen;