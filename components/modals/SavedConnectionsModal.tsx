import { View, ScrollView, TouchableOpacity } from "react-native";
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import { Ionicons } from "@expo/vector-icons";
import { Text, Separator } from "@/components/Themed";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import useSavedConnections from "@/hooks/useSavedConnections";

type SavedConnectionsModalProps = {

    isVisible: boolean,

    closeModal: () => void,

    handleConnect: (connection: string, rconPassword: string, saveInformation: boolean) => void

}

export default function SavedConnectionsModal({ isVisible, closeModal, handleConnect }: SavedConnectionsModalProps) {

    const { height } = useWindowDimensions();

    const { savedConnections, getSavedConnectionPassword, removeSavedConnection } = useSavedConnections();

    async function handleClick(connection: string) {

        const password = await getSavedConnectionPassword(connection);

        if (!password) {

            return;

        }

        handleConnect(connection, password, false);

    }

    return (
        <BottomModal
            visible={isVisible}
            onTouchOutside={closeModal}
            swipeDirection={["down"]}
            onSwipeOut={closeModal}
            modalAnimation={new SlideAnimation({ slideFrom: "bottom" })}
            height={height * 0.66}
            modalStyle={{ backgroundColor: "#0a0a0a" }}
        >
            <ModalContent style={{ flex: 1, marginBottom: -24 }}>
                <Text className="text-center text-xl font-bold mb-6">Saved Connections</Text>
                <Separator className="mb-4" />
                {savedConnections.length === 0 ? <Text className="text-center">No saved connections</Text> : (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {savedConnections.map((connection, index) => (
                            <View key={index} className="mb-4 flex flex-row justify-between items-center">
                                <TouchableOpacity className="mr-4 flex-1 bg-zinc-900 rounded-md p-4" onPress={() => handleClick(connection.connection)}>
                                    <Text>{connection.serverName}</Text>
                                    <Text>{connection.connection}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity className="border-2 border-red-600 rounded-md p-4" onPress={() => removeSavedConnection(connection.connection)}>
                                    <Ionicons name="md-trash-outline" size={24} color="#ffffff" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </ModalContent>
        </BottomModal>
    )

}
