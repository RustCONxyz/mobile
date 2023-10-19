import { View, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { Text, Separator, TextInput } from "@/components/Themed";
import SelectedBanModal from "@/components/modals/SelectedBanModal";
import UnbanDialog from "@/components/dialogs/UnbanDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectServerBans } from "@/store/slices/serverBans";
import buildWebSocketAction from "@/store/websocket/actions";
import * as websocketActions from "@/store/websocket/actions";

export default function BansScreen() {

    const dispatch = useAppDispatch();

    const serverBans = useAppSelector(selectServerBans);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedBan, setSelectedBan] = useState<typeof serverBans[number] | null>(null);

    const [isUnbanDialogVisible, setUnbanDialogVisible] = useState<boolean>(false);

    useEffect(() => {

        if (selectedBan == null) return;

        const ban = serverBans.find(ban => ban.playerId == selectedBan.playerId);

        if (!ban) {

            setUnbanDialogVisible(false);

        }

        setSelectedBan(ban || null);

    }, [serverBans]);

    const filteredBans = serverBans.filter(
        (ban) =>
            !searchTerm ||
            ban.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ban.playerId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sendRCONCommand = useCallback((command: string) =>
        dispatch(buildWebSocketAction(websocketActions.WEBSOCKET_SEND, JSON.stringify({ command, printToConsole: false }))), [dispatch]);

    const renderItem = useCallback(({ item: ban }: { item: typeof serverBans[number] }) => (
        <TouchableOpacity key={ban.playerId} className="mb-4 bg-zinc-900 flex flex-row justify-between items-center rounded-md p-4" onPress={() => setSelectedBan(ban)}>
            <View>
                <Text>{ban.playerName}</Text>
                <Text>({ban.playerId})</Text>
            </View>
            <View className="flex flex-row justify-between items-center">
                <MaterialIcons name="keyboard-arrow-right" size={32} color="#ffffff" />
            </View>
        </TouchableOpacity>
    ), []);

    return (
        <View className="h-full bg-neutral-950 pt-4 px-4">
            <TextInput className="p-2" placeholder="Search" onChangeText={setSearchTerm} />
            <Separator className="my-4" />
            {serverBans.length === 0 ? (
                <Text className="text-center">No bans found</Text>
            ) : (
                <FlatList
                    data={filteredBans}
                    keyExtractor={ban => ban.playerId}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <SelectedBanModal
                selectedBan={selectedBan}
                resetSelectedBan={() => setSelectedBan(null)}
                openUnbanDialog={() => setUnbanDialogVisible(true)}
            />
            <UnbanDialog
                isVisible={isUnbanDialogVisible}
                closeDialog={() => setUnbanDialogVisible(false)}
                serverBan={selectedBan!}
                sendRCONCommand={sendRCONCommand}
            />
        </View>
    )

}
