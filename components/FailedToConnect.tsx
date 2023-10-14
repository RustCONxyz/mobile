import { View, TouchableOpacity } from "react-native";
import { Modal, ModalContent, ScaleAnimation } from "react-native-modals";
import { Text } from "@/components/Themed";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectFailedToConnect, setFailedToConnect } from "@/store/slices/websocket";

export default function FailedToConnect() {

    const dispatch = useAppDispatch();

    const failedToConnect = useAppSelector(selectFailedToConnect);

    const closeModal = () => dispatch(setFailedToConnect(false));

    return (
        <Modal
            visible={failedToConnect}
            onTouchOutside={() => dispatch(setFailedToConnect(false))}
            modalAnimation={new ScaleAnimation({
                animationDuration: 150
            })}
            modalStyle={{
                backgroundColor: "#0a0a0a",
                borderRadius: 6
            }}
        >
            <ModalContent>
                <View>
                    <Text className="mb-4 text-2xl text-center">Failed to Connect</Text>
                    <Text className="mb-2">Please check the following:</Text>
                    <Text className="mb-2 ml-4">{"\u2022"} Your internet connection</Text>
                    <Text className="mb-2 ml-4">{"\u2022"} If the server is running</Text>
                    <Text className="mb-2 ml-4">{"\u2022"} The server's IP address, port, and password</Text>
                    <Text className="mb-4 ml-4">{"\u2022"} Firewall settings</Text>
                </View>
                <TouchableOpacity className="w-full bg-blue-500 rounded-md p-4" onPress={closeModal}>
                    <Text className="text-center">Close</Text>
                </TouchableOpacity>
            </ModalContent>
        </Modal>
    )

}
