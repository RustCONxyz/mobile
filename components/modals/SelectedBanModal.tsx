import { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { Text, Separator } from "../../components/Themed";;
import openExternalLink from "../../utils/openExternalLink";
import ServerBan from "../../interfaces/ServerBan";

type SelectedBanModalProps = {

    selectedBan: ServerBan | null,

    resetSelectedBan: () => void,

    openUnbanDialog: () => void

}

const SelectedBanModal = memo(({ selectedBan, resetSelectedBan, openUnbanDialog }: SelectedBanModalProps) => {

    return (
        <BottomModal
            visible={selectedBan != null}
            onTouchOutside={resetSelectedBan}
            swipeDirection={["down"]}
            onSwipeOut={resetSelectedBan}
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            modalStyle={{
                backgroundColor: "#0a0a0a",
                borderRadius: 10
            }}
        >
            <ModalContent>
                <View>
                    <Text className="text-xl">{selectedBan?.playerName}</Text>
                    <Text>({selectedBan?.playerId})</Text>
                </View>
                <Separator className="my-4" />
                <View className="mb-4 w-full bg-zinc-900 rounded-md p-4">
                    <Text className="font-medium">Reason</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{selectedBan?.reason == "" ? "No reason specified" : selectedBan?.reason}</Text>
                </View>
                <View className="w-full bg-zinc-900 rounded-md p-4">
                    <Text className="font-medium">Expires</Text>
                    <Separator className="my-4" />
                    <Text className="font-bold">{selectedBan?.expiry == -1 ? "Never" : selectedBan?.expiry}</Text>
                </View>
                <Separator className="my-4" />
                <View className="flex flex-row">
                    <TouchableOpacity className="mr-4 flex-1 border-2 border-blue-500 rounded-md py-2 items-center" onPress={() => openExternalLink(`https://rusttools.xyz/profile/${selectedBan?.playerId}`)}>
                        <MaterialCommunityIcons name="account" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity className="mr-4 flex-1 border-2 border-[#2a475e] rounded-md py-2 items-center" onPress={() => openExternalLink(`https://steamcommunity.com/profiles/${selectedBan?.playerId}`)}>
                        <FontAwesome5 name="steam" size={24} color="#ffffff" />
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 border-2 border-success rounded-md py-2 items-center" onPress={openUnbanDialog}>
                        <MaterialCommunityIcons name="lock-open" size={24} color="#ffffff" />
                    </TouchableOpacity>
                </View>
            </ModalContent>
        </BottomModal>
    )

});

export default SelectedBanModal;
