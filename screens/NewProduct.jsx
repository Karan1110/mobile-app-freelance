import React, { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from "react-native"
import axios from "axios"
import * as FileSystem from "expo-file-system"

const ProductScreen = ({ navigation }) => {
  const [quotations, setProducts] = useState([])

  const handleGeneratePDF = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3900/api/invoices/generate-pdf/${id}`,
        {
          responseType: "blob",
        }
      )

      const pdfBlob = new Blob([response.data], { type: "application/pdf" })

      if (typeof window !== "undefined") {
        // Check if running in a web environment
        const pdfUrl = URL.createObjectURL(pdfBlob)
        const anchor = document.createElement("a")
        anchor.href = pdfUrl
        anchor.download = "invoice.pdf"
        anchor.click()
        URL.revokeObjectURL(pdfUrl)
      } else {
        // Handle in a React Native environment
        const pdfUri = FileSystem.cacheDirectory + "invoice.pdf"
        await FileSystem.writeAsStringAsync(pdfUri, pdfBlob, {
          encoding: FileSystem.EncodingType.Base64,
        })
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const value = await AsyncStorage.getItem("token")
      console.log("tokn here", value)

      const response = await fetch(
        "http://localhost:3900/api/invoices/quotations",
        {
          headers: {
            "x-auth-token": value,
          },
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      setProducts(data) // Assuming the product data is in the 'data' property
      console.log(data)
    } catch (error) {
      console.error("Error fetching quotations:", error)
    }
  }

  const handleApprove = (productId) => {
    // Implement your approve logic here
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Product List</Text>
      <ScrollView vertical>
        {quotations.map((product, index) => (
          <View style={styles.card} key={product._id}>
            <Text style={styles.cardTitle}>Quotation {index + 1}</Text>
            <Text style={styles.cardTitle}>
              Quoted Products: {product.products.length}
            </Text>
            <View style={styles.imageContainer}>
              {product.products.map((prod) => (
                <View style={styles.productContainer} key={prod._id}>
                  <Image
                    source={{ uri: `http://localhost:3900/${prod._id}` }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <Text style={styles.productName}>{prod.name}</Text>
                </View>
              ))}
            </View>
            <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
            <Text style={styles.status}>
              Status: {product.approved ? "Approved" : "Not Yet Approved"}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Get Invoice PDF"
                onPress={() => handleGeneratePDF(product._id)}
                style={{ margin: 3 }}
              />
              <Button
                title="View all products"
                style={{ margin: 3 }}
                onPress={() =>
                  navigation.navigate("invoice", { productId: product._id })
                }
              />
            </View>
          </View>
        ))}
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
  imageContainer: {
    flexDirection: "row",
  },
  productContainer: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 15,
  },
  productName: {
    color: "grey",
    margin: 5,
  },
  quantity: {
    margin: 10,
  },
  status: {
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
})

export default ProductScreen
