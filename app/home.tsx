import { supabase } from "@/service/supabase";
import { Highlight, Sakonnaja } from "@/type";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Home() {
  const [data, setData] = useState<Sakonnaja[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      // ดึงข้อมูล 2 Table พร้อมกันด้วย Promise.all
      const [placesResponse, highlightsResponse] = await Promise.all([
        supabase
          .from("Sakonnaja")
          .select("*")
          .order("name", { ascending: true }),
        supabase.from("festival").select("*"),
      ]);

      if (placesResponse.error || highlightsResponse.error) {
        Alert.alert(
          "คำเตือน",
          "เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองใหม่อีกครั้ง",
        );
      } else {
        setData(placesResponse.data || []);
        setHighlights(highlightsResponse.data || []);
      }
      setLoading(false);
    };

    fetchAllData();
  }, []);

  const getCategoryTag = (category?: string) => {
    switch (category) {
      case "attraction":
        return {
          label: "ที่เที่ยว",
          icon: "leaf",
          color: "#2F5233",
          bg: "#E8F5E9",
        };
      case "restaurant":
        return {
          label: "ร้านอาหาร",
          icon: "restaurant",
          color: "#D97706",
          bg: "#FFF8E1",
        };
      case "cafe":
        return {
          label: "คาเฟ่",
          icon: "cafe",
          color: "#795548",
          bg: "#EFEBE9",
        };
      case "temple":
        return {
          label: "วัด",
          icon: "flower",
          color: "#B85042",
          bg: "#FBE9E7",
        };
      default:
        return {
          label: "สถานที่",
          icon: "location",
          color: "#6B7280",
          bg: "#F3F4F6",
        };
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* ซ่อนส่วนไฮไลต์ถ้ายังไม่มีข้อมูลใน Database */}
      {highlights.length > 0 && (
        <>
          <View style={[styles.sectionHeader, { paddingHorizontal: 16 }]}>
            <Ionicons name="sparkles" size={20} color="#D97706" />
            <Text style={styles.headerTitle}>ไฮไลต์ประเพณีสกลนคร</Text>
          </View>

          <FlatList
            data={highlights}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderHighlightItem}
            contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
            snapToInterval={width * 0.8 + 16}
            decelerationRate="fast"
            snapToAlignment="start"
          />
        </>
      )}

      <View
        style={[styles.sectionHeader, { marginTop: 0, paddingHorizontal: 16 }]}
      >
        <Ionicons name="compass" size={22} color="#2F5233" />
        <Text style={styles.headerTitle}>สถานที่แนะนำ</Text>
      </View>
    </View>
  );

  const rendersakonitem = ({ item }: { item: Sakonnaja }) => {
    const tagInfo = getCategoryTag(item.category);

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardItem}
        onPress={() =>
          router.push({
            pathname: "/detail",
            params: {
              id: item.id,
              name: item.name,
              district: item.address,
              description: item.description,
              latitude: item.latitude,
              longitude: item.longitude,
              image_url: item.image_url,
              phone: item.phone,
            },
          })
        }
      >
        <Image
          source={{ uri: item.image_url || "https://via.placeholder.com/150" }}
          style={styles.cardImage}
        />
        <View style={styles.textContainer}>
          <Text style={styles.shopName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={14} color="#9CA3AF" />
            <Text style={styles.shopDistrict} numberOfLines={1}>
              {item.address}
            </Text>
          </View>
          <View style={[styles.tagContainer, { backgroundColor: tagInfo.bg }]}>
            <Ionicons
              name={tagInfo.icon as any}
              size={12}
              color={tagInfo.color}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.tagText, { color: tagInfo.color }]}>
              {tagInfo.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHighlightItem = ({ item }: { item: Highlight }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.festivalCard}
      onPress={() =>
        router.push({
          pathname: "/festival_detial",
          params: {
            id: item.id,
            name: item.name,
            image_url: item.image_url,
            description: item.description,
            date: item.date,
          },
        })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.festivalImage} />
      <View style={styles.festivalOverlay}>
        <Text style={styles.festivalName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.festivalDateContainer}>
          <Ionicons name="calendar-outline" size={14} color="#E5E7EB" />
          <Text style={styles.festivalDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2F5233" />
          <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(props) => (
            <View style={{ paddingHorizontal: 16 }}>
              {rendersakonitem(props)}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontFamily: "pridi_400Regular",
    marginTop: 10,
    color: "#6B7280",
  },
  headerContainer: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 6,
  },
  headerTitle: {
    fontFamily: "pridi_700Bold",
    fontSize: 20,
    color: "#1F2937",
  },
  festivalCard: {
    width: width * 0.8,
    marginRight: 16,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#EEEEEE",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  festivalImage: {
    width: "100%",
    height: "100%",
  },
  festivalOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.55)",
    padding: 16,
    paddingTop: 24,
  },
  festivalName: {
    fontFamily: "pridi_700Bold",
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  festivalDateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  festivalDate: {
    fontFamily: "pridi_400Regular",
    fontSize: 14,
    color: "#F3F4F6",
  },
  cardItem: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardImage: {
    height: 96,
    width: 96,
    borderRadius: 12,
    backgroundColor: "#EEEEEE",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
    paddingVertical: 4,
  },
  shopName: {
    fontFamily: "pridi_700Bold",
    fontSize: 17,
    color: "#1F2937",
    marginBottom: 2,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  shopDistrict: {
    fontFamily: "pridi_400Regular",
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 2,
    flex: 1,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontFamily: "pridi_700Bold",
    fontSize: 12,
  },
});
