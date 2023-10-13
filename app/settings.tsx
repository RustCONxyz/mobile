import { View, ScrollView } from "react-native";
import { useEffect, useReducer } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants"
import { Text, Link, Separator, Switch } from "../components/Themed";
import ExternalLink from "../components/ExternalLink";
import { getNotificationSettings, setNotificationSettings, type NotificationSettings } from "../utils/storage/notifications";

export default function SettingsScreen() {

    const [notifications, setNotifications] = useReducer((state: NotificationSettings, newState: Partial<NotificationSettings>) => {

        const settings = { ...state, ...newState };

        setNotificationSettings(settings);

        return settings;

    }, { client: true, server: true, oxide: true, carbon: true });

    useEffect(() => {

        getNotificationSettings().then((settings) => setNotifications(settings))

    }, []);

    return (
        <ScrollView className="h-full bg-neutral-950 p-4">
            <View className="flex flex-row justify-between items-center">
                <Text className="text-3xl font-bold">Settings</Text>
                <Link href="/" className="text-2xl font-bold">
                    <MaterialCommunityIcons name="close" size={24} color="#ffffff" />
                </Link>
            </View>
            <Separator className="my-4" />
            <View className="bg-zinc-900 rounded-md pb-2 pt-4 px-4">
                <Text className="text-xl">Notifications</Text>
                <Separator className="mt-4 mb-2" />
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Client Updates</Text>
                    <Switch value={notifications.client} onChange={() => setNotifications({ client: !notifications.client })} />
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Server Updates</Text>
                    <Switch value={notifications.server} onChange={() => setNotifications({ server: !notifications.server })} />
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Oxide Updates</Text>
                    <Switch value={notifications.oxide} onChange={() => setNotifications({ oxide: !notifications.oxide })} />
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Carbon Updates</Text>
                    <Switch value={notifications.carbon} onChange={() => setNotifications({ carbon: !notifications.carbon })} />
                </View>
            </View>
            <Separator className="my-4" />
            <View className="flex flex-col justify-center items-center">
                <View className="mb-4 w-1/2 flex flex-row justify-between items-center">
                    <ExternalLink href="https://rustcon.xyz/">
                        <MaterialCommunityIcons name="web" size={24} color="#ffffff" />
                    </ExternalLink>
                    <ExternalLink href="https://github.rustcon.xyz/">
                        <MaterialCommunityIcons name="github" size={24} color="#ffffff" />
                    </ExternalLink>
                    <ExternalLink href="https://support.rustcon.xyz/">
                        <MaterialCommunityIcons name="discord" size={24} color="#ffffff" />
                    </ExternalLink>
                </View>
                <View>
                    <Text className="text-center">RustCON is an open source project</Text>
                    <Text className="mt-2 mb-8 text-xs text-center">{Constants.expoConfig?.version ?? "Unknown Version"}</Text>
                </View>
            </View>
        </ScrollView>
    )

}
