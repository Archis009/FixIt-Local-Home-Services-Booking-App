import { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { providers } from "../../data/providers";
import ProviderCard from "../providers/ProviderCard";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const favProviders = providers.filter(p => p.fav);
    setFavorites(favProviders);
  };

  const handleBook = (provider) => {
    navigation.navigate("BookingForm", { provider });
  };

  const toggleFavorite = (providerId) => {
    // In a real app, this would update the provider's favorite status
    console.log("Toggle favorite for provider:", providerId);
  };
}