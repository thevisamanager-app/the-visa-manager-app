import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useSelector } from "react-redux";
import ScreenWrapper from "../../components/ScreenWrapper";
import SchengenStepper from "../../components/SchengenStepper";
import { saveSchengenData } from "../../api/user/saveSchengenData";
import { wp, hp, RFValue } from "../../utils/metrics";

const ORANGE = "#FF5C00";
const BLACK = "#000";

/* ---------------- MOCK CENTER MAP ---------------- */
const CENTER_MAP = {
  gujarat: ["Ahmedabad - France", "Mumbai - France"],
  maharashtra: ["Mumbai - France", "Pune - France"],
  delhi: ["New Delhi - France"],
  default: ["New Delhi - France"],
};

/* ---------------- MOCK EARLIEST SLOTS ---------------- */
const EARLY_SLOTS = [
  { date: "2025-12-29", label: "Mon, 29 Dec", slots: 5 },
  { date: "2025-12-30", label: "Tue, 30 Dec", slots: 4 },
  { date: "2025-12-31", label: "Wed, 31 Dec", slots: 3 },
];

export default function SchengenAppointmentScreen({ navigation, route }) {
  /* ================= REDUX ================= */
  const destination = useSelector((state) => state.destinations.selected);
  const countryName = destination?.countrName || "Schengen";

  /* ================= PARAMS ================= */
  const address = route?.params?.address || {};
  const stateName = address?.state?.toLowerCase();

  /* ================= DERIVED ================= */
  const centers = CENTER_MAP[stateName] || CENTER_MAP.default;

  /* ================= STATE ================= */
  const [selectedCenter] = useState(centers[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  /* ================= CALENDAR MARKING ================= */
  const markedDates = useMemo(() => {
    if (!selectedDate) return {};
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: ORANGE,
      },
    };
  }, [selectedDate]);

  /* ================= SAVE ================= */
  const proceed = async () => {
    if (!selectedDate) return;

    await saveSchengenData(countryName, {
      appointment: {
        center: selectedCenter,
        date: selectedDate,
      },
    });

    navigation.navigate("SchengenCountriesVisit", route?.params);
  };

  return (
    <ScreenWrapper style={styles.container}>
      <SchengenStepper step={3} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp("6%") }}
      >
        <Text style={styles.title}>Choose appointment date</Text>

        {/* CENTER */}
        <Text style={styles.label}>Appointment centre</Text>
        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>{selectedCenter}</Text>
        </View>

        {/* ================= EARLIEST SLOTS ================= */}
        {!showCalendar && (
          <>
            <Text style={styles.earliestText}>
              EARLIEST APPOINTMENT SLOTS
            </Text>

            {EARLY_SLOTS.map((item) => (
              <TouchableOpacity
                key={item.date}
                style={[
                  styles.slotCard,
                  selectedDate === item.date && styles.slotSelected,
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text style={styles.slotDate}>{item.label}</Text>
                <Text
                  style={[
                    styles.slotCount,
                    { color: item.slots <= 3 ? "#E53935" : "#C9A300" },
                  ]}
                >
                  {item.slots} SLOTS LEFT
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.seeMoreBtn}
              onPress={() => setShowCalendar(true)}
            >
              <Text style={styles.seeMoreText}>SEE MORE SLOTS</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ================= CALENDAR ================= */}
        {showCalendar && (
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={markedDates}
            theme={{
              todayTextColor: ORANGE,
              selectedDayBackgroundColor: ORANGE,
            }}
            style={styles.calendar}
          />
        )}

        {/* ================= PROCEED ================= */}
        <TouchableOpacity
          style={[
            styles.proceedBtn,
            !selectedDate && { opacity: 0.4 },
          ]}
          disabled={!selectedDate}
          onPress={proceed}
        >
          <Text style={styles.proceedText}>PROCEED</Text>
        </TouchableOpacity>

        {/* NOTE */}
        <Text style={styles.note}>
          Note: We ensure appointment slots are up to date. If it's available,
          you’ll see it first on Atlys.
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp("5%"),
  },
  title: {
    fontSize: RFValue(26),
    marginVertical: hp("2%"),
  },
  label: {
    marginBottom: 6,
    color: "#777",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: RFValue(14),
  },
  earliestText: {
    textAlign: "center",
    color: "#aaa",
    fontSize: RFValue(11),
    marginBottom: 12,
    letterSpacing: 1,
  },
  slotCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slotSelected: {
    borderWidth: 1,
    borderColor: ORANGE,
  },
  slotDate: {
    fontSize: RFValue(15),
    fontWeight: "600",
  },
  slotCount: {
    fontSize: RFValue(13),
    fontWeight: "700",
  },
  seeMoreBtn: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginVertical: 10,
  },
  seeMoreText: {
    fontSize: RFValue(13),
    letterSpacing: 1,
  },
  calendar: {
    borderRadius: 18,
    marginBottom: 20,
  },
  proceedBtn: {
    backgroundColor: BLACK,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  proceedText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: RFValue(15),
  },
  note: {
    textAlign: "center",
    color: "#666",
    marginTop: 14,
    fontSize: RFValue(11),
  },
});
