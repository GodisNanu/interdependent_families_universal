import AddClassModal from "@/src/components/AddClassModal";
import Footer from "@/src/components/Footer";
import Header from "@/src/components/Header";
import JoinModal from "@/src/components/JoinModal";
import LoginModal from "@/src/components/LoginModal";
import LogoutModal from "@/src/components/LogoutModal";
import { useColorScheme } from '@/src/components/useColorScheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native'; // Added for Web check
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

if (Platform.OS === 'web') {
  require('../src/vendor/index.css');
}

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
   'LondrinaSolid-Black': require('../assets/fonts/LondrinaSolid-Black.ttf'),
   'LondrinaSolid-Regular': require('../assets/fonts/LondrinaSolid-Regular.ttf'),
   'LondrinaSolid-Light': require('../assets/fonts/LondrinaSolid-Light.ttf'),
   'LondrinaSolid-Thin': require('../assets/fonts/LondrinaSolid-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  /* if (!loaded) return <Stack />; */

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [newError, setNewError] = useState("");


  const onClose = () => {
    setActiveModal("");
    setNewError("");
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("modal")) {
      onClose();
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    onClose();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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
    if (!activeModal) return;
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (Platform.OS === 'web') {
    document.addEventListener("keydown", handleEscClose);}

    return () => { if (Platform.OS === 'web') {
      document.removeEventListener("keydown", handleEscClose);}
    };
  }, [activeModal]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      
      <Head>
        <title>Interdependent Families</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Interdependent Families: A virtual co-op dedicated to culturally relevant education and holistic support for marginalized families seeking a safe, inclusive homeschool community." />
        <meta property="og:title" content="Interdependent Families" />
        <meta property="og:description" content="Connecting families through shared resources and support." />
        <meta property="og:url" content="https://GodisNanu.github.io/Interdependent_Families" />
  <meta property="og:image" content="/InterdependentFamiliesLogo.png" />
        <link rel="icon" type="image/svg+xml" href="/InterdependentFamiliesLogo.svg" />
      </Head>

<div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div className="page__content">
          <Header
            isLoggedIn={isLoggedIn}
              handleAddClassClick={handleAddClassClick}
              handleLogoutClick={handleLogoutClick}
              handleLoginClick={handleLoginClick}
              handleJoinClick={handleJoinClick}
          />
<div style={{ flex: 1 }}>
      <Stack>
            <Stack.Screen name="index" options={{ headerShown: true }} />
            <Stack.Screen name="profile" options={{ headerShown: true }} />
          </Stack>
          
          </div>
          <Footer />
          
        </div>
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
        
      </div>

    </ThemeProvider>
  );
}