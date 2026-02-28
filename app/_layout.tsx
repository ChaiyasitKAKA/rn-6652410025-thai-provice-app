import {
  NotoSansThai_400Regular,
  NotoSansThai_500Medium,
} from "@expo-google-fonts/noto-sans-thai";
import {
  Pridi_400Regular,
  Pridi_700Bold,
  useFonts,
} from "@expo-google-fonts/pridi";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Pridi_400Regular,
    Pridi_700Bold,
    NotoSansThai_400Regular,
    NotoSansThai_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="home"
        options={{
          title: "สกลนคร",
          headerTitleStyle: {
            fontFamily: "Pridi_700Bold",
            color: "#F4F5F0",
          },
          headerStyle: {
            backgroundColor: "#2F5233",
          },
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          title: "รายละเอียด",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: {
            fontFamily: "Pridi_700Bold",
            color: "#F4F5F0",
          },
          headerStyle: {
            backgroundColor: "#2F5233",
          },
        }}
      />
    </Stack>
  );
}
