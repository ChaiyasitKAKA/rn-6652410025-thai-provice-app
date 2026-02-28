import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  const params = useLocalSearchParams();

  const handleCallApp = () => {
    const phoneNumber = params.phone as string;
    if (!phoneNumber) return;
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url);
  };

  const handleOpenMapApp = () => {
    const lat = params.latitude;
    const lng = params.longitude;

    if (!lat || !lng) return;

    const googleMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    const appleMap = `http://maps.apple.com/?ll=${lat},${lng}&q=${params.name}`;

    Linking.canOpenURL(googleMap).then((supported) => {
      if (supported) {
        Linking.openURL(googleMap);
      } else {
        Linking.openURL(appleMap);
      }
    });
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={{
          uri: params.image_url as string,
        }}
        style={styles.headerImage}
      />

      <View style={styles.contentContainer}>
        {/* ชื่อและที่อยู่ */}
        <View style={styles.headerTextContainer}>
          <Text style={styles.titleText}>{params.name as string}</Text>
          <View style={styles.locationBadge}>
            <Ionicons name="location-sharp" size={16} color="#4B5563" />
            <Text style={styles.locationText}>
              {" "}
              {params.district as string}
            </Text>
          </View>
        </View>

        {/* เส้นคั่น */}
        <View style={styles.divider} />

        {/* รายละเอียด */}
        <Text style={styles.descriptionText}>
          {params.description as string}
        </Text>

        {/* ปุ่มกด */}
        <View style={styles.actionContainer}>
          {params.phone && params.phone !== "null" && params.phone !== "" && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleCallApp}
              style={[styles.button, styles.callButton]}
            >
              <Ionicons
                name="call"
                size={22}
                color="#FFFFFF"
                style={{ marginBottom: 4 }}
              />
              <Text style={styles.buttonText}>โทรติดต่อ</Text>
              <Text style={styles.buttonSubText}>{params.phone as string}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleOpenMapApp}
            style={[styles.button, styles.mapButton]}
          >
            <Ionicons
              name="map"
              size={22}
              color="#FFFFFF"
              style={{ marginBottom: 4 }}
            />
            <Text style={styles.buttonText}>นำทาง</Text>
            <Text style={styles.buttonSubText}>เปิดแอปแผนที่</Text>
          </TouchableOpacity>
        </View>

        {/* ส่วนแผนที่ */}
        <Text style={styles.sectionTitle}>พิกัดร้าน</Text>
        <View style={styles.mapWrapper}>
          {params.latitude && params.longitude ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(params.latitude as string),
                longitude: parseFloat(params.longitude as string),
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              }}
            >
              <Marker
                coordinate={{
                  latitude: parseFloat(params.latitude as string),
                  longitude: parseFloat(params.longitude as string),
                }}
                title={params.name as string}
                description={params.district as string}
                onPress={handleOpenMapApp}
              />
            </MapView>
          ) : (
            // Fallback UI กรณีไม่มีข้อมูลพิกัดส่งมา
            <View style={[styles.map, styles.noMapContainer]}>
              <Ionicons name="map-outline" size={32} color="#9CA3AF" />
              <Text style={styles.noMapText}>ไม่พบข้อมูลพิกัดแผนที่</Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  headerImage: {
    width: "100%",
    height: 320,
    backgroundColor: "#EEEEEE",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerTextContainer: {
    marginBottom: 16,
  },
  titleText: {
    fontFamily: "pridi_700Bold",
    fontSize: 26,
    color: "#1F2937",
    marginBottom: 10,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  locationText: {
    fontFamily: "pridi_400Regular",
    fontSize: 14,
    color: "#4B5563",
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 18,
  },
  descriptionText: {
    fontFamily: "pridi_400Regular",
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 26,
    marginBottom: 28,
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  callButton: {
    backgroundColor: "#B85042",
  },
  mapButton: {
    backgroundColor: "#2F5233",
  },
  buttonText: {
    fontFamily: "pridi_700Bold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  buttonSubText: {
    fontFamily: "pridi_400Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
  },
  sectionTitle: {
    fontFamily: "pridi_700Bold",
    fontSize: 20,
    color: "#1F2937",
    marginBottom: 12,
  },
  mapWrapper: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  map: {
    width: "100%",
    height: 250,
  },
  noMapContainer: {
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  noMapText: {
    fontFamily: "pridi_400Regular",
    color: "#9CA3AF",
    fontSize: 14,
  },
});
