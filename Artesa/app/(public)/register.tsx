import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useDispatch } from "react-redux"
import { logoutUser, registerUser } from "@/store/slices/userSlice";

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { login } = useAuth();

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
    if (name && email && password === confirmPassword) {
      dispatch(registerUser({ name, email, password }));
      router.replace("/home")
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nombre completo"
        value={name}
        onChangeText={validateName}
      />
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={validateEmail}
        keyboardType="email-address"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Contraseña"
        value={password}
        onChangeText={validatePassword}
        secureTextEntry
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TextInput
        style={[styles.input, errors.confirmPassword && styles.inputError]}
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={validateConfirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword ? <Text style={styles.errorText}>{errors.confirmPassword}</Text> : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

// 🔹 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#FAF3E0", // Beige claro
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#A0522D", // Marrón café
    justifyContent: "center",

  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#A0522D", // Marrón rojizo
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    backgroundColor: "#FFFFFF", // Blanco
    color: "#A0522D", // Marrón oscuro
  },
  inputError: {
    borderColor: "#FF4D4D", // Rojo para errores
  },
  errorText: {
    color: "#FF4D4D",
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#A0522D", // Marrón oscuro
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 10,
    color: "#8B4513", // Marrón café
    textDecorationLine: "underline",
  },
});
