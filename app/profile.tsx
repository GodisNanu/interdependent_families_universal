import ClassSection from "@/src/components/ClassSection.jsx";
import { useAuth } from "@/src/context/AuthContext";
import { Redirect, useNavigation, useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

function ProfilePage() {
const {isLoggedIn} = useAuth();
  console.log("Profile Page isLoggedIn Status:", isLoggedIn);
  const navigation = useNavigation();
  if (!isLoggedIn) {
    return <Redirect href="/" />;
  }
  const handleJoinClick = () => {
    navigation.setParams({modal: "join"} as any);
  };
  return (
    <ScrollView style={styles.profilePage}>
      <View style={styles.profileHero}>
        <View style={styles.profileHeroImage} />
        <Text style={styles.profileHeroGreeting}>Welcome Back</Text>
        <Text style={styles.profileHeroText}>MemberLastName Family</Text>
      </View>
      <View style={styles.profileCalendar}>
        <Text style={styles.profileCalendarHeading}>
          **Be sure you have received enrollment confirmation in order to access
          class meetings and resources**
        </Text>
        <View>
          <WebView
            source={{
              uri: "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&showPrint=0&showNav=0&showTabs=0&mode=MONTH&title=Interdependent%20Families%20Class%20Calendar&src=YzI5M3NwcmU2MTB2OWZxazBybGx1ZDh2am9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%237cb342",
            }}
          />
        </View>
      </View>
      <View style={styles.availableClasses}>
        <ClassSection
          isLoggedIn={isLoggedIn}
           handleJoinClick={handleJoinClick}
        />
      </View>
    </ScrollView>
  );
}

export default ProfilePage;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isMobile = screenWidth <= 1080;

const styles = StyleSheet.create({
  profilePage: {
    flex: 1,
    backgroundColor: "#121212", 
  },
  profileHero: {
    width: "100%",
    height: screenHeight, 
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileHeroImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center", 
    alignItems: "center",
  },
  profileHeroGreeting: {
    position: "absolute",
    color: "white",
    fontWeight: "900",
    textAlign: "center",
    fontSize: isMobile ? 48 : 90,
    top: isMobile ? screenHeight * 0.4 : 550, 
    fontFamily: Platform.OS === 'web' ? "LondrinaSolid-Black" : undefined,
    padding: 26,
  },
  profileHeroText: {
    position: "absolute",
    color: "white",
    fontWeight: "300",
    textAlign: "center",
    fontSize: isMobile ? 36 : 88,
    bottom: isMobile ? 40 : 5, 
    fontFamily: Platform.OS === 'web' ? "LondrinaSolid-Regular" : undefined,
    padding: 26,
  },
  profileCalendar: {
    width: "100%",
    padding: isMobile ? 10 : 26,
    marginVertical: 26,
  },
  profileCalendarHeading: {
    color: "green",
    fontWeight: "100",
    fontSize: isMobile ? 24 : 56,
    textAlign: "center",
    padding: isMobile ? 5 : 26,
    fontFamily: Platform.OS === 'web' ? "LondrinaSolid-Thin" : undefined,
  },
  availableClasses: {
    width: "100%",
    backgroundColor: "rgba(49, 50, 65, 0.8)",
    paddingBottom: 40, 
  }
});
