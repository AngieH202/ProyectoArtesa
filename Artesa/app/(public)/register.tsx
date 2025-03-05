import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import CustomButton from "@/components/CustomButton";
import { FontAwesome } from "@expo/vector-icons";

export default function RegisterScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { theme } = useTheme();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const containerStyle = theme === "light" ? styles.containerLight : styles.containerDark;
  const titleStyle = styles.titleCafesito;
  const inputStyle = theme === "light" ? styles.inputLight : styles.inputDark;
  const buttonStyle = theme === "light" ? styles.buttonCafesitoLight : styles.buttonCafesitoDark;
  const buttonTextStyle = styles.buttonTextCafesito;

  const validateName = (text: string) => {
    setName(text);
    setErrors((prev) => ({
      ...prev,
      name: text.length < 3 ? "El nombre debe tener al menos 3 caracteres" : "",
    }));
  };

  const validateEmail = (text: string) => {
    setEmail(text);
    setErrors((prev) => ({
      ...prev,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) ? "" : "Correo no válido",
    }));
  };

  const validatePassword = (text: string) => {
    setPassword(text);
    setErrors((prev) => ({
      ...prev,
      password: text.length < 6 ? "La contraseña debe tener al menos 6 caracteres" : "",
    }));
  };

  const validateConfirmPassword = (text: string) => {
    setConfirmPassword(text);
    setErrors((prev) => ({
      ...prev,
      confirmPassword: text === password ? "" : "Las contraseñas no coinciden",
    }));
  };

  const handleRegister = () => {
    if (!errors.name && !errors.email && !errors.password && !errors.confirmPassword) {
      login(email);
      router.replace("/home");
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FontAwesome name="user-plus" size={100} color="#8B4513" style={styles.icon} />
      <Text style={[styles.title, titleStyle]}>Crear Cuenta</Text>

      <TextInput
        style={[styles.input, inputStyle, errors.name && styles.inputError]}
        placeholder="Nombre completo"
        value={name}
        onChangeText={validateName}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        style={[styles.input, inputStyle, errors.email && styles.inputError]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, inputStyle, errors.password && styles.inputError]}
        placeholder="Contraseña"
        value={password}
        onChangeText={validatePassword}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TextInput
        style={[styles.input, inputStyle, errors.confirmPassword && styles.inputError]}
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={validateConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

      <CustomButton
        title="Registrarse"
        onPress={handleRegister}
        style={[styles.button, buttonStyle]}
        textStyle={[styles.buttonText, buttonTextStyle]}
        disabled={Object.values(errors).some((error) => error)}
      />

      <TouchableOpacity onPress={() => router.push("/(public)/login")}>
        <Text style={styles.registerText}>
          ¿Ya tienes cuenta? <Text style={styles.registerLink}>Iniciar sesión</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  containerLight: {
    backgroundColor: "#F5F5DC", 
  },
  containerDark: {
    backgroundColor: "#3E2723", 
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleCafesito: {
    color: "#8B4513", 
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  inputLight: {
    borderColor: "#D2B48C", 
    backgroundColor: "#FFF1E6", 
    color: "#5C4033", 
  },
  inputDark: {
    borderColor: "#8B4513", 
    backgroundColor: "#5C4033",
    color: "#FFFFFF", 
  },
  inputError: {
    borderColor: "#FF6347", 
  },
  errorText: {
    color: "#FF6347",
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonCafesitoLight: {
    backgroundColor: "#A0522D", 
  },
  buttonCafesitoDark: {
    backgroundColor: "#5C2E1F", 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextCafesito: {
    color: "#FFFFFF",
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#6D4C41",
  },
  registerLink: {
    fontWeight: "bold",
    color: "#8B4513",
  },
});

export default RegisterScreen;
