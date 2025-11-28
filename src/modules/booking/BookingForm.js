import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookingForm({ route, navigation }) {
  const { provider } = route.params;
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("Morning");
  const [notes, setNotes] = useState("");

  const slots = ["Morning", "Afternoon", "Evening"];

  const saveBooking = async () => {
    if (!date) {
      Alert.alert("Error", "Please select a date");
      return;
    }  

    try {
      let stored = await AsyncStorage.getItem("fixit_bookings");
      let bookings = stored ? JSON.parse(stored) : [];
      
      bookings.push({
        id: Date.now(),
        providerId: provider.id,
        providerName: provider.name,
        date,
        slot,
        notes,
        status: "Requested",
        price: provider.price
      });
      
      await AsyncStorage.setItem("fixit_bookings", JSON.stringify(bookings));
      Alert.alert("Success", "Booking confirmed!", [
        { text: "OK", onPress: () => navigation.navigate("MainTabs", { screen: "History" }) }
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save booking");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Book Service</Text>
      
      <View style={styles.providerInfo}>
        <Text style={styles.providerName}>{provider.name}</Text>
        <Text style={styles.providerPrice}>₹{provider.price}</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Select Date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={date}
          onChangeText={setDate}
        />

        <Text style={styles.label}>Time Slot</Text>
        <View style={styles.slotContainer}>
          {slots.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.slotButton, slot === s && styles.selectedSlot]}
              onPress={() => setSlot(s)}
            >
              <Text style={[styles.slotText, slot === s && styles.selectedSlotText]}>
                {s}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Additional Notes</Text>
        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Any special requirements..."
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.confirmButton} onPress={saveBooking}>
          <Text style={styles.confirmText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}