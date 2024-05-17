import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeContext, ThemeProvider } from "./components/ThemeContext";

// Importing routes
import Dashboard from "./routes/Dashboard";
import Input from "./routes/Input";
import Bucket from "./routes/Bucket";
import AddPayment from "./components/bucket/AddPayment";
import Settings from "./routes/Settings";
import EditBucket from "./routes/EditBucket";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ currentTheme }) => (
          <NavigationContainer theme={currentTheme}>
            <Stack.Navigator initialRouteName="Dashboard">
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Input"
                component={Input}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Bucket"
                component={Bucket}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Payment"
                component={AddPayment}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Edit"
                component={EditBucket}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
