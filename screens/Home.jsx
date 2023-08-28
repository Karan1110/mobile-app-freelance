import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  CheckBox,
  TextInput,
} from "react-native"
import axios from "axios"
import { useFocusEffect } from "@react-navigation/native"

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState()
  const [selectedProducts, setSelectedProducts] = useState([])

  const handleCheckboxToggle = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId))
    } else {
      setSelectedProducts([...selectedProducts, productId])
    }
  }

  const handleSubmit = async () => {
    const value = await AsyncStorage.getItem("token")
    const response = await axios.post(
      "http://localhost:3900/api/invoices/quotation",
      {
        products: selectedProducts,
        quantity: quantity,
      },
      {
        headers: {
          "x-auth-token": value,
        },
      }
    )
    console.log(response.data)
  }

  useFocusEffect(() => {
    fetchProducts()
  })

  const fetchProducts = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      const response = await axios.get("http://localhost:3900/api/invoices/", {
        headers: {
          "x-auth-token": value,
        },
      })
      setProducts(response.data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Unapproved Product Requests</Text>
      <ScrollView>
        {products.map((product) => (
          <View style={styles.card} key={product._id}>
            <Image
              source={{
                uri: `http://localhost:3900/${product._id}`, // Replace with the correct URL
              }}
              style={styles.image}
              resizeMode="cover" // Choose the appropriate resizeMode
            />
            <Text style={styles.cardTitle}>{product.name}</Text>
            <Text style={{ margin: 5 }}>Price: {product.price || 99}</Text>
            <Text style={{ margin: 5 }}>Quantity: {product.quantity || 1}</Text>
            <Text style={{ margin: 5 }}>User: {product.user}</Text>
            <Text style={{ margin: 5 }}>
              Status: {product.approved ? "Approved" : "Not Yet Approved"}
            </Text>
            <CheckBox
              value={selectedProducts.includes(product._id)}
              onValueChange={() => handleCheckboxToggle(product._id)}
            />
          </View>
        ))}
        <TextInput
          style={{ margin: 10, borderColor: "grey", height: 50, width: 350 }}
          placeholder="Enter the desired Quantity"
          value={quantity}
          onChangeText={setQuantity}
        />
        <TouchableOpacity style={styles.approveButton} onPress={handleSubmit}>
          <Text>Show Selected Products</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  approveButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  approveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  image: {
    width: "100%", // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: "cover", // Choose the appropriate resizeMode
    borderRadius: 10, // Optional: Add borderRadius for a rounded appearance
  },
})

export default HomeScreen
