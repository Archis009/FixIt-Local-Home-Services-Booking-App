import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

export default function BookingForm({ route, navigation }) {
  const { provider } = route.params;
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("Morning");
  const [notes, setNotes] = useState("");
} 