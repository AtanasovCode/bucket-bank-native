import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "react-native";

//importing routes
import Dashboard from "./routes/Dashboard";
import Input from "./routes/Input";
import Bucket from "./routes/Bucket";
import AddPayment from "./components/bucket/AddPayment";
import Settings from "./routes/Settings";
import EditBucket from "./routes/EditBucket";

const Stack = createNativeStackNavigator();

const App = () => {

  const lightTheme = {
    dark: false,
    colors: {
      background: "#f2f2fd",
      inactive: "#88878b",
      inactiveLighter: "#d5cece",
      accent: "#05d2d6",
      money: "#0dd217",
      text: "#090a0a",
      light: "#403b3b",
      red: "#e34747",
    }
  }

  const darkTheme = {
    dark: true,
    colors: {
      background: "#090a1f",
      inactive: "#082f49",
      accent: "#4aade6",
      money: "#a8f7ac",
      text: "#EBEDF0",
      light: "#A8A8A8",
      red: "#f36d6d",
      delete: "#880505",
    }
  }

  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === "light" ? lightTheme : darkTheme}>
      <Stack.Navigator initialRouteName="Dashboards">
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Input"
          component={Input}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Bucket"
          component={Bucket}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Payment"
          component={AddPayment}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Edit"
          component={EditBucket}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;