import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CategoriesScreen from "../modules/categories/CategoriesScreen";
import ProvidersScreen from "../modules/providers/ProvidersScreen";
import BookingForm from "../modules/booking/BookingForm";
import HistoryScreen from "../modules/history/HistoryScreen";
import FavoritesScreen from "../modules/favorites/FavoritesScreen";
import DashboardScreen from "../modules/dashboard/DashboardScreen";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="Home" component={CategoriesScreen} />
      <Tabs.Screen name="History" component={HistoryScreen} />
      <Tabs.Screen name="Favorites" component={FavoritesScreen} />
      <Tabs.Screen name="Dashboard" component={DashboardScreen} />
    </Tabs.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Providers" component={ProvidersScreen} />
        <Stack.Screen name="BookingForm" component={BookingForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}