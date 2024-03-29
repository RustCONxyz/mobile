import { useEffect } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { registerPushToken } from "@/lib/notifications";

Notifications.setNotificationHandler({

    handleNotification: async () => ({

        shouldShowAlert: true,

        shouldPlaySound: true,

        shouldSetBadge: true

    })

});

export default function useNotifications() {

    useEffect(() => {

        async function registerForPushNotifications() {

            if (!Device.isDevice) return;

            if (Platform.OS === "android") {

                Notifications.setNotificationChannelAsync("default", {

                    name: "default",

                    importance: Notifications.AndroidImportance.MAX,

                    vibrationPattern: [0, 250, 250, 250]

                });

            }

            const { status: existingStatus } = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {

                const { status } = await Notifications.requestPermissionsAsync();

                finalStatus = status;

            }

            if (finalStatus !== "granted") return;

            const tokenResponse = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig!.extra!.eas.projectId
            });

            registerPushToken(tokenResponse.data);

        }

        registerForPushNotifications();

    }, []);

}
