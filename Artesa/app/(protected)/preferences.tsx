import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../constants/translations';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '@/store/slices/usersSlice';
import { BASE_URL } from '@/config/api';
import { RootState } from '@/store/store';
import axios from "axios";


const PreferencesScreen: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const containerStyle = theme === 'light' ? styles.containerLight : styles.containerDark;
  const titleStyle = styles.titleCafesito;
  const subtitleStyle = styles.subtitleCafesito;
  const buttonStyle = theme === 'light' ? styles.buttonCafesitoLight : styles.buttonCafesitoDark;
  const buttonTextStyle = styles.buttonTextCafesito;
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            console.log("base url: " + BASE_URL);
            const response = await axios.get("http://192.168.1.34:5144/api/Usuarios");
            dispatch(setUsers(response.data))
        }
        catch (err: any) {
            console.log("Error de Axios: ", err.message);
            console.log("Error completo: ", err.toJSON?.());
        }
    };
    fetchUsers();
}, [dispatch])
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{t.preferencesTitle}</Text>

      {}
      <Text style={[styles.subtitle, subtitleStyle]}>{t.themeLabel}</Text>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={toggleTheme}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>
          {theme === 'light' ? t.changeToDark : t.changeToLight}
        </Text>
      </TouchableOpacity>

      {
        
      }
      <Text style={[styles.subtitle, subtitleStyle]}>{t.languageLabel}</Text>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={toggleLanguage}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>
          {language === 'es' ? t.changeToEnglish : t.changeToSpanish}
        </Text>
      </TouchableOpacity>

      {}
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={() => router.push('/(protected)/home')}
      >
        <Text style={[styles.buttonText, buttonTextStyle]}>{t.goBack}</Text>
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
  containerLight: {
    backgroundColor: '#F5F5DC', 
  },
  containerDark: {
    backgroundColor: '#3E2723', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  titleCafesito: {
    color: '#8B4513',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  subtitleCafesito: {
    color: '#6D4C41', 
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
});

export default PreferencesScreen;
