import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./store";
import { LoginScreen } from "./screens/Login";
import { RegisterScreen } from "./screens/Register";
import HomeGroup from "./screens/Home";
import { EditProfileScreen } from "./screens/Edit/Profile";
import { TransactionScreen } from "./screens/Main/Transaction";
import { CreateTransactionScreen } from "./screens/Edit/Transaction";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
          >
              <Stack.Screen 
                name="HomeGroup" 
                component={HomeGroup} 
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                name="EditProfile" 
                component={EditProfileScreen} 
                options={{
                  headerShown: true,
                  title: "Edit Profile",
                }}
              />
              <Stack.Screen 
                name="Transactions" 
                component={TransactionScreen} 
                options={{
                  headerShown: true,
                  title: "Transaction",
                }}
              />
              <Stack.Screen 
                name="CreateTransaction" 
                component={CreateTransactionScreen} 
                options={{
                  headerShown: true,
                  title: "Create Transaction",
                }}
              />
          </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}
