import React from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Text, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { FontAwesome5 } from "@expo/vector-icons" // Import your desired icon library
import HomeScreen from "./screens/Home"
import SignInScreen from "./screens/SignInScreen"
import AddRequest from "./screens/AddRequest"
import SignUpScreen from "./screens/SignUpScreen"
import ProductScreen from "./screens/NewProduct"
import ProductInvoice from "./screens/ProductInvoice"

const Tab = createBottomTabNavigator()

const CustomTabLabel = ({ label, focused }) => (
  <Text style={{ color: focused ? "black" : "gray" }}>{label}</Text>
)

const App = () => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem("token")
    return token
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        {!getToken() && (
          <>
            <Tab.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5
                    name="user"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
                tabBarLabel: ({ focused }) => (
                  <CustomTabLabel label="Sign Up" focused={focused} />
                ),
              }}
            />
            <Tab.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5
                    name="sign-in-alt"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
                tabBarLabel: ({ focused }) => (
                  <CustomTabLabel label="Sign In" focused={focused} />
                ),
              }}
            />
          </>
        )}
        {getToken() && (
          <>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5
                    name="home"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
                tabBarLabel: ({ focused }) => (
                  <CustomTabLabel label="Home" focused={focused} />
                ),
              }}
            />
            <Tab.Screen
              name="invoice"
              component={ProductInvoice}
              options={{
                tabBarButton: () => null, // This will hide both icon and label
              }}
            />

            <Tab.Screen
              name="Add"
              component={AddRequest}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5
                    name="user"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
                tabBarLabel: ({ focused }) => (
                  <CustomTabLabel label="Add" focused={focused} />
                ),
              }}
            />
            <Tab.Screen
              name="Product"
              component={ProductScreen}
              options={{
                tabBarIcon: ({ focused }) => (
                  <FontAwesome5
                    name="shopping-cart"
                    size={24}
                    color={focused ? "black" : "gray"}
                  />
                ),
                tabBarLabel: ({ focused }) => (
                  <CustomTabLabel label="Products" focused={focused} />
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
