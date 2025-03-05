import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { Colors } from '../../constants/Colors';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../constants/translations';
import { useTheme } from '../../contexts/ThemeContext';
import CustomButton from '../../components/CustomButton';
import { FontAwesome } from '@expo/vector-icons'; 

const HomeScreen: React.FC = () => {
  const { logout, user } = useAuth();
  const { language } = useLanguage();
  const { theme } = useTheme();
  const t = translations[language];

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = theme === 'light' ? styles.titleLight : styles.titleDark;
  const buttonStyle = theme === 'light' ? styles.buttonPreferencesLight : styles.buttonPreferencesDark;
  const buttonTextStyle = theme === 'light' ? styles.buttonTextLight : styles.buttonTextDark;

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {

      }
      <FontAwesome name="paint-brush" size={60} color={Colors.primary} style={styles.iconPaint} />

      {

      }
      <Text style={[styles.title, titleStyle]}>
        Hola, {user?.email || 'Usuario'}
      </Text>

      {

      }
      <Text style={styles.subtitle}>
        Arteza es una aplicación que conecta a creadores de productos caseros con compradores interesados en artesanías y otros productos únicos.
      </Text>
      {

      }
      <CustomButton
       title={t.categoriesTitle} 
       onPress={() => router.push('/(protected)/categories')}
       style={[styles.button, buttonStyle]}
       textStyle={[styles.buttonText, buttonTextStyle]}
      />


      {}
      <CustomButton
        title={t.preferencesTitle}
        onPress={() => router.push('/(protected)/preferences')}
        style={[styles.button, buttonStyle]}
        textStyle={[styles.buttonText, buttonTextStyle]}
      />

      {}
      <CustomButton
        title={t.logout}
        onPress={handleLogout}
        style={[styles.button, buttonStyle]}
        textStyle={[styles.buttonText, buttonTextStyle]}
      />
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
  iconPaint: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.text,
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
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos para el tema claro
  containerLight: {
    backgroundColor: Colors.background,
  },
  titleLight: {
    color: Colors.primary, 
  },
  buttonPreferencesLight: {
    backgroundColor: Colors.secondary, 
  },
  buttonTextLight: {
    color: Colors.white, 
  },

  // Estilos para el tema oscuro
  containerDark: {
    backgroundColor: Colors.black,
  },
  titleDark: {
    color: Colors.white,
  },
  buttonPreferencesDark: {
    backgroundColor: Colors.accent,
  },
  buttonTextDark: {
    color: Colors.white,
  },
});

export default HomeScreen;

