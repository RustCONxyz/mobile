import { useMMKVObject } from "react-native-mmkv";
import * as SecureStore from "expo-secure-store";

import type SavedConnectionsDetails from "@/types/SavedConnectionsDetails";

export default function useSavedConnections() {

    const [savedConnections, setSavedConnections] = useMMKVObject<SavedConnectionsDetails[]>("saved-connections");

    async function getSavedConnectionPassword(connection: string): Promise<string | null> {

        const rconPassword = await SecureStore.getItemAsync(connection.replace(":", "-"));

        if (!rconPassword) {

            removeSavedConnection(connection);

            return null;

        }

        return rconPassword;

    }

    async function removeSavedConnection(serverIP: string) {

        if (!savedConnections) return;

        await SecureStore.deleteItemAsync(serverIP.replace(":", "-"));

        setSavedConnections(savedConnections.filter((connection) => connection.connection !== serverIP));

    }

    return { savedConnections: savedConnections ?? [], getSavedConnectionPassword, removeSavedConnection };

}
