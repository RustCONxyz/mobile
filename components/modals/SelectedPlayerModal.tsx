import { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { Image } from "expo-image";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Text, Separator } from "../../components/Themed";
import openExternalLink from "../../utils/openExternalLink";
import ServerPlayer from "../../interfaces/ServerPlayer";

type SelectedPlayerModalProps = {

    selectedPlayer: ServerPlayer | null,

    resetSelectedPlayer: () => void,

    openKickDialog: () => void,

    openBanDialog: () => void

}

const SelectedPlayerModal = memo(({ selectedPlayer, resetSelectedPlayer, openKickDialog, openBanDialog }: SelectedPlayerModalProps) => {

    return (
        <BottomModal
            visible={selectedPlayer != null}
            onTouchOutside={resetSelectedPlayer}
            swipeDirection={["down"]}
            onSwipeOut={resetSelectedPlayer}
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            modalStyle={{
                backgroundColor: "#0a0a0a",
                borderRadius: 10
            }}
        >
            <ModalContent>
                <View>
                    <Text className="text-xl">{selectedPlayer?.name}</Text>
                    <Text>({selectedPlayer?.steamId})</Text>
                </View>
                <Separator className="my-4" />
                <View className="flex-row mb-4">
                    <View className="flex-1 bg-zinc-900 rounded-md p-4">
                        <Text className="font-medium">Address</Text>
                        <Separator className="my-4" />
                        <Text className="font-bold">{selectedPlayer?.address}</Text>
                    </View>
                    <View className="w-4" />
                    <View className="flex-1 bg-zinc-900 rounded-md p-4">
                        <Text className="font-medium">Ping</Text>
                        <Separator className="my-4" />
                        <Text className="font-bold">{selectedPlayer?.ping}</Text>
                    </View>
                </View>
                <View className="w-full bg-zinc-900 rounded-md p-4">
                    <Text className="font-medium">Connection Time</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">
                        {Math.floor((selectedPlayer?.connectionTime || 0) / 3600) % 24} Hours, {Math.floor((selectedPlayer?.connectionTime || 0) / 60) % 60} Minutes, {Math.floor(selectedPlayer?.connectionTime || 0) % 60} Seconds
                    </Text>
                </View>
                <Separator className="my-4" />
                <View className="flex flex-row">
                    <TouchableOpacity className="mr-4 flex-1 border-2 border-blue-500 rounded-md py-2 items-center" onPress={() => openExternalLink(`https://rusttools.xyz/profile/${selectedPlayer?.steamId}`)}>
                        <MaterialCommunityIcons name="account" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity className="mr-4 flex-1 border-2 border-[#2a475e] rounded-md py-2 items-center" onPress={() => openExternalLink(`https://steamcommunity.com/profiles/${selectedPlayer?.steamId}`)}>
                        <FontAwesome5 name="steam" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity className="mr-4 flex-1 border-2 border-[#eab308] rounded-md py-2 items-center" onPress={openKickDialog}>
                        <Image source={require("../../assets/icons/podiatry.svg")} style={{ width: 24, height: 24, transform: [{ scaleX: -1 }] }} />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border-2 border-[#dc2626] rounded-md py-2 items-center" onPress={openBanDialog}>
                        <Ionicons name="md-hammer-sharp" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </ModalContent>
        </BottomModal>
    )

});

export default SelectedPlayerModal;
