import React, { useEffect, useState } from "react";
/* import "@/src/blocks/page.css"; */
import { Stack, useRouter } from "expo-router";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddClassModal from "./AddClassModal.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import JoinModal from "./JoinModal.jsx";
import LoginModal from "./LoginModal.jsx";
import LogoutModal from "./LogoutModal.jsx";
import Loading from "./Preloader.jsx";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [isLoading, setIsLoading] = useState <boolean> (false);
  const [isLoggedIn, setIsLoggedIn] = useState < boolean > (false);
  const [activeModal, setActiveModal] = useState < string > ("");
  const [newError, setNewError] = useState < string > ("");

  const router = useRouter();

  const onClose = () => {
    setActiveModal("");
    setNewError("");
  };

  const handleOutsideClick = (e: any) => {
    if (Platform.OS === "web" && e.target.classList.contains("modal")) {
      onClose();
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    onClose();
    router.replace("/");
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.replace("/profile");
    onClose();
  };

  function handleAddClassClick() {
    setActiveModal("add-class");
  }

  function handleLogoutClick() {
    setActiveModal("logout-modal");
  }

  function handleLoginClick() {
    setActiveModal("login");
  }

  function handleJoinClick() {
    setActiveModal("join-modal");
  }

  useEffect(() => {
    if (Platform.OS !== "web") return;
    if (!activeModal) return;
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View style={styles.page}>
          <View style={styles.pageContent}>
            <Header
              isLoggedIn={isLoggedIn}
              handleAddClassClick={handleAddClassClick}
              handleLogoutClick={handleLogoutClick}
              handleLoginClick={handleLoginClick}
              handleJoinClick={handleJoinClick}
            />
            <Stack screenOptions={{ headerShown: false }} />     
            <JoinModal
              isOpen={activeModal === "join-modal"}
              handleOutsideClick={handleOutsideClick}
              onClose={onClose}
            />
            <LoginModal
              handleOutsideClick={handleOutsideClick}
              isOpen={activeModal === "login"}
              handleLogin={handleLogin}
              onClose={onClose}
              handleJoinClick={handleJoinClick}
              newError={newError}
            />
            <AddClassModal
              isOpen={activeModal === "add-class"}
              handleOutsideClick={handleOutsideClick}
              onClose={onClose}
            />
            <LogoutModal
              handleOutsideClick={handleOutsideClick}
              isOpen={activeModal === "logout-modal"}
              handleLogout={handleLogout}
              onClose={onClose}
            />
            {/* Components of the Staff Page */
            /* Modals */}
            <Footer />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  }, 
  page: { flex: 1,},
  pageContent: {
    flex: 1,
  }
});