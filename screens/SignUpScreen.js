import React, { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const SignUpScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [token, setToken] = useState("")
  const [password, setPassword] = useState("")

  const handleGetOtp = async ({ navigation }) => {
    try {
      const response = await axios.post(
        "https://freelance-api-2.onrender.com/api/verify/send",
        {
          phoneNumber: phoneNumber,
        }
      )
      setSessionId(response.data.sessionId)
      console.log(response.data.sessionId)
    } catch (error) {
      console.error("Error sending OTP:", error)
    }
  }

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://freelance-api-2.onrender.com/api/users",
        {
          sessionId: sessionId,
          otp: otp,
          name,
          email,
          password,
        }
      )
      await AsyncStorage.setItem("token", response.data.token)

      navigation.navigate("Home")
    } catch (error) {
      console.error("Error signing up:", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {!sessionId && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
            <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
})

export default SignUpScreen
