import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerPushToken } from "../notifications";

export interface NotificationSettings {

    clientUpdates: boolean;

    serverUpdates: boolean;

    oxideUpdates: boolean;

    carbonUpdates: boolean;

    protocolUpdates: boolean;

}

export async function setNotificationSettings(settings: NotificationSettings): Promise<void> {

    await AsyncStorage.setItem("notification-settings", JSON.stringify(settings));

    await registerPushToken();

}

export async function getNotificationSettings(): Promise<NotificationSettings> {

    const settings = await AsyncStorage.getItem("notification-settings");

    if (settings) {

        return JSON.parse(settings);

    }

    const defaultSettings = {

        clientUpdates: true,

        serverUpdates: true,

        oxideUpdates: true,

        carbonUpdates: true,

        protocolUpdates: true

    };

    await setNotificationSettings(defaultSettings);

    return defaultSettings;

}
