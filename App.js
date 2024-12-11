import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { DetailAlbum, EditProfile, Settings, DetailAlbumChill, SongMusic } from './screens';
import BottomTabNav from './navigations/BottomTabNav';
import { Login, Signup, Welcome } from './screens';
import { AppProvider } from './ContextAPI/AppContext';


SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    black: require('./assets/fonts/Inter-Black.ttf'),
    bold: require('./assets/fonts/Inter-Bold.ttf'),
    medium: require('./assets/fonts/Inter-Medium.ttf'),
    regular: require('./assets/fonts/Inter-Regular.ttf'),
    semiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <AppProvider>
        <Stack.Navigator
          initialRouteName='Welcome'
        >
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="BottomTabNavigation"
            component={BottomTabNav}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="DetailAlbum"
            component={DetailAlbum}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="DetailAlbumChill"
            component={DetailAlbumChill}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name="SongMusic"
            component={SongMusic}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </AppProvider>
    </NavigationContainer>
  );
}


