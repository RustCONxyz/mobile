import { useEffect, useReducer } from "react";
import { View, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Constants from "expo-constants"
import { Text, Link, Separator, Switch } from "@/components/Themed";
import ExternalLink from "@/components/ExternalLink";
import { getNotificationSettings, setNotificationSettings, type NotificationSettings } from "@/utils/storage/notifications";

export default function SettingsScreen() {

    const [notifications, setNotifications] = useReducer((state: NotificationSettings, newState: Partial<NotificationSettings>) => {

        const settings = { ...state, ...newState };

        setNotificationSettings(settings);

        return settings;

    }, { clientUpdates: true, serverUpdates: true, oxideUpdates: true, carbonUpdates: true, protocolUpdates: true });

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
            <View className="bg-zinc-900 rounded-md p-4">
                <Text className="text-xl">Notifications</Text>
                <Separator className="mt-4 mb-2" />
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Client Updates</Text>
                    <Switch value={notifications.clientUpdates} onChange={() => setNotifications({ clientUpdates: !notifications.clientUpdates })} />
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Server Updates</Text>
                    <Switch value={notifications.serverUpdates} onChange={() => setNotifications({ serverUpdates: !notifications.serverUpdates })} />
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Oxide Updates</Text>
                    <Switch value={notifications.oxideUpdates} onChange={() => setNotifications({ oxideUpdates: !notifications.oxideUpdates })} />
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Carbon Updates</Text>
                    <Switch value={notifications.carbonUpdates} onChange={() => setNotifications({ carbonUpdates: !notifications.carbonUpdates })} />
                </View>
                <View className="mt-4 flex flex-row justify-between items-center">
                    <Text>Protocol Updates</Text>
                    <Switch value={notifications.protocolUpdates} onChange={() => setNotifications({ protocolUpdates: !notifications.protocolUpdates })} />
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
