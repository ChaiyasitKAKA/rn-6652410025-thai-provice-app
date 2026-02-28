import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function FestivalDetail() {
  // รับข้อมูลที่ส่งมาจากไฮไลต์
  const params = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* รูปภาพเทศกาล */}
        <Image
          source={{
            uri:
              (params.image_url as string) || "https://via.placeholder.com/400",
          }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{params.name}</Text>
          <View style={styles.dateCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="calendar" size={24} color="#D97706" />
            </View>
            <View>
              <Text style={styles.dateLabel}>วันที่จัดงาน</Text>
              <Text style={styles.dateValue}>{params.date}</Text>
            </View>
          </View>
          {/* รายละเอียด (ถ้าคุณมีฟิลด์ description ในตาราง festival ก็สามารถเพิ่มตรงนี้ได้) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>เกี่ยวกับเทศกาลนี้</Text>
            <Text style={styles.descriptionText}>{params.description}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 8,
    borderRadius: 20,
  },
  coverImage: {
    width: width,
    height: 320,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
  },
  title: {
    fontFamily: "pridi_700Bold",
    fontSize: 26,
    color: "#1F2937",
    marginBottom: 20,
  },
  dateCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
  },
  iconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#FDE68A",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  dateLabel: {
    fontFamily: "pridi_400Regular",
    fontSize: 14,
    color: "#92400E",
  },
  dateValue: {
    fontFamily: "pridi_700Bold",
    fontSize: 16,
    color: "#D97706",
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontFamily: "pridi_700Bold",
    fontSize: 20,
    color: "#1F2937",
    marginBottom: 12,
  },
  descriptionText: {
    fontFamily: "pridi_400Regular",
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 28,
  },
});
