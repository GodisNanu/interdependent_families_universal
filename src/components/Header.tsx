import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";

import logo from "@/public/InterdependentFamiliesLogo.svg";
import "@/src/blocks/header.css";
import { Link } from "expo-router";

interface HeaderProps {
  isLoggedIn: boolean;
  handleAddClassClick: () => void;
  handleLogoutClick: () => void;
  handleLoginClick: () => void;
  handleJoinClick: () => void;
}

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function Header({
  isLoggedIn,
  handleAddClassClick,
  handleLogoutClick,
  handleLoginClick,
  handleJoinClick,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.date}>{currentDate}</Text>
      <Link href="/" asChild>
        <TouchableOpacity>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
      </Link>
      {/* <div className="header__navigation-container">
            <button className="header__navigation-about-button"> About Us </button>
        </div> */}
      {isLoggedIn ? (
        <View style={styles.memberButtonSection}>
            <TouchableOpacity onPress={handleAddClassClick} style={styles.addClassButton}>
            <Text style={styles.addClassButtonText}>+ Add Class</Text>
          </TouchableOpacity>
          <Link href="/profile" asChild>
            <TouchableOpacity style={styles.profileButton}>
              <Text style={styles.profileButtonText}>Profile</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={handleLogoutClick} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonSection}>
          <TouchableOpacity onPress={handleLoginClick} activeOpacity={0.7} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleJoinClick} style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Us</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Header;
const isMobile = Dimensions.get('window').width <= 1080;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    width: "100%",
    flexDirection: "row", 
    alignItems: "center",
    paddingVertical: 10,
    zIndex: 100,
    ...Platform.select({
      web: {
        position: "fixed" as any,
        top: 0,
        left: 0,
      },
      default: {
        position: "absolute",
        top: 0,
      },
    }),
  },
  date: {
    color: "rgba(255, 255, 255, 1)",
    fontWeight: "300",
    fontSize: isMobile ? 18 : 36,
    marginRight: 26,
    textAlign: "right",
    position: 'absolute',
    right: 0,
    top: 10,
  },
  logo: {
    margin: 10,
    borderRadius: isMobile ? 25 : 45,
    width: isMobile ? 85 : 148,
    height: isMobile ? 85 : 148,
  },
  memberButtonSection: {
    marginLeft: "auto",
    marginRight: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonSection: {
    marginLeft: "auto",
    marginRight: 26,
    flexDirection: "row",
    alignItems: "center",
  },
  addClassButton: {
    color: "white",
    fontWeight: "300",
    fontSize: isMobile ? 18 : 48,
    backgroundColor: 'transparent',
  },
  addClassButtonText: {
    color: "white",
    fontWeight: "300",
    fontSize: isMobile ? 18 : 48, 
    fontFamily: Platform.OS === 'web' ? "LondrinaSolid-Light" : undefined, 
  },
  profileButton: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    marginLeft: isMobile ? 5 : 26,
    borderRadius: 8,
    padding: 10,
  },
  profileButtonText: {
    color: "blue",
    fontSize: isMobile ? 24 : 36, 
  },
  logoutButton: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderRadius: 8,
    padding: 10,
    marginLeft: isMobile ? 5 : 26,
  },
  logoutButtonText: {
    color: "yellow",
    fontSize: isMobile ? 24 : 36,
  },
  loginButton: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderRadius: 8,
    padding: 10,
  },
  loginButtonText: {
    color: "yellow",
    fontSize: 24,
  },
  joinButton: {
    backgroundColor: "rgba(0, 0, 0, 1)",
    marginLeft: 26,
    borderRadius: 8,
    padding: 10,
  },
  joinButtonText: {
    color: "blue",
    fontSize: 24,
  },
});