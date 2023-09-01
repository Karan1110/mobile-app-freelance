import axios from "axios"
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Image } from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage"

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params // Get quotation ID from navigation params
  const [quotation, setProduct] = useState({})

  useEffect(() => {
    const fetchProduct = async () => {
      const value = await AsyncStorage.getItem("token")
      console.log(productId)
      const invoice = await axios.get(
        `http://localhost:3900/api/invoices/quotations/${productId}`,
        {
          headers: {
            "x-auth-token": value,
          },
        }
      )
      console.log(invoice)
      setProduct(invoice.data)
    }
    fetchProduct()
  }, [])

  return (
    <View style={styles.container}>
      {quotation.products &&
        quotation.products.map((prod, index) => (
          <View style={styles.card} key={prod._id}>
            <Text style={styles.cardTitle}> Product {index + 1}</Text>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `http://localhost:3900/${prod._id}`,
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.quantity}>Quantity: {prod.quantity}</Text>
            <Text style={styles.status}>
              Status: {prod.approved ? "Approved" : "Not Yet Approved"}
            </Text>
            <View style={styles.buttonContainer}></View>
          </View>
        ))}
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
    padding: 2,
    margin: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  imageContainer: {},
  productContainer: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: "90%",
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

export default ProductDetailScreen
