import AsyncStorage from "@react-native-async-storage/async-storage";

export interface NotificationSettings {

    client: boolean;

    server: boolean;

    oxide: boolean;

    carbon: boolean;

}

export async function setNotificationSettings(settings: NotificationSettings): Promise<void> {

    await AsyncStorage.setItem("notification-settings", JSON.stringify(settings));

}

export async function getNotificationSettings(): Promise<NotificationSettings> {

    const settings = await AsyncStorage.getItem("notification-settings");

    if (settings) {

        return JSON.parse(settings);

    }

    const defaultSettings = { client: true, server: true, oxide: true, carbon: true };

    await setNotificationSettings(defaultSettings);

    return defaultSettings;

}
