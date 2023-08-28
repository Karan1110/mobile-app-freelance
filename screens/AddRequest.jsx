import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome, User!</Text>
      <View style={styles.profileDetail}>
        <FontAwesome5 name="user" size={20} color="black" />
        <Text style={styles.detailText}>Username: user123</Text>
      </View>
      <View style={styles.profileDetail}>
        <FontAwesome5 name="envelope" size={20} color="black" />
        <Text style={styles.detailText}>Email: user@example.com</Text>
      </View>
      <Text style={styles.subHeading}>Your Profile Details:</Text>
      <Text style={styles.sectionTitle}>Financial Details:</Text>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Opening Balance:</Text>
        <Text style={styles.detailValue}>$1000.00</Text>
      </View>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Orders:</Text>
        <Text style={styles.detailValue}>15</Text>
      </View>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Invoices (Purchases):</Text>
        <Text style={styles.detailValue}>10</Text>
      </View>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Payments:</Text>
        <Text style={styles.detailValue}>$800.00</Text>
      </View>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Refunds:</Text>
        <Text style={styles.detailValue}>$50.00</Text>
      </View>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Sales Return:</Text>
        <Text style={styles.detailValue}>$30.00</Text>
      </View>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Statement:</Text>
        <Text style={styles.detailValue}>View Statement</Text>
      </View>
      <View style={styles.financialDetail}>
        <Text style={styles.detailLabel}>Overdue Balance:</Text>
        <Text style={styles.detailValue}>$120.00</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  profileDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  financialDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default ProfileScreen
