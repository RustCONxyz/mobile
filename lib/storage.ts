import { MMKV } from "react-native-mmkv";
import * as SecureStore from "expo-secure-store";

import type NotificationSettings from "@/types/NotificationSettings";
import type SavedConnectionsDetails from "@/types/SavedConnectionsDetails";

export const storage = new MMKV();

export function getNotificationSettings(): NotificationSettings {

    const notificationSettings = storage.getString("notification-settings");

    if (!notificationSettings) {

        const defaultSettings = {

            clientUpdates: true,

            serverUpdates: true,

            oxideUpdates: true,

            carbonUpdates: true,

            protocolUpdates: true

        };

        storage.set("notification-settings", JSON.stringify(defaultSettings));

        return defaultSettings;

    }

    return JSON.parse(notificationSettings);

}

export function getAllSavedConnections(): SavedConnectionsDetails[] {

    const allConnections = storage.getString("saved-connections");

    return allConnections ? JSON.parse(allConnections) : [];

}

export async function addSavedConnection(connection: string, rconPassword: string) {

    const allServers = getAllSavedConnections();

    if (allServers.some((server) => server.connection === connection)) {

        return;

    }

    allServers.push({ connection, serverName: "My Rust Server" });

    await SecureStore.setItemAsync(connection.replace(":", "-"), rconPassword);

    storage.set("saved-connections", JSON.stringify(allServers));

}
