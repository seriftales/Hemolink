import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { api } from "../services/api";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/users/login", { email, password });
      console.log("Login Success:", response.data);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
