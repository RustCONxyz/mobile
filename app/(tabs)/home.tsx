import { View, ScrollView } from "react-native";
import { Text, Separator } from "@/components/Themed";
import LineChart from "@/components/LineChart";
import { useAppSelector } from "@/hooks/redux";
import { selectServerInfo } from "@/store/slices/serverInfo";

export default function HomeScreen() {

    const serverInfo = useAppSelector(selectServerInfo);

    const averageFPS = Math.round(serverInfo.history.reduce((a, b) => a + b.framerate, 0) / serverInfo.history.length);

    const networkInHistory = serverInfo.history.map(info => ({ x: info.timestamp, y: info.networkIn }));

    const networkOutHistory = serverInfo.history.map(info => ({ x: info.timestamp, y: info.networkOut }));

    return (
        <ScrollView className="h-full bg-neutral-950 p-4" showsVerticalScrollIndicator={false}>
            <Text className="text-2xl">{serverInfo.hostname}</Text>
            <Separator className="mt-2 mb-4" />
            <View className="flex-row mb-4">
                <View className="flex-1 bg-zinc-900 rounded-md p-4">
                    <Text>Online Players</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{serverInfo.players}</Text>
                </View>
                <View className="w-4" />
                <View className="flex-1 bg-zinc-900 rounded-md p-4">
                    <Text>Max Players</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{serverInfo.maxPlayers}</Text>
                </View>
            </View>
            <View className="flex-row mb-4">
                <View className="flex-1 bg-zinc-900 rounded-md p-4">
                    <Text>Queued Players</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{serverInfo.queued}</Text>
                </View>
                <View className="w-4" />
                <View className="flex-1 bg-zinc-900 rounded-md p-4">
                    <Text>Players Joining</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{serverInfo.joining}</Text>
                </View>
            </View>
            <View className="flex-row mb-4">
                <View className="flex-1 bg-zinc-900 rounded-md p-4">
                    <Text>FPS</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{serverInfo.framerate} ({averageFPS || 0})</Text>
                </View>
                <View className="w-4" />
                <View className="flex-1 bg-zinc-900 rounded-md p-4">
                    <Text>Entity Count</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{serverInfo.entityCount}</Text>
                </View>
            </View>
            <View className="mb-4 w-full bg-zinc-900 rounded-md p-4">
                <Text>Uptime</Text>
                <Separator className="my-4" />
                <Text className="font-bold">
                    {Math.floor((serverInfo.uptime || 0) / 86400)} Days, {Math.floor((serverInfo.uptime || 0) / 3600) % 24} Hours, {Math.floor((serverInfo.uptime || 0) / 60) % 60} Minutes, {Math.floor(serverInfo.uptime || 0) % 60} Seconds
                </Text>
            </View>
            <View className="mb-4 w-full bg-zinc-900 rounded-md p-4">
                <Text>Network In</Text>
                <Separator className="my-4" />
                {networkInHistory.length === 0 ? (
                    <View className="h-[250px] flex-1 items-center justify-center">
                        <Text>No data to display</Text>
                    </View>
                ) : (
                    <LineChart data={networkInHistory} />
                )}
            </View>
            <View className="mb-8 w-full bg-zinc-900 rounded-md p-4">
                <Text>Network Out</Text>
                <Separator className="my-4" />
                {networkOutHistory.length === 0 ? (
                    <View className="h-[250px] flex-1 items-center justify-center">
                        <Text>No data to display</Text>
                    </View>
                ) : (
                    <LineChart data={networkOutHistory} />
                )}
            </View>
        </ScrollView>
    )

}
