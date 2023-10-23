import { useState, useEffect, useCallback } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, Separator, TextInput } from "@/components/Themed";
import SelectedPlayerModal from "@/components/modals/SelectedPlayerModal";
import KickDialog from "@/components/dialogs/KickDialog";
import BanDialog from "@/components/dialogs/BanDialog";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectOnlinePlayers } from "@/store/slices/serverPlayers";
import buildWebSocketAction from "@/store/websocket/actions";
import * as websocketActions from "@/store/websocket/actions";

export default function PlayersScreen() {

    const dispatch = useAppDispatch();

    const onlinePlayers = useAppSelector(selectOnlinePlayers);

    const [searchTerm, setSearchTerm] = useState("");

    const [selectedPlayer, setSelectedPlayer] = useState<typeof onlinePlayers[number] | null>(null);

    const [isKickDialogVisible, setKickDialogVisible] = useState<boolean>(false);

    const [isBanDialogVisible, setBanDialogVisible] = useState<boolean>(false);

    useEffect(() => {

        if (selectedPlayer == null) return;

        const player = onlinePlayers.find(player => player.steamId == selectedPlayer.steamId);

        if (!player) {

            setKickDialogVisible(false);

            setBanDialogVisible(false);

        }

        setSelectedPlayer(player || null);

    }, [onlinePlayers]);

    const filteredPlayers = onlinePlayers.filter(
        (player) =>
            !searchTerm ||
            player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            player.steamId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sendRCONCommand = useCallback((command: string) =>
        dispatch(buildWebSocketAction(websocketActions.WEBSOCKET_SEND, JSON.stringify({ command, printToConsole: false }))), [dispatch]);

    const renderItem = useCallback(({ item: player }: { item: typeof onlinePlayers[number] }) => {

        return (
            <TouchableOpacity key={player.steamId} className="mb-4 bg-zinc-900 flex flex-row justify-between items-center rounded-md p-4" onPress={() => setSelectedPlayer(player)}>
                <View>
                    <Text>{player.name}</Text>
                    <Text>({player.steamId})</Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                    <MaterialIcons name="keyboard-arrow-right" size={32} color="#ffffff" />
                </View>
            </TouchableOpacity>
        )

    }, []);

    return (
        <View className="h-full bg-neutral-950 pt-4 px-4">
            <TextInput className="bg-zinc-900 rounded-md p-2" placeholder="Search" onChangeText={setSearchTerm} />
            <Separator className="my-4" />
            {onlinePlayers.length === 0 ? (
                <Text className="text-center">No online players</Text>
            ) : (
                <FlatList
                    data={filteredPlayers}
                    keyExtractor={player => player.steamId}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <SelectedPlayerModal
                selectedPlayer={selectedPlayer}
                resetSelectedPlayer={() => setSelectedPlayer(null)}
                openKickDialog={() => setKickDialogVisible(true)}
                openBanDialog={() => setBanDialogVisible(true)}
            />
            <KickDialog
                isVisible={isKickDialogVisible}
                closeDialog={() => setKickDialogVisible(false)}
                playerInfo={selectedPlayer!}
                sendRCONCommand={sendRCONCommand}
            />
            <BanDialog
                isVisible={isBanDialogVisible}
                closeDialog={() => setBanDialogVisible(false)}
                playerInfo={selectedPlayer!}
                sendRCONCommand={sendRCONCommand}
            />
        </View>
    )

}
