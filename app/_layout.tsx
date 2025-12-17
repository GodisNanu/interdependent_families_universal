import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import Head from 'expo-router/head';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native'; // Added for Web check
import 'react-native-reanimated';

import { useColorScheme } from '@/src/components/useColorScheme';

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

  if (!loaded) return null;

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* 3. INJECT YOUR INDEX.HTML TAGS */}
      <Head>
        <title>Interdependent Families</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <meta name="description" content="Interdependent Families: A virtual co-op dedicated to culturally relevant education and holistic support for marginalized families seeking a safe, inclusive homeschool community." />
        <meta property="og:title" content="Interdependent Families" />
        <meta property="og:description" content="Connecting families through shared resources and support." />
        <meta property="og:url" content="https://GodisNanu.github.io/Interdependent_Families" />
  <meta property="og:image" content="/Interdependent Families Logo copy.png" />
        <link rel="icon" type="image/svg+xml" href="/Interdependent Families Logo.svg" />
      </Head>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}