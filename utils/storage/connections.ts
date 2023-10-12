import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export interface ServerDetails {

    connection: string;

    serverName: string;

}

export async function getAllServers(): Promise<ServerDetails[]> {

    const allServers = await AsyncStorage.getItem("servers");

    return allServers ? JSON.parse(allServers) : [];

}

export async function addServer(connection: string, rconPassword: string) {

    const allServers = await getAllServers();

    allServers.push({ connection, serverName: "My Rust Server" });

    await Promise.all([

        AsyncStorage.setItem("servers", JSON.stringify(allServers)),

        SecureStore.setItemAsync(connection.replace(":", "-"), rconPassword)

    ]);

}

export async function getServerPassword(connection: string): Promise<string | null> {

    connection = connection.replace(":", "-");

    const rconPassword = await SecureStore.getItemAsync(connection, { requireAuthentication: true });

    if (!rconPassword) {

        await removeServer(connection);

        return null;

    }

    return rconPassword;

}

export async function removeAllServers() {

    const allServers = await getAllServers();

    await Promise.all([

        AsyncStorage.removeItem("servers"),

        ...allServers.map(server => SecureStore.deleteItemAsync(server.connection.replace(":", "-")))

    ]);

}

export async function removeServer(connection: string) {

    const allServers = await getAllServers();

    const newServers = allServers.filter(server => server.connection !== connection);

    await Promise.all([

        AsyncStorage.setItem("servers", JSON.stringify(newServers)),

        SecureStore.deleteItemAsync(connection.replace(":", "-"))

    ]);

}
