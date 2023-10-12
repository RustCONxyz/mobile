import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";
import { ModalPortal } from "react-native-modals";

import store from "../store/store";

import useNotifications from "../hooks/useNotifications";
import useCachedResources from "../hooks/useCachedResources";

import RouteRedirect from "../components/RouteRedirect";

export const unstable_settings = {

    initialRouteName: "(auth)/index"

}

export default function RootLayout() {

    //useNotifications();

    const isLoadingComplete = useCachedResources();

    return (
        <ReduxProvider store={store}>
            <StatusBar style="light" />
            {!isLoadingComplete && <SplashScreen />}
            <RouteRedirect>
                <SafeAreaView className="h-full">
                    <Stack initialRouteName="(auth)/index">
                        <Stack.Screen name="(auth)/index" options={{ headerShown: false }} />
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="settings" options={{ headerShown: false }} />
                    </Stack>
                    <ModalPortal />
                </SafeAreaView>
            </RouteRedirect>
        </ReduxProvider>
    )

}
